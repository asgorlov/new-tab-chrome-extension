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

Date.prototype.startOf = function (unit) {
  switch (unit) {
    case "s":
      this.setUTCMilliseconds(0);
      break;
    case "min":
      this.setUTCSeconds(0, 0);
      break;
    case "h":
      this.setUTCMinutes(0, 0, 0);
      break;
    case "d":
      this.setUTCHours(0, 0, 0, 0);
      break;
    case "w":
      const monday = this.getUTCDate() - (this.getUTCDay() - 1);
      this.setUTCDate(monday);
      this.setUTCHours(0, 0, 0, 0);
      break;
    case "m":
      this.setUTCMonth(this.getUTCMonth(), 1);
      this.setUTCHours(0, 0, 0, 0);
      break;
    case "y":
      this.setUTCFullYear(this.getUTCFullYear(), 0, 1);
      this.setUTCHours(0, 0, 0, 0);
  }

  return this;
};

Date.prototype.endOf = function (unit) {
  switch (unit) {
    case "s":
      this.setUTCMilliseconds(999);
      break;
    case "min":
      this.setUTCSeconds(59, 999);
      break;
    case "h":
      this.setUTCMinutes(59, 59, 999);
      break;
    case "d":
      this.setUTCHours(23, 59, 59, 999);
      break;
    case "w":
      const sunday = this.getUTCDate() + (7 - this.getUTCDay());
      this.setUTCDate(sunday);
      this.setUTCHours(23, 59, 59, 999);
      break;
    case "m":
      this.setUTCMonth(this.getUTCMonth() + 1, 0);
      this.setUTCHours(23, 59, 59, 999);
      break;
    case "y":
      this.setUTCFullYear(this.getUTCFullYear(), 11, 31);
      this.setUTCHours(23, 59, 59, 999);
  }

  return this;
};

export {};
