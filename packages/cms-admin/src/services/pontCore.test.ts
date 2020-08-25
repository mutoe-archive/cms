import { PontCore } from 'src/services/pontCore'

describe('injectPathVariables', () => {
  const { warn } = console

  beforeAll(() => {
    delete console.warn
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.warn = warn
  })

  it('should inject provided path variables', () => {
    const templateUrl = '/api/v1/content/{pageId}/{cat}'

    const url = PontCore.getUrl(templateUrl, {
      pageId: 'verifyDocuments',
      cat: 'feedback',
    })

    expect(url).toEqual('/api/v1/content/verifyDocuments/feedback')
  })

  it('should return original url if no variables provided', () => {
    const templateUrl = '/api/v1/{answer}'

    const url = PontCore.getUrl(templateUrl)

    expect(url).toEqual('/api/v1/{answer}')
    expect(console.warn).toBeCalled()
  })

  it('should receive query parameters', () => {
    const templateUrl = '/api/v1/{answer}'

    const url = PontCore.getUrl(templateUrl, {
      answer: 'foo',
      pageNumber: 1,
      pageSize: 25,
      status: ['bar', 'baz'],
      users: [1, 2],
      other: [],
    })

    expect(url).toEqual('/api/v1/foo?pageNumber=1&pageSize=25&status=bar,baz&users=1,2')
  })
})
