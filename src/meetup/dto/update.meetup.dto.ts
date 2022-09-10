export class UpdateMeetupDTO {
  id: string
  title: string
  date: string
  description: string
  place: string
  theme: string
  tags: string[]

  constructor(id: string, body: any) {
    this.title = body.title
    this.date = body.date
    this.description = body.description
    this.place = body.place
    this.theme = body.theme
    this.tags = body.tags
    this.id = id
  }
}