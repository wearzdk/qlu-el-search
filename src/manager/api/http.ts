// 封装fetch
const SERVER_URL = useStorage('serverUrl', '')
const authToken = useStorage('authToken', '')
const BASE_PATH = '/api/v1'

const BASE_URL = computed(() => SERVER_URL.value + BASE_PATH)

const fetcher = async (url: string, options?: RequestInit) => {
  const reqUrl = BASE_URL.value + url
  const res = await fetch(reqUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value,
    },
  })
  const json = await res.json()
  // 如果code为401 则跳转到起始页
  if (json.code === 401) {
    // 如果不在登录页则跳转到登录页
    if (window.location.pathname !== '/') {
      window.location.href = '/'
    }
  }
  return json
}

const service = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(url: string, params: any = {}, options?: RequestInit): Promise<T> {
    const query = Object.keys(params).map((key) => `${key}=${params[key]}`)
    return fetcher(`${url}?${query.join('&')}`, options)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T = any>(url: string, data: any, options?: RequestInit): Promise<T> {
    return fetcher(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T = any>(url: string, data: any, options?: RequestInit): Promise<T> {
    return fetcher(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T = any>(url: string, ids: number[], options?: RequestInit): Promise<T> {
    return fetcher(url, {
      body: JSON.stringify({
        ids: ids.join(','),
      }),
      ...options,
      method: 'DELETE',
    })
  },
}

export default service
