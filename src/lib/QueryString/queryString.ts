const keyValueToString = ([key, value]) => {
  if (typeof value === "object" && !Array.isArray(value)) {
    throw new Error("Please check your params");
  }
  return `${key}=${value}`;
};

export function queryString(object: Object) {
  if (Object.keys(object).length === 0) {
    throw new Error("Params is empty");
  }
  return Object.entries(object)
    .map(keyValueToString)
    .join("&");
}

export function parse(string: String) {
  return Object.fromEntries(
    string
      .split("&")
      .map((item) =>
        item
          .split("=")
          .map((value) => (value.includes(",") ? value.split(",") : value))
      )
  );
}
