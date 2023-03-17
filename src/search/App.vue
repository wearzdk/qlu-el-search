<script lang="ts" setup></script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/**
body 始终有进度条 */
body {
  overflow-y: scroll;
}

html {
  overflow-y: overlay;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

::-webkit-scrollbar:horizontal {
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #0000004d;
}

* {
  font-family: 'SourceHanSansCN', 'PingFang SC', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
}
</style>
