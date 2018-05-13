export interface PageResult<T> {
  offset: number;
  limit: number;
  total: number;
  items: T[];
}
