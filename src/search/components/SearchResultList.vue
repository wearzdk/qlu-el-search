<template>
  <div class="min-h-100vh">
    <n-data-table :columns="columns" :data="data" summary-placement="top" striped />
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'

const columns = reactive<TableColumns>([
  {
    title: '元素',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: () => {
      return h(NButton, { type: 'primary' }, { default: () => '详情' })
    },
  },
])

const data = reactive([
  {
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park',
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    name: 'Jim Red',
    age: 42,
    address: 'Ottawa No. 2 Lake Park',
  },
])
</script>

<style lang="scss" scoped></style>
