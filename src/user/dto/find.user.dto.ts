export class FindUserDTO {
  name: string

  constructor(data: any) {
    this.name = data.name
  }
}