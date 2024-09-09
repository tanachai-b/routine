import cx from "classnames";
import { getTimeValue } from "./common-functions";
import { Marker, Time } from "./components";
import { useEntries, useTime } from "./hooks";

export default function App() {
  const { time } = useTime();
  const { timeline, onColorChange, onLabelChange, getCurrentActivity } = useEntries();

  const { currentActivity, nextActivity } = getCurrentActivity(time);
  console.log({ currentActivity });

  const newLocal =
    currentActivity == null ? 0 : (time - getTimeValue(currentActivity.time) + 24) % 24;

  const newLocal2 =
    nextActivity == null
      ? 0
      : (getTimeValue(nextActivity.time) - getTimeValue(currentActivity.time) + 24) % 24;

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
      <div className={cx("w-full", "max-w-[500px]", "p-[20px]")}>
        <div>{currentActivity?.activity}</div>
        <div>{((newLocal / newLocal2) * 100).toFixed()} %</div>
      </div>

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
