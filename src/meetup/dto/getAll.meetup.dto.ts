export class GetAllMeetupDTO {
  search: string
  sortBy: string
  order: string
  limit: string
  total: number
  page: string

  constructor(query: any, total: number) {
    this.search = query.search ? query.search : ''
    this.sortBy = query.sortBy
    this.order = query.order
    this.limit = query.limit
    this.total = total
    this.page = query.page
  }
}