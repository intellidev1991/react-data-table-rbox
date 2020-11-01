/*
 * Copyright (c) 2020 Hamed Taheri
 *
 * @Script: sortService.js
 * @Author: Hamed Taheri
 * @Email: hamed.taheri32@gmail.com
 * @Create At: 2020-10-04 01:14:07
 * @Last Modified By: Hamed Taheri
 * @Last Modified At: 2020-10-04 01:14:07
 * @Description: This is description.
 */

const stringSortAscending = (left, right, field = "") => {
  const x =
    field.trim() === "" ? left.toLowerCase() : left[field].toLowerCase();
  const y =
    field.trim() === "" ? right.toLowerCase() : right[field].toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
};

const stringSortDescending = (left, right, field = "") => {
  const x =
    field.trim() === "" ? left.toLowerCase() : left[field].toLowerCase();
  const y =
    field.trim() === "" ? right.toLowerCase() : right[field].toLowerCase();
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
};

const NumberSortAscending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
};

const NumberSortDescending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  if (x > y) {
    return -1;
  }
  if (x < y) {
    return 1;
  }
  return 0;
};

// from the largest to the smallest
const DateSortDescending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  return new Date(y) - new Date(x);
};

// from the smallest to the largest
const DateSortAscending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  return new Date(x) - new Date(y);
};

const booleanSortAscending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  return x === y ? 0 : x ? -1 : 1;
};

const booleanSortDescending = (left, right, field = "") => {
  const x = field.trim() === "" ? left : left[field];
  const y = field.trim() === "" ? right : right[field];
  return x === y ? 0 : x ? 1 : -1;
};

const sortService = {
  /**
   * Auto-detect data-type and sort array_data based on specific field ascending, if field was empty, detect array is not object, and does like a simple array with it
   * @example 
   * const [data, setData] = useState([
    { name: "reza", age: 21, date: new Date(2000, 1, 1), active: false },
    { name: "maryam", age: 30, date: new Date(2020, 1, 1), active: true },
  ]);
   * sortService.sortAscending(data, "name") // Or
   * sortService.sortAscending([10,4,5,12,1]], "")
   */
  sortAscending: (array_data, field = "") => {
    return array_data.slice().sort((a, b) => {
      if (typeof a === "string") return stringSortAscending(a, b, field);
      if (typeof a === "number") return NumberSortAscending(a, b, field);
      if (typeof a === "boolean") return booleanSortAscending(a, b, field);
      if (a instanceof Date) return DateSortAscending(a, b, field);
      if (typeof a === "object") {
        if (typeof a[field] === "string")
          return stringSortAscending(a, b, field);
        if (typeof a[field] === "number")
          return NumberSortAscending(a, b, field);
        if (typeof a[field] === "boolean")
          return booleanSortAscending(a, b, field);
        if (a[field] instanceof Date) return DateSortAscending(a, b, field);
      }
      return a; // if datatype was not supported
    });
  },
  /**
   * Auto-detect data-type and sort array_data based on specific field descending, if field was empty, detect array is not object, and does like a simple array with it
   * @example 
   * const [data, setData] = useState([
    { name: "reza", age: 21, date: new Date(2000, 1, 1), active: false },
    { name: "maryam", age: 30, date: new Date(2020, 1, 1), active: true },
  ]);
   * sortService.sortDescending(data, "name") // Or
   * sortService.sortDescending([10,4,5,12,1]], "")
   */
  sortDescending: (array_data, field = "") => {
    return array_data.slice().sort((a, b) => {
      if (typeof a === "string") return stringSortDescending(a, b, field);
      if (typeof a === "number") return NumberSortDescending(a, b, field);
      if (typeof a === "boolean") return booleanSortDescending(a, b, field);
      if (a instanceof Date) return DateSortDescending(a, b, field);
      if (typeof a === "object") {
        if (typeof a[field] === "string")
          return stringSortDescending(a, b, field);
        if (typeof a[field] === "number")
          return NumberSortDescending(a, b, field);
        if (typeof a[field] === "boolean")
          return booleanSortDescending(a, b, field);
        if (a[field] instanceof Date) return DateSortDescending(a, b, field);
      }
      return a; // if datatype was not supported
    });
  },
};

export { sortService };
