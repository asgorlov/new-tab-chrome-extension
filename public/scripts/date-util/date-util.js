import "./sun-calc.js";

// ==== Date Utility ============================
Date.prototype.isSame = function (date) {
  return this.getTime() === date.getTime();
};

Date.prototype.isSameWithoutTime = function (date) {
  return (
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  );
};

Date.prototype.isSameOrBefore = function (date) {
  return this.getTime() <= date.getTime();
};

Date.prototype.isSameOrAfter = function (date) {
  return this.getTime() >= date.getTime();
};

Date.prototype.isBefore = function (date) {
  return this.getTime() < date.getTime();
};

Date.prototype.isAfter = function (date) {
  return this.getTime() > date.getTime();
};

Date.prototype.add = function (value, unit) {
  if (value === 0) {
    return this;
  }

  switch (unit) {
    case "ms":
      this.setUTCMilliseconds(this.getUTCMilliseconds() + value);
      break;
    case "s":
      this.setUTCSeconds(this.getUTCSeconds() + value);
      break;
    case "min":
      this.setUTCMinutes(this.getUTCMinutes() + value);
      break;
    case "h":
      this.setUTCHours(this.getUTCHours() + value);
      break;
    case "d":
      this.setUTCDate(this.getUTCDate() + value);
      break;
    case "w":
      this.setUTCDate(this.getUTCDate() + value * 7);
      break;
    case "m":
      this.setUTCMonth(this.getUTCMonth() + value);
      break;
    case "y":
      this.setUTCFullYear(this.getUTCFullYear() + value);
  }

  return this;
};

export {};
