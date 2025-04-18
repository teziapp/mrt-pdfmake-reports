export interface FetchDataOptions {
  enablePaginatedDataFetch?: boolean;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  sorting: { id: string; desc: boolean }[];
  filters: { id: string; value: string }[];
}

export interface FetchDataResult {
  data: Record<string, any>[];
  pageCount: number;
} 