import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  query: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
