import cx from "classnames";
import { useEffect, useState } from "react";
import { getTime } from "./common-functions";
import { Time } from "./components";
import { useEntries } from "./hooks";

export default function App() {
  const { timeline, onColorChange, onLabelChange } = useEntries();

  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(getTime());
    const intervalId = setInterval(() => setTime(getTime()), 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

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
      {/* <div className={cx("w-full", "max-w-[500px]", "p-[50px]")}>
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
        </div>
      </div>
    </div>
  );
}
