import service from '../http'
import { R, RP } from './base'

// type Molecule struct {
// 	ID            uint   `gorm:"primarykey" json:"id"`
// 	Name          string `json:"name"`                               // 分子名称
// 	Formula       string `json:"formula"`                            // 化学式
// 	Elements      string `json:"elements" gorm:"index:idx_elements"` // 元素列表
// 	HeatJson      string `json:"heat"`                               // 热物性
// 	StructureJson string `json:"structure"`                          // 原子结构
// 	ElectronJson  string `json:"electron"`                           // 电子结构
// 	GlassJson     string `json:"glass"`                              // 玻璃形成能力
// 	MagneticJson  string `json:"magnetic"`                           // 磁性能
// }

export interface Molecule {
  id?: number
  name: string
  formula: string
  elements: string
  heat: string
  structure: string
  electron: string
  glass: string
  magnetic: string
}

const managerApi = {
  // 连接测试
  ping: async () => service.get<R<string>>('/ping'),

  // 创建分子
  createMolecule: async (molecule: Molecule) => service.post<R<Molecule>>('/molecule', molecule),
  // 更新分子
  updateMolecule: async (molecule: Molecule) => service.put<R<Molecule>>('/molecule', molecule),
  // 删除分子
  deleteMolecule: async (id: number) => service.delete<R<Molecule>>('/molecule', [id]),
  // 获取分子列表
  listMolecule: async (params: { page?: number; pageSize?: number }) => service.get<RP<Molecule>>('/molecules', params),
}

export default managerApi
