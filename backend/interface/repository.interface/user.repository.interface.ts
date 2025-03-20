import { IUser, UserLoginInput } from "../../src/types/user.types"

export interface IUserAuthRepositoryMethods {
    userLogout(data: UserLoginInput): Promise<IUser>
    userLogin(email: string, password: string): Promise<IUser>
}