import cx from "classnames";
import { useRef } from "react";

export function Time({
  time,
  color,
  label,
  onColorChange,
  onLabelChange,
}: {
  time: string;
  color?: string;
  label?: string;
  onColorChange?: (color: string) => void;
  onLabelChange: (label: string) => void;
}) {
  const hourString = time.match(/^.*?(?=:)/)?.[0] ?? "";
  const hour = parseInt(hourString);
  const isHighlight = hour % 6 === 0;

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cx(
        "h-[30px]",

        "flex",
        "flex-row",

        isHighlight ? "bg-[#ffffff08]" : "",
      )}
    >
      <div
        className={cx(
          "w-[70px]",

          "grid",
          "place-items-center",

          isHighlight ? "text-[#ffffff]" : "text-[#ffffff40]",
        )}
      >
        {time}
      </div>

      <div
        className={cx("w-[10px]")}
        style={{ backgroundColor: color ?? "#ffffff08" }}
        onClick={() => color != null && ref.current?.click()}
      >
        <input
          ref={ref}
          className={cx(
            "invisible",

            "size-full",

            "relative",
            "left-[15px]",
          )}
          type="color"
          value={color ?? ""}
          onChange={(e) => onColorChange?.(e.target.value)}
        />
      </div>

      <input
        className={cx(
          "flex-auto",

          "bg-transparent",

          "px-[15px]",
        )}
        type="text"
        value={label ?? ""}
        onChange={(e) => onLabelChange(e.target.value)}
      />
    </div>
  );
}
