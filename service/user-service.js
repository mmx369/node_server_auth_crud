import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dtos/user-dto.js'
import UserModel from '../models/user-model.js'
import mailService from './mail-service.js'
import TokenService from './token-service.js'

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new Error(`User ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw new Error(`Invalid activation link`)
    }
    user.isActivated = true
    await user.save()
  }
}

export default new UserService()
