import "./dorianteText.css";
import parse from "html-react-parser";

type DorianteTextProps = {
  align?: "left" | "center" | "right" | "justify";
  color?: "black" | "white" | "blue" | "red" | "gray";
  size?: "lg" | "base" | "sm" | "xs" | "xxs";
  inline?: boolean;
  children: React.ReactNode;
  weight?: "normal" | "bold" | "semibold";
};
export default function DorianteText({
  align = "left",
  color = "black",
  size = "base",
  inline = false,
  weight = "normal",
  children,
}: DorianteTextProps) {
  // se la stringa contiene html
  const is_html =
    typeof children === "string" && /<\/?[a-z][\s\S]*>/i.test(children);

  const Tag = is_html ? "div" : inline ? "span" : "p";
  const child = is_html ? parse(children) : children;

  return (
    <Tag
      className={`doriante-text font-${weight} text-${align} text-${color} text-${size}`}
    >
      {child}
    </Tag>
  );
}
