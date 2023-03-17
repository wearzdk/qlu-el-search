import service from '../http'
import { R, RP } from './base'

export type AccountItem = {
  id?: number
  username: string
  password: string
}

// apiV1.GET("/accounts", v1.GetAccounts)
// apiV1.POST("/account", v1.CreateAccount)
// apiV1.PUT("/account", v1.UpdateAccount)
// apiV1.DELETE("/account", v1.DeleteAccount)

const accountApi = {
  // 获取账户列表
  getAccounts: async () => service.get<RP<AccountItem>>('/accounts'),
  // 新增账户
  addAccount: async (account: AccountItem) => service.post<R<string>>('/account', account),
  // 删除账户
  deleteAccount: async (id: number) => service.delete<R<string>>('/account', [id]),
  // 修改账户
  updateAccount: async (account: AccountItem) => service.put<R<string>>('/account', account),
}

export default accountApi
