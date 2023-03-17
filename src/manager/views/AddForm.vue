<template>
  <div>
    <n-card title="基础信息">
      <n-form :model="commonForm" label-width="100px" label-align="left" w-400px label-placement="left">
        <n-form-item label="名称">
          <n-input v-model:value="commonForm.name" placeholder="请输入名称" />
        </n-form-item>
        <n-form-item label="化学式">
          <n-input v-model:value="commonForm.formula" placeholder="请输入化学式" />
        </n-form-item>
        <n-form-item label="元素">
          <n-input v-model:value="commonForm.elements" placeholder="自动生成" disabled size="medium" multiple />
        </n-form-item>
      </n-form>
    </n-card>
    <n-grid x-gap="24" class="mt-24px" cols="1 s:1 m:2" responsive="screen">
      <n-gi>
        <custom-form :form="heatForm" title="热物性" />
        <custom-form class="mt-24px" :form="structureForm" title="原子结构" />
      </n-gi>
      <n-gi>
        <custom-form :form="electronForm" title="电子结构" />
        <custom-form class="mt-24px" :form="glassForm" title="玻璃形成能力" />
        <custom-form class="mt-24px" :form="magneticForm" title="磁性能" />
      </n-gi>
    </n-grid>
    <n-button type="primary" class="mt-15px" size="large" :loading="loading" @click="onSubmit">提交</n-button>
  </div>
</template>

<script lang="ts" setup>
import managerApi from '../api/model/manager'
import { CustomFormItem } from '../components/CustomForm_interface'

// 基础信息
const commonForm = reactive({
  name: '',
  formula: '',
  elements: '',
})

watch(
  () => commonForm.formula,
  (val) => {
    // 将数字用空格替代
    const els = val.replace(/\d+/g, ' ').split(' ')
    const res: string[] = []
    els.forEach((el) => {
      if (el.trim().length > 0) {
        res.push(el)
      }
    })
    commonForm.elements = res.join(',')
  },
)

// 热物性form
const heatForm = ref<CustomFormItem[]>([
  {
    label: '粘度',
    type: 'text',
    value: '',
  },
  {
    label: '密度',
    type: 'text',
    value: '',
  },
  {
    label: '膨胀系数',
    type: 'text',
    value: '',
  },
  {
    label: 'CCT曲线',
    type: 'text',
    value: '',
  },
  {
    label: 'TTT曲线',
    type: 'text',
    value: '',
  },
  {
    label: 'DSC',
    type: 'image',
    value: '',
  },
])

// 原子结构
const structureForm = ref<CustomFormItem[]>([
  {
    label: 'XRD',
    type: 'image',
    value: '',
  },
  {
    label: '双体分布函数（PDF）',
    type: 'image',
    value: '',
  },
  {
    label: '配位数（CN）',
    type: 'image',
    value: '',
  },
  {
    label: 'Voronoi多面体（VP）',
    type: 'image',
    value: '',
  },
  {
    label: '化学短程序（CSRO）',
    type: 'image',
    value: '',
  },
])

// 电子结构
const electronForm = ref<CustomFormItem[]>([
  {
    label: '能带',
    type: 'image',
    value: '',
  },
  {
    label: '态密度',
    type: 'image',
    value: '',
  },
])

// 玻璃形成能力
const glassForm = ref<CustomFormItem[]>([
  {
    label: 'Tg',
    type: 'text',
    value: '',
  },
  {
    label: 'Tm',
    type: 'text',
    value: '',
  },
  {
    label: 'Tx',
    type: 'text',
    value: '',
  },
  {
    label: 'Ti',
    type: 'text',
    value: '',
  },
])

// 磁性能
const magneticForm = ref<CustomFormItem[]>([
  {
    label: '磁化强度（Ms）',
    type: 'image',
    value: '',
  },
  {
    label: '饱和磁感强度（Bs)',
    type: 'image',
    value: '',
  },
  {
    label: '矫顽力（Hc）',
    type: 'image',
    value: '',
  },
])

const loading = ref(false)

const message = useMessage()

const BuildJson = (form: CustomFormItem[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return JSON.stringify(form)
}

const getJson = () => {
  const obj = {
    heat: BuildJson(heatForm.value),
    structure: BuildJson(structureForm.value),
    electron: BuildJson(electronForm.value),
    glass: BuildJson(glassForm.value),
    magnetic: BuildJson(magneticForm.value),
  }
  return obj
}

const onSubmit = async () => {
  const data = getJson()
  managerApi
    .createMolecule({
      name: commonForm.name,
      formula: commonForm.formula,
      elements: commonForm.elements,
      ...data,
    })
    .then((res) => {
      if (res.code === 200) {
        message.success('提交成功')
      } else {
        message.error('提交失败')
      }
    })
  loading.value = true
}
</script>

<style lang="scss" scoped></style>
