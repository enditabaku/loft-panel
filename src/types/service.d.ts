declare module 'socket.io-client'

declare type StatusResponse<TData> = {
  status: number
  message: string
  data: TData
}

declare type PaginatedResponse<TItem> = {
  data: Array<TItem>
  message: string
  meta: {
    current_page: number
    from: number
    path: string
    per_page: number
    to: number
    total: number
  }
}

declare type AwaitStatusResponse<TData> = Promise<StatusResponse<TData>>

declare type Params = Record<string, string | number | Array<string | number>> | string | number
