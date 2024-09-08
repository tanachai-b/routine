import cx from "classnames";

export function Icon({ icon, fill = true }: { icon: string; fill?: boolean }) {
  return (
    <span
      className={cx("material-symbols-rounded")}
      style={{
        width: "1ch",
        fontSize: "inherit",
        fontWeight: "inherit",
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {icon}
    </span>
  );
}
