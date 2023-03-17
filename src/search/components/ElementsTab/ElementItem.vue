<template>
  <div
    :style="{
      backgroundColor: item?.color || 'transparent',
      cursor: item ? 'pointer' : 'default',
    }"
    class="elements-item"
    :class="{
      selected,
    }"
    @click="onSelectElements(item)"
  >
    <template v-if="item">
      <div class="elements-item-text">{{ item.name }}</div>
      <div class="elements-item-sort">
        {{ item.sort }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CElement } from './data'

defineProps<{
  item: CElement | null
  selected?: boolean
}>()

const emits = defineEmits<{
  (e: 'select', value: CElement | null): void
}>()

const onSelectElements = (item: CElement | null) => {
  emits('select', item)
}
</script>

<style lang="scss" scoped>
.elements-item {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  margin: 0 4px 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease-out;
  cursor: pointer;
}

.elements-item:hover {
  transform: scale(1.1);
}

.elements-item-text {
  color: #f1f1f1;
  font-size: 13px;
  text-align: center;
}

.elements-item-sort {
  color: #f1f1f1;
  text-align: center;
  font-size: 12px;
  margin-top: 2px;
}

.selected {
  background-color: #5775bb !important;
}
</style>
