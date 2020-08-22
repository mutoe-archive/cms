import StorageUtil from './storage.util'

describe('# Storage Util', () => {
  afterEach(jest.clearAllMocks)

  it('should using localStorage to store data default', () => {
    const fooStorage = new StorageUtil('storage_foo')
    fooStorage.get()

    expect(localStorage.getItem).toBeCalledTimes(1)
  })

  it('should using sessionStorage when passed in sessionStorage', () => {
    const fooStorage = new StorageUtil('storage_foo', 'sessionStorage')
    fooStorage.get()

    expect(sessionStorage.getItem).toBeCalledTimes(1)
  })

  it('should using passed key to store data', () => {
    const fooStorage = new StorageUtil('storage_foo')
    fooStorage.set('foo')

    expect(localStorage.setItem).toBeCalledWith('storage_foo', '"foo"')
  })

  it('should convert data to string when passed in array or object', () => {
    const fooStorage = new StorageUtil('storage_foo')
    fooStorage.set({ foo: 'bar' })

    expect(localStorage.setItem).toBeCalledWith('storage_foo', JSON.stringify({ foo: 'bar' }))
  })

  it('should parse the data to object or array when store a stringify data', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('{"foo": "bar"}')
    const fooStorage = new StorageUtil('storage_foo')
    const result = fooStorage.get()

    expect(result).toEqual({ foo: 'bar' })
  })

  it('should return null when store a invalid stringify data', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('{')
    const fooStorage = new StorageUtil('storage_foo')
    const result = fooStorage.get()

    expect(result).toBe(null)
  })
})
