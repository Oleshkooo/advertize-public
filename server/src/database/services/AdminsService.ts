import { AdminModel, type IAdmin } from '@/database/models'

export class AdminsService {
    public async getAll(): Promise<IAdmin[]> {
        try {
            const admins: IAdmin[] = await AdminModel.find().lean()
            return admins
        } catch (error) {
            console.error(error)
            return [] as IAdmin[]
        }
    }

    public async getTelegram(): Promise<IAdmin[]> {
        try {
            const admins: IAdmin[] = await AdminModel.find({
                isTelegramSubscribed: true,
            }).lean()
            return admins
        } catch (error) {
            console.error(error)
            return [] as IAdmin[]
        }
    }

    public async getEmail(): Promise<IAdmin[]> {
        try {
            const admins: IAdmin[] = await AdminModel.find({
                isEmailSubscribed: true,
            }).lean()
            return admins
        } catch (error) {
            console.error(error)
            return [] as IAdmin[]
        }
    }

    public async getByUsername(username: string): Promise<IAdmin | null> {
        try {
            const admin: IAdmin | null = await AdminModel.findOne({ username })
            return admin
        } catch (error) {
            console.error(error)
            return null as IAdmin | null
        }
    }
}
