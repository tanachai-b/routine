import cx from "classnames";

export function Marker({ time }: { time: number }) {
  return (
    <div
      className={cx(
        "absolute",
        "inset-0",

        "pointer-events-none",

        "overflow-hidden",
      )}
    >
      <div
        className={cx(
          "absolute",
          "w-full",
          "h-[100px]",

          "border-b-[1px]",
          "border-b-[#ffffff80]",

          "bg-gradient-to-b",
          "from-[#ffffff00]",
          "via-[#ffffff08]",
          "to-[#ffffff20]",
        )}
        style={{ top: `${time * 30 - 100}px` }}
      />

      <div
        className={cx(
          "absolute",
          "w-full",
          "h-[100px]",

          "border-b-[1px]",
          "border-b-[#ffffff80]",

          "bg-gradient-to-b",
          "from-[#ffffff00]",
          "via-[#ffffff08]",
          "to-[#ffffff20]",
        )}
        style={{ top: `${(time + 24) * 30 - 100}px` }}
      />
    </div>
  );
}
