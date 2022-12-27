export class UserDto {
  email
  id
  isActivated
  constructor(model) {
    console.log(111, model)
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
