<template>
  <div>
    <n-button type="primary" size="medium" @click="add">添加项目</n-button>
  </div>
  <!-- 表格 -->
  <n-data-table
    m="t-15px"
    remote
    :bordered="true"
    :columns="columns"
    :data="tableData"
    :pagination="pagination"
    :single-line="false"
    :loading="loading"
  >
  </n-data-table>
</template>

<script lang="ts" setup>
import { NButton, NPopconfirm, PaginationProps } from 'naive-ui'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { Molecule } from '../api/model/manager'
import managerApi from '../api/model/manager'

const router = useRouter()

const message = useMessage()

const columns: TableColumns<Molecule> = [
  {
    title: '姓名',
    key: 'email',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 240,
    align: 'center',
    render(row) {
      return [
        h(
          NButton,
          {
            type: 'primary',
            ghost: true,
            size: 'medium',
            onClick() {
              edit(row)
            },
          },
          { default: () => '编辑' },
        ),
        h(
          NButton,
          {
            type: 'primary',
            ghost: true,
            size: 'medium',
            class: 'ml-10px',
            onClick() {
              deleteItem(row.id || 0)
            },
          },
          { default: () => '删除' },
        ),
      ]
    },
  },
]

// 删除
const deleteItem = async (id: number) => {
  const res = await managerApi.deleteMolecule(id)
  if (res.code !== 200) {
    message.error(res.msg)
    return
  }
  message.success('删除成功')
  getData()
}

const edit = (form: Molecule) => {
  localStorage.setItem('form', JSON.stringify(form))
  router.push({
    name: 'EditForm',
  })
}

// 新建弹窗
const add = () => {
  localStorage.removeItem('form')
  router.push({
    name: 'AddForm',
  })
}

const tableData = ref<Molecule[]>([])
const loading = ref(false)

// 分页
const pagination = reactive<PaginationProps>({
  page: 1,
  pageCount: 2,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  onChange: (page: number) => {
    pagination.page = page
  },
  pageSizes: [10, 15, 30, 50, 100],
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

const getData = async () => {
  loading.value = true
  const res = await managerApi.listMolecule({
    page: pagination.page || 1,
    pageSize: pagination.pageSize || 10,
  })
  // await sleep(100)
  loading.value = false
  if (res.code === 200) {
    tableData.value = res.data.list
    pagination.itemCount = res.data.count
    pagination.pageCount = Math.ceil(res.data.count / (pagination.pageSize || 10))
    console.log(pagination.pageCount)
  } else {
    message.error(res.msg)
  }
}

const reload = () => {
  pagination.page = 1
  getData()
}

onMounted(reload)

watch(pagination, getData)
</script>
