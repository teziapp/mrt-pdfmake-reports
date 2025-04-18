export interface FetchDataOptions {
  enablePaginatedDataFetch?: boolean;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  sorting: { id: string; desc: boolean }[];
  filters: { id: string; value: string }[];
}

export interface FetchDataResult<TData = Record<string, any>> {
  data: TData[];
  pageCount: number;
} 