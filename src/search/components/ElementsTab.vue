<template>
  <div class="elements-container">
    <div class="elements-main">
      <div class="elements">
        <ElementItem
          v-for="(item, index) in elementsTab"
          :key="`${item?.sort || 0}${index}`"
          :item="item"
          :selected="isSelect(item)"
          @select="onSelectElements"
        />
      </div>

      <div class="la-lu" style="margin-top: 20px">
        <ElementItem
          v-for="(item, index) in La_Lu"
          :key="`${item?.sort || 0}${index}`"
          :item="item"
          :selected="isSelect(item)"
          @select="onSelectElements"
        />
      </div>

      <div class="ac_lr">
        <ElementItem
          v-for="(item, index) in Ac_Lr"
          :key="`${item?.sort || 0}${index}`"
          :item="item"
          :selected="isSelect(item)"
          @select="onSelectElements"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { elementsTab, La_Lu, Ac_Lr, CElement } from './ElementsTab/data'
import ElementItem from './ElementsTab/ElementItem.vue'

const props = defineProps<{
  multiple?: boolean
  elementsList: CElement[]
}>()

const emits = defineEmits<{
  (e: 'update:elementsList', value: CElement[]): void
}>()

let elementsList = reactive<CElement[]>(props.elementsList)

const isSelect = (item: CElement | null) => {
  if (!item) return false
  return elementsList.includes(item)
}
const onSelectElements = (item: CElement | null) => {
  if (!item) return
  if (props.multiple) {
    if (elementsList.includes(item)) {
      elementsList.splice(elementsList.indexOf(item), 1)
    } else {
      elementsList.push(item)
    }
  } else {
    elementsList = [item]
  }
  emits('update:elementsList', elementsList)
}
</script>

<style lang="scss" scoped>
.elements-main {
  margin: 10px auto 0;
  width: 840px;
  padding: 20px;
  .elements {
    display: flex;
    flex-wrap: wrap;
  }

  .la-lu,
  .ac_lr {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
}
</style>
