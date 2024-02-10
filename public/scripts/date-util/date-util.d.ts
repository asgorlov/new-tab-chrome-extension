import "./sun-calc";

declare global {
  interface Date {
    isSame(date: Date): boolean;
    isSameWithoutTime(date: Date): boolean;
    isSameOrBefore(date: Date): boolean;
    isSameOrAfter(date: Date): boolean;
    isBefore(date: Date): boolean;
    isAfter(date: Date): boolean;
  }
}

export {};
