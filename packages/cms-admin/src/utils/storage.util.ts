type StorageType = 'localStorage' | 'sessionStorage'

export default class StorageUtil<T> {
  key: string
  storageType: StorageType

  constructor (key: string, storageType: StorageType = 'sessionStorage') {
    this.key = key
    this.storageType = storageType
  }

  get (): T | null {
    const value = window[this.storageType].getItem(this.key)
    if (!value) return null

    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }

  set (data: T) {
    window[this.storageType].setItem(this.key, JSON.stringify(data))
  }
}
