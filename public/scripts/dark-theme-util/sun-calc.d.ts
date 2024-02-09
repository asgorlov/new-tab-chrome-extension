declare global {
  interface Date {
    sunrise(latitude: number, longitude: number, zenith?: number): Date;
    sunset(latitude: number, longitude: number, zenith?: number): Date;
    sunriseSet(
      latitude: number,
      longitude: number,
      sunrise: boolean,
      zenith?: number
    ): Date;
    getDayOfYear(): number;
    DEGREES_PER_HOUR: number;
  }

  interface Math {
    degToRad(num: number): number;
    radToDeg(radians: number): number;
    sinDeg(deg: number): number;
    acosDeg(deg: number): number;
    asinDeg(deg: number): number;
    tanDeg(deg: number): number;
    cosDeg(deg: number): number;
    mod(a: number, b: number): number;
  }
}

export {};
