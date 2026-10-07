// Project names in their own brand colours.
export default function ProjectTitle({ title }) {
  const silver =
    "bg-clip-text text-transparent bg-gradient-to-r from-[#8e8e8e] via-[#f0f0f0] to-[#8e8e8e]";
  const colorMapping = {
    LogiX: <span className={silver}>LogiX</span>,
    Portfolio: <span className={silver}>Portfolio</span>,
    Mogo: (
      <span>
        M<span className="text-[rgb(18,88,255)]">og</span>o
      </span>
    ),
    FoodAR: (
      <span>
        Food<span className="text-[#63D471]">AR</span>
      </span>
    ),
    Kombuczara: <span className="text-[#E9A85D]">Kombuczara</span>,
    "Radio Silesia": (
      <span>
        <span className="text-blue-500">Radio</span>{" "}
        <span className="text-red-500">Silesia</span>
      </span>
    ),
  };

  return colorMapping[title] || <span>{title}</span>;
}
