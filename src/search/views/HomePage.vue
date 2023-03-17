<script setup lang="ts">
import ElementsTab from '../components/ElementsTab.vue'
import useSelectedEl from '../composables/useSelectedEl'

const { selectedEl, searchInput, syncSelectedEl } = useSelectedEl()
</script>

<template>
  <!-- header -->
  <div class="w-full h-60px bg-gray-700">
    <div class="flex justify-center items-center h-full">
      <div class="text-2xl text-white">xxxx</div>
    </div>
  </div>
  <!-- 搜索框 -->
  <div class="mx-auto mt-40px">
    <n-input-group class="justify-center">
      <n-input
        v-model:value="searchInput"
        clearable
        :style="{ width: '500px' }"
        placeholder="请输入元素或在下方选择"
        @input="syncSelectedEl"
      />
      <n-button type="primary"> 搜索 </n-button>
    </n-input-group>
  </div>
  <!-- 元素周期表 -->
  <ElementsTab class="mt-20px" :elements-list="selectedEl" multiple />

  <!-- 搜索结果 -->
  <div class="w-860px mx-auto mt-20px">
    <SearchResultList />
  </div>
</template>

<style>
body {
  background-color: #f1f1f1;
}
</style>
