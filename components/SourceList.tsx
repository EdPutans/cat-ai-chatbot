import { MetadataEntry } from "@/app/page";

type Props = {
  sources: MetadataEntry[];
};

const SourceList = ({ sources }: Props) => {
  // const [isUnfolded, setIsUnfolded] = React.useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="flex flex-col align-start">
      <span className="text-xs text-gray-500 my-2">Sources:</span>

      {sources.map((item, i) => {
        if (!item) return null;
        return (
          <a
            href={item.url}
            key={i}
            target="_blank"
            className="text-blue-500 hover:underline text-xs"
          >
            {item.title} (
            {item?.url
              ?.replace("https://", "")
              .replace("http://", "")
              .replace("www.", "")
              .split("/")[0] || ""}
            )
          </a>
        );
      })}
      {/* <button
        className="text-blue-500  underline text-xs"
        onClick={() => setIsUnfolded((prev) => !prev)}
      > */}
      {/* {isUnfolded && sources.length > 3 ? "Show less" : "Show more"}  */}
      {/* </button> */}
    </div>
  );
};

export default SourceList;
