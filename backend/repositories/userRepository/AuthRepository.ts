import { IUserAuthRepositoryMethods } from "../../interface/repository.interface/user.repository.interface"
import { IUser, UserLoginInput } from "../../src/types/user.types"
import BaseRepository from "../base.repository"


export default class UserAuthRepository implements IUserAuthRepositoryMethods {
    userLogin(email: string, password: string): Promise<IUser> {
        try {

        } catch (error) {
            throw error
        }
        throw new Error("Method not implemented.")
    }
    userLogout(data: UserLoginInput): Promise<IUser> {
        throw new Error("Method not implemented.")
    }

    // async userSignup(data: UserSignUpInput): Promise<IUser> {
    //     try {
    //         const addUser = await this.createData('User', data as unknown as Partial<IUser>)
    //         return addUser
    //     } catch (error: unknown) {
    //         throw error
    //     }
    // }

    // async userLogin(email: string, password: string): Promise<IUser> {
    //     try {
    //         const loginUser = await this.findOne('User', { email }) as IUser
    //         if (!loginUser) {
    //             const error = new Error('Invalid Credentials')
    //             error.name = 'InvalidCredentials'
    //             throw error
    //         }
    //         return loginUser
    //     } catch (error: unknown) {
    //         throw error
    //     }
    // }
}
