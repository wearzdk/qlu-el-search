import { CElement, elementsTab } from '../components/ElementsTab/data'

const useSelectedEl = () => {
  const selectedEl = reactive<CElement[]>([])

  const selectedElStr = computed(() => {
    return selectedEl.map((item) => item.name).join(' ')
  })

  const searchInput = ref('')

  watch(selectedElStr, (val) => {
    searchInput.value = val
  })

  const syncSelectedEl = () => {
    selectedEl.splice(0, selectedEl.length)
    const searchInputArr = searchInput.value.split(' ')
    elementsTab.forEach((item) => {
      if (item && searchInputArr.includes(item.name)) {
        selectedEl.push(item)
      }
    })
  }
  return {
    selectedEl,
    searchInput,
    syncSelectedEl,
  }
}

export default useSelectedEl
