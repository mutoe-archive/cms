import { CodeGenerator, Interface } from '@mutoe/pont-engine'

function reviseModName (modName: string) {
  // .replace(/\//g, '.').replace(/^\./, '').replace(/\./g, '_') 转换 / .为下划线
  // exp: /api/v1/users  => api_v1_users
  // exp: api.v1.users => api_v1_users
  return modName
    .replace(/\//g, '.')
    .replace(/^\./, '')
    .replace(/\./g, '_')
}

export default class MyGenerator extends CodeGenerator {
  getDeclaration () {
    return ''
  }

  getIndex () {
    const conclusion = `
      import * as defs from './baseClass';
      import { API } from './mods/';
      
      export { defs, API }
    `

    return conclusion
  }

  getModsIndex () {
    const conclusion = `
      export const API = {
        ${this.dataSource.mods.map(mod => reviseModName(mod.name)).join(', \n')}
      };
    `

    return `
      ${this.dataSource.mods
      .map(mod => {
        const modName = reviseModName(mod.name)
        return `import * as ${modName} from './${modName}';`
      })
      .join('\n')}

      ${conclusion}
    `
  }

  getInterfaceContentInDeclaration (inter: Interface): string {
    let paramsCode = inter.getParamsCode()
    const isEmptyParams = paramsCode.replace(/\s/g, '') === 'classParams{}'

    const bodyParamsCode = inter.getBodyParamsCode()

    const requestArgs = []
    !isEmptyParams && requestArgs.push('params: Params')
    bodyParamsCode && requestArgs.push(`body: ${bodyParamsCode}`)
    requestArgs.push('axiosOption?: AxiosRequestConfig')
    const requestParams: string = requestArgs.join(', ')

    if (!isEmptyParams) {
      paramsCode += '\nexport type HooksParams = (() => Params) | Params;'
    }
    return ''

    return `
      ${isEmptyParams ? '' : paramsCode}

      export type Response = ${inter.responseType}

      export function mutate(${isEmptyParams ? '' : 'params?: HooksParams, '} newValue?: any, shouldRevalidate?: boolean)
  
      export function trigger(${isEmptyParams ? '' : 'params?: HooksParams, '} shouldRevalidate?: boolean)

      export function useRequest(${isEmptyParams ? '' : 'params?: HooksParams, '} options?: SwrConfig): { isLoading: boolean; data: Response, error: Error };

      export const method: string;
      export const path: string;

      export function request(${requestParams}): Promise<Response>;
    `
  }

  getInterfaceContent (inter: Interface): string {
    const method = inter.method.toUpperCase()
    const relativePath = this.usingMultipleOrigins ? '../../../' : '../../'
    let paramsCode = inter.getParamsCode('Params', this.surrounding).replace(/class/, 'interface')
    const isEmptyParams = paramsCode.replace(/\s/g, '') === 'interfaceParams{}'

    const bodyParamsCode = inter.getBodyParamsCode()

    const requestArgs = []
    !isEmptyParams && requestArgs.push('params: Params')
    bodyParamsCode && requestArgs.push(`data: ${inter.getBodyParamsCode()}`)
    requestArgs.push('axiosOption: AxiosRequestConfig  = {}')
    const requestParams: string = requestArgs.join(', ')

    if (!isEmptyParams) {
      paramsCode += '\ntype HooksParams = (() => Params) | Params;'
    }

    return `
    /**
     * @desc ${inter.description}
     */

    import { AxiosRequestConfig } from 'axios'
    import * as SWR from 'swr';
    import * as defs from '${relativePath}baseClass';
    import * as Hooks from '${relativePath}hooks';
    import { PontCore } from '${relativePath}pontCore'
    
    ${isEmptyParams ? '' : paramsCode}
    
    export const method = "${method}";
    export const path = "${inter.path}"

    export function mutate(${isEmptyParams ? '' : 'params: HooksParams = {}, '} newValue: any = undefined, shouldRevalidate = true) {
      return SWR.mutate(Hooks.getUrlKey(path, ${isEmptyParams ? '{}' : 'params'}), newValue, shouldRevalidate);
    }

    export function trigger(${isEmptyParams ? '' : 'params: HooksParams = {}, '} shouldRevalidate = true) {
      return SWR.trigger(Hooks.getUrlKey(path, ${isEmptyParams ? '{}' : 'params'}), shouldRevalidate);
    }

    export function useRequest(${isEmptyParams ? '' : 'params: HooksParams = {}, '} swrOptions: SWR.ConfigInterface = {}) {
      return Hooks.useRequest(path, ${isEmptyParams ? '{}' : 'params'}, swrOptions);
    };

    export function request(${requestParams}): Promise<${inter.responseType}> {
      return PontCore.fetch({
        url: PontCore.getUrl(path ${isEmptyParams ? '' : ', params'}),
        method: '${method}',
        ${bodyParamsCode ? 'data,' : ''}
        ...axiosOption,
      });
    }`
  }
}
