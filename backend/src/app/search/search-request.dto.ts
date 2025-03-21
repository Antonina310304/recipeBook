export type SearchRequestDto = {
  [property: string]: unknown;
  uuid: string;
};
export type SearchRequestOperationsParams = { _index: string; _id: string };
export type SearchRequestOperations = [SearchRequestOperationsParams, SearchRequestDto];
