import "./dorianteTitle.css";

type DorianteTitleProps = {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right" | "justify";
  color?: "black" | "white" | "light" | "gray";
  children: React.ReactNode;
};
export default function DorianteTitle({
  tag,
  as = tag,
  align = "left",
  color = "black",
  children,
}: DorianteTitleProps) {
  const Tag = tag;
  return (
    <Tag className={`doriante-title ${as} text-${align} text-${color}`}>
      {children}
    </Tag>
  );
}
