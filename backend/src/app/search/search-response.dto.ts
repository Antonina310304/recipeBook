export type SearchResponseDto<T> = {
  data: T[];
  total: number;
};
export type RefreshRequestDto = {
  [property: string]: unknown;
  uuid: string;
};
