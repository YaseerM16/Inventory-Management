import { IUserAuthServicesMethods } from "../../../interface/service.Interface/user.service.interface";
import UserAuthRepository from "../../../repositories/userRepository/AuthRepository";
import { UserLoginInput, IUser } from "../../types/user.types";

export default class UserAuthServices implements IUserAuthServicesMethods {
    private userAuthRepository: UserAuthRepository

    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }
    userLogin(email: string, password: string): IUser {
        try {
            const addUser = this.userAuthRepository.userLogin(email, password)
            return addUser
        } catch (error: unknown) {
            throw error
        }
    }
    userLogout(data: UserLoginInput): IUser {
        throw new Error("Method not implemented.");
    }
}

const userAuthRepository = new UserAuthRepository()
export const userAuthServices = new UserAuthServices(userAuthRepository)

