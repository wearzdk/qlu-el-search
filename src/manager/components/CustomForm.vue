<template>
  <n-card :title="title">
    <template #header-extra>
      <n-button type="primary" size="small" @click="add">
        <template #icon>
          <n-icon><AddAlt /></n-icon>
        </template>
        新增
      </n-button>
    </template>
    <n-modal
      v-model:show="onAddForm"
      style="width: 600px"
      size="huge"
      role="dialog"
      aria-modal="true"
      preset="card"
      title="添加表单"
    >
      <AddCustomForm @close="close" @add="addForm" />
    </n-modal>
    <!-- 表单列表 -->
    <n-form
      class="w-full relative"
      label-width="200px"
      label-placement="left"
      label-align="left"
      :inline="false"
      size="large"
    >
      <template v-for="(item, index) in form" :key="index">
        <n-form-item :label="item.label" class="relative">
          <template v-if="item.type === 'text'">
            <n-input v-model:value="item.value" :placeholder="`输入${item.label}`" style="width: 90%" />
          </template>
          <template v-else-if="item.type === 'image'">
            <n-upload
              :action="item.value"
              :show-file-list="false"
              :show-upload-list="false"
              :multiple="false"
              :limit="1"
            >
              <n-button type="primary" size="medium">上传图片</n-button>
            </n-upload>
          </template>

          <template #label>
            <div flex="~" class="items-center">
              <span>{{ item.label }}</span>
              <n-popconfirm @positive-click="deleteForm(index)">
                <template #trigger>
                  <n-button strong quaternary circle size="tiny" class="ml-5px" type="warning">
                    <template #icon>
                      <n-icon><CloseOutline /></n-icon>
                    </template>
                  </n-button>
                </template>
                你确定？
              </n-popconfirm>
            </div>
          </template>
        </n-form-item>
      </template>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { CustomFormItem } from './CustomForm_interface'
import { CloseOutline, AddAlt } from '@vicons/carbon'

/**
 * 自定义自动生成表单
 * 类型1：文本
 * 类型2：图片上传
 */

const props = defineProps<{
  form: CustomFormItem[]
  title: string
}>()

const form = ref(props.form)

// 新增from

const addForm = (CustomFormItem: CustomFormItem) => {
  form.value.push(CustomFormItem)
}

// 删除form
const deleteForm = (index: number) => {
  form.value.splice(index, 1)
}

// 新增自定义表单
const onAddForm = ref(false)
const add = () => {
  onAddForm.value = true
}
const close = () => {
  onAddForm.value = false
}
</script>

<style lang="scss" scoped></style>
