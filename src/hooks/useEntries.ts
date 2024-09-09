import { useMemo, useState } from "react";
import { getRandomColor, getTimeValue } from "src/common-functions";
import { TIMELINE_TIMES } from "src/constants";

type ActivityData = {
  time: string;
  color: string;
  activity: string;
};

type TimelineData = {
  time: string;
  color?: string;
  label?: string;
  activity?: string;
};

export function useEntries() {
  const [entries, setEntries] = useState<ActivityData[]>([
    { time: "07:00", color: "#ff0000", activity: "Getting Ready" },
    { time: "08:00", color: "#ff8000", activity: "Read" },
    { time: "09:00", color: "#0040ff", activity: "Work" },
    { time: "12:00", color: "#ffe000", activity: "Lunch" },
    { time: "13:00", color: "#0040ff", activity: "Work" },
    { time: "18:00", color: "#00c0ff", activity: "Swim" },
    { time: "19:00", color: "#80ff00", activity: "Hobby" },
    { time: "22:00", color: "#ff00c0", activity: "Relax" },
    { time: "23:00", color: "#6000ff", activity: "Sleep" },
  ]);

  const timeline = useMemo<TimelineData[]>(() => {
    let latestEntry: ActivityData | undefined = entries[entries.length - 1];

    const timeline = TIMELINE_TIMES.map((time): TimelineData => {
      const entry = entries.find((v) => v.time === time);

      if (entry != null) {
        latestEntry = entry;
        return { ...entry, label: entry.activity };
        //
      } else if (latestEntry != null) {
        return {
          time,
          color: latestEntry.color,
          label: "",
          activity: latestEntry.activity,
        };
        //
      } else {
        return {
          time,
          color: undefined,
          label: undefined,
          activity: undefined,
        };
        //
      }
    });

    return timeline;
  }, [entries]);

  function onColorChange(label: string, color: string) {
    const oldEntries = entries.filter((v) => v.activity === label);

    if (oldEntries.length === 0) return;

    const newEntries = oldEntries.map((v) => ({ ...v, color }));
    const removedOldEntry = entries.filter((v) => v.activity !== label);
    const addedNewEntry = [...removedOldEntry, ...newEntries];
    const sortedEntries = addedNewEntry.sort((a, b) => a.time.localeCompare(b.time));

    setEntries(sortedEntries);
  }

  function onLabelChange(time: string, label: string) {
    const oldEntry = entries.find((v) => v.time === time);

    if (oldEntry == null) {
      addNewEntry(time, label);
      //
    } else if (label.length > 0) {
      updateEntry(oldEntry, label);
      //
    } else {
      removeEntry(time);
    }
  }

  function addNewEntry(time: string, activity: string) {
    const addedNewEntry = [
      ...entries,
      { time, color: getActivityColor(activity) ?? getRandomColor(), activity },
    ];
    const sortedEntries = addedNewEntry.sort((a, b) => a.time.localeCompare(b.time));
    setEntries(sortedEntries);
  }

  function updateEntry(oldEntry: ActivityData, activity: string) {
    const removedOldEntry = entries.filter((v) => v.time !== oldEntry.time);
    const addedNewEntry = [
      ...removedOldEntry,
      {
        time: oldEntry.time,
        color: getActivityColor(activity) ?? oldEntry.color,
        activity,
      },
    ];
    const sortedEntries = addedNewEntry.sort((a, b) => a.time.localeCompare(b.time));
    setEntries(sortedEntries);
  }

  function removeEntry(time: string) {
    const removedEntry = entries.filter((v) => v.time !== time);
    const sortedEntries = removedEntry.sort((a, b) => a.time.localeCompare(b.time));
    setEntries(sortedEntries);
  }

  function getActivityColor(activity: string) {
    const entry = entries.find((v) => v.activity === activity);
    return entry?.color;
  }

  function getCurrentActivity(time: number) {
    if (entries.length === 0) return {};

    const nextIndex = entries.findIndex((v) => getTimeValue(v.time) > time);

    const currentActivity =
      nextIndex === 0
        ? entries[entries.length - 1]
        : nextIndex < 0
        ? entries[entries.length - 1]
        : entries[nextIndex - 1];

    const nextActivity = nextIndex < 0 ? entries[0] : entries[nextIndex];

    return { currentActivity, nextActivity };
  }

  return { timeline, onColorChange, onLabelChange, getCurrentActivity };
}
