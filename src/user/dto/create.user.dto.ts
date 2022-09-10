export class CreateUserDTO {
  name: string
  password: string
  email: string
  role: string

  constructor(data: any) {
    this.name = data.name
    this.password = data.password
    this.email = data.email
    this.role = data.secret ? 'admin' : 'user'
  }
}