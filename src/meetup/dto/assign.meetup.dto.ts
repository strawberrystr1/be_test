export class AssignMeetupDTO {
  id: number
  meetup: string
  constructor(data: any) {
    this.id = data.id
    this.meetup = data.meetup
  }
}