import "./sun-calc";

declare global {
  interface Date {
    isSame(date: Date): boolean;
    isSameWithoutTime(date: Date): boolean;
    isSameOrBefore(date: Date): boolean;
    isSameOrAfter(date: Date): boolean;
    isBefore(date: Date): boolean;
    isAfter(date: Date): boolean;
    add(value: number, unit: DateUnit): Date;
    startOf(unit: Omit<DateUnit, "ms">): Date;
    endOf(unit: Omit<DateUnit, "ms">): Date;
  }
}

type DateUnit = "ms" | "s" | "min" | "h" | "d" | "w" | "m" | "y";

export { DateUnit };
