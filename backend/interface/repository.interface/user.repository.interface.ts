import { IUser, UserLoginInput } from "../../src/types/user.types"

export interface IUserAuthRepositoryMethods {
    userLogout(data: UserLoginInput): IUser
    userLogin(email: string, password: string): IUser
}