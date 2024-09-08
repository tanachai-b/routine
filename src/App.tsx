import cx from "classnames";
import { Time } from "./components";
import { times } from "./constants";
import { useEntries } from "./hooks";

export default function App() {
  const { filledEntries, onColorChange, onLabelChange } = useEntries();

  return (
    <div className={cx("size-full", "grid", "place-items-center")}>
      <div className={cx("flex", "flex-col", "w-[300px]")}>
        {times.map((time) => {
          const entry = filledEntries.find((v) => v.time === time);
          const color = entry?.color;
          const label = entry?.label;
          const sourceLabel = entry?.sourceLabel ?? label ?? "";

          return (
            <Time
              key={time}
              time={time}
              color={color}
              label={label}
              onColorChange={(color) => onColorChange(sourceLabel, color)}
              onLabelChange={(label) => onLabelChange(time, label)}
            />
          );
        })}
      </div>
    </div>
  );
}
