import { IUser, UserLoginInput } from "../../types/user.types"

export interface IUserAuthServicesMethods {
    userLogout(data: UserLoginInput): IUser
    userLogin(email: string, password: string): IUser
}