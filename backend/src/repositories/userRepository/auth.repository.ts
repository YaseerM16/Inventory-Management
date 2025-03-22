import { IUserAuthRepositoryMethods } from "../../interface/repository.interface/user.repository.interface"
import { IUser, UserLoginInput } from "../../types/user.types"
import { config } from "../../utils/constant";


export default class UserAuthRepository implements IUserAuthRepositoryMethods {
    userLogin(email: string, password: string): IUser {
        try {
            if (email === config.user_email && password === config.user_pass) {
                return {
                    email
                }
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            throw error;
        }
    }
    userLogout(data: UserLoginInput): IUser {
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
