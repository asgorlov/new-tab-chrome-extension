import "./sun-calc.js";

// ==== Date Utility ============================
Date.prototype.isSame = function (date) {
  return this.getTime === date.getTime();
};

Date.prototype.isSameWithoutTime = function (date) {
  return (
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  );
};

Date.prototype.isSameOrBefore = function (date) {
  return this.getTime <= date.getTime();
};

Date.prototype.isSameOrAfter = function (date) {
  return this.getTime >= date.getTime();
};

Date.prototype.isBefore = function (date) {
  return this.getTime() < date.getTime();
};

Date.prototype.isAfter = function (date) {
  return this.getTime() > date.getTime();
};

// ==== Dark Mode Utility =======================
const createNightPeriod = (location, date = new Date()) => {
  const latitude = location.latitude;
  const longitude = location.longitude;

  return {
    sunrise: date.sunrise(latitude, longitude),
    sunset: date.sunset(latitude, longitude)
  };
};

export { createNightPeriod };
