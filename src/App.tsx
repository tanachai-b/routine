import cx from "classnames";
import { Marker, Time } from "./components";
import { useEntries, useTime } from "./hooks";

export default function App() {
  const { time } = useTime();
  const { timeline, onColorChange, onLabelChange } = useEntries();

  return (
    <div
      className={cx(
        "size-full",

        "max-w-full",

        "flex",
        "flex-col",
        "items-center",
        // "flex-row",
        // "justify-center",
      )}
    >
      {/* <div className={cx("w-full", "max-w-[500px]", "p-[20px]")}>
        <div>Sleep</div>
        <div>5hrs</div>
      </div> */}

      <div
        className={cx(
          "w-full",
          "max-w-[500px]",

          "p-[20px]",
        )}
      >
        <div className={cx("relative")}>
          <div className={cx("flex", "flex-col")}>
            {timeline.map((entry) => {
              const { time, color, label, activity } = entry;

              return (
                <Time
                  key={time}
                  time={time}
                  color={color}
                  label={label}
                  onColorChange={
                    activity != null ? (color) => onColorChange(activity, color) : undefined
                  }
                  onLabelChange={(label) => onLabelChange(time, label)}
                />
              );
            })}
          </div>

          <Marker time={time} />
        </div>
      </div>
    </div>
  );
}
