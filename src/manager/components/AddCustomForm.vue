<template>
  <n-form :model="form" label-width="100px" label-align="left" w-400px label-placement="left">
    <n-form-item label="表单名">
      <n-input v-model:value="form.label" placeholder="自定义label名" />
    </n-form-item>
    <n-form-item label="类型">
      <n-select v-model:value="form.type" size="medium" :options="typeOptions" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="commit">确认</n-button>
      <n-button class="ml-15px" @click="emits('close')">取消</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { CustomFormItem } from './CustomForm_interface'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'add', data: CustomFormItem): void
}>()

const typeOptions = [
  { label: '文本', value: 'text' },
  { label: '图片', value: 'image' },
]

const form = reactive<CustomFormItem>({
  label: '',
  type: 'text',
  value: '',
})
const message = useMessage()

const commit = async () => {
  if (!form.label) {
    message.error('请输入表单名')
    return
  }
  if (!form.type) {
    message.error('请选择类型')
    return
  }
  emits('add', form)
  emits('close')
}
</script>
