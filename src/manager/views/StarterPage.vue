<template>
  <div class="w-full">
    <div h="70vh" w="500px" flex="~" class="items-center justify-center mx-auto">
      <n-form
        class="w-full relative"
        label-width="140"
        label-placement="left"
        label-align="left"
        :inline="false"
        size="large"
      >
        <n-form-item label="服务器url">
          <n-input v-model:value="serverUrl" placeholder="输入服务器地址" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input v-model:value="authToken" placeholder="Auth Token" />
        </n-form-item>
        <n-button type="primary" size="large" class="w-full" :loading="onTesting" @click="toManager">进入管理</n-button>
        <!-- 语言切换 -->
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import managerApi from '../api/model/manager'

const serverUrl = useStorage('serverUrl', '')
const authToken = useStorage('authToken', '')
const message = useMessage()
const router = useRouter()

const onTesting = ref(false)
const Login = async () => {
  try {
    onTesting.value = true
    const res = await managerApi.ping()
    if (res.code !== 200) {
      message.error('连接失败')
      return
    }
    router.push({
      name: 'Manager',
    })
  } catch (error) {
    message.error('连接失败' + error)
  } finally {
    setTimeout(() => {
      onTesting.value = false
    }, 1000)
  }
}

const toManager = () => {
  Login()
}

// const changeLang = (lang: string) => {
//   const locateState = useStorage('locale', 'zh-CN')
//   locateState.value = lang
//   locale.value = lang
// }
</script>
