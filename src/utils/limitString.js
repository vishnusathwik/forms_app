export const limitString = (string, limit = 15) =>
  string.length > limit ? string.substring(0, limit) + " ..." : string;
