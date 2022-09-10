export class CreateMeetupDTO {
  title: string
  date: string
  description: string
  place: string
  theme: string
  tags: string[]
  createdby: number

  constructor(body: any, createdby: any) {
    this.title = body.title
    this.date = body.date
    this.description = body.description
    this.place = body.place
    this.theme = body.theme
    this.tags = body.tags
    this.createdby = createdby
  }
}