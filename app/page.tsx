"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// type ResponseMessage = Message

type MessageContext = {
  url: string;
  title: string;
};
interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
  toolCalls?: {
    id: string;
    name: string;
    output: string;
    type: string;
  }[];
}

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("conversationId");

    // console.log({storedId})
    if (storedId) {
      console.log({ storedId });
      setConversationId(storedId);
      fetchChatHistory(storedId);
      return;
    }

    // Generate a conversation ID if one doesn't exist
    const newId = `thread-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 12)}`;
    setConversationId(newId);
    localStorage.setItem("conversationId", newId);
  }, []);

  const fetchChatHistory = async (id: string) => {
    try {
      const response = await fetch(
        `http://192.168.16.185:3001/chat/history/${id}?showToolCalls=true`,
        {
          method: "GET",
          mode: "cors",
          credentials: "omit",
        }
      );

      if (response.ok) {
        const data: Message[] = await response.json();

        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch("http://192.168.16.185:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationId,
        }),
        credentials: "omit",
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        // Fetch updated chat history after sending message
        await fetchChatHistory(conversationId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const extractSourceFromMessage = (message: Message) => {
    try {
      const toolCall = message.toolCalls?.[0];

      if (!toolCall) {
        console.log("no toolcall. out", message.content);
        return [null];
      }

      type MetadataEntry = {
        url?: string;
        title?: string;
      };
      const parsedOutput = JSON.parse(toolCall.output) as {
        items: {
          metadata?: MetadataEntry;
        }[];
      };

      if (!parsedOutput?.items) {
        console.log("no items. out", message.content);
        return [null];
      }

      console.log("parsing......", message);
      console.log({
        items: parsedOutput.items.map((item: any) => item.metadata),
      });
      const generatedJSX = parsedOutput.items.map((item: any) => {
        if (!item) return null;

        let result = {
          title: item.metadata?.title,
          url: item.metadata?.url,
        } as MetadataEntry;

        if (!result.url && !result.title) return null;

        return result;
      });

      console.log({ generatedJSX });
      if (generatedJSX.length === 0) return [null];

      return (
        <div className="flex flex-col gap-2">
          {generatedJSX.map((item, i) => {
            if (!item) return null;
            return (
              <a
                href={item.url}
                key={i}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {item.title}
              </a>
            );
          })}
        </div>
      );

      // return generatedJSX.length > 0 ? generatedJSX : [null];
    } catch (e) {
      return [null];
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-24 h-24 mt-8 -mb-10">
          <Image src={"/catgpt.png"} alt="" width={120} height={120} />
        </div>

        <h1 className="text-2xl font-bold text-center">CatGPT</h1>

        <Card className="w-full">
          <CardHeader className="text-sm text-gray-500">
            Conversation ID: {conversationId}
          </CardHeader>
          <CardContent className="h-[60vh] overflow-y-auto space-y-4 p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Start a conversation with the AI cat!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                    <br />
                    {extractSourceFromMessage(msg)}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-tl-none flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
