import { useMemo, useState } from "react";
import { getRandomColor } from "src/common-functions";
import { times } from "src/constants";

type EntryData = {
  time: string;
  color: string;
  label: string;
};

export function useEntries() {
  const [entries, setEntries] = useState<EntryData[]>([
    { time: "00:00", color: "#6000ff", label: "Sleep" },
    { time: "07:00", color: "#ff0000", label: "Getting Ready" },
    { time: "08:00", color: "#ff8000", label: "Read" },
    { time: "09:00", color: "#0040ff", label: "Work" },
    { time: "12:00", color: "#ffe000", label: "Lunch" },
    { time: "13:00", color: "#0040ff", label: "Work" },
    { time: "18:00", color: "#00c0ff", label: "Swim" },
    { time: "19:00", color: "#80ff00", label: "Hobby" },
    { time: "22:00", color: "#ff00c0", label: "Relax" },
    { time: "23:00", color: "#6000ff", label: "Sleep" },
  ]);

  const filledEntries = useMemo<(EntryData & { sourceLabel?: string })[]>(() => {
    let lastEntry: EntryData | undefined = undefined;

    const filledEntries = times.map((time) => {
      const entry = entries.find((v) => v.time === time);

      if (entry != null) {
        lastEntry = entry;
        return entry;
        //
      } else if (lastEntry != null) {
        return {
          time,
          color: lastEntry.color,
          label: "",
          sourceLabel: lastEntry.label,
        };
        //
      } else {
        return undefined;
        //
      }
    });

    const removedBlank = filledEntries.filter((v) => v !== undefined);

    return removedBlank;
  }, [entries]);

  function onColorChange(label: string, color: string) {
    const oldEntries = entries.filter((v) => v.label === label);

    if (oldEntries.length === 0) return;

    const newEntries = oldEntries.map((v) => ({ ...v, color }));
    const removedOldEntry = entries.filter((v) => v.label !== label);
    const addedNewEntry = [...removedOldEntry, ...newEntries];

    setEntries(addedNewEntry);
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

  function addNewEntry(time: string, label: string) {
    const addedNewEntry = [
      ...entries,
      { time, color: getLabelColor(label) ?? getRandomColor(), label },
    ];
    setEntries(addedNewEntry);
  }

  function updateEntry(oldEntry: EntryData, label: string) {
    const removedOldEntry = entries.filter((v) => v.time !== oldEntry.time);
    const addedNewEntry = [
      ...removedOldEntry,
      {
        time: oldEntry.time,
        color: getLabelColor(label) ?? oldEntry.color,
        label,
      },
    ];
    setEntries(addedNewEntry);
  }

  function removeEntry(time: string) {
    const removedEntry = entries.filter((v) => v.time !== time);
    setEntries(removedEntry);
  }

  function getLabelColor(label: string) {
    const entry = entries.find((v) => v.label === label);
    return entry?.color;
  }

  return { filledEntries, onColorChange, onLabelChange };
}
