export function objFromArray(array, key = "id") {
  return array.reduce((accumulator, current) => {
    // ensure value is not null
    if (current && current[key]) accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

export function keyArrayFromArray(array, key = "id") {
  return array.reduce((accumulator, current) => {
    if (current && current[key]) accumulator.push(current[key]);
    return accumulator;
  }, []);
}

export function iterateObject(obj, withKey?: boolean) {
  if (withKey) {
    return Object.keys(obj).map((key) => [key, obj[key]]);
  } else return Object.keys(obj).map((key) => obj[key]);
}

export function groupedArray(array, key = "id") {
  return array.reduce((r, current) => {
    const groupKey = current[key] || [];
    r[current[key]] = r[current[key]] || [];
    r[groupKey].push(current);
    return r;
  }, {});
}

export function groupedArrayKeyOnlyById(array, key = "id") {
  return array.reduce((r, current) => {
    const groupKey = current[key] || [];
    r[current[key]] = r[current[key]] || [];
    r[groupKey].push(current["id"]);
    return r;
  }, {});
}
