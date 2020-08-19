import { CodeGenerator, Interface } from '@mutoe/pont-engine'

export default class MyGenerator extends CodeGenerator {
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

  getCommonDeclaration (): string {
    return `
    declare type SwrConfig = import("swr").ConfigInterface;
    declare type AxiosRequestConfig = import("axios").AxiosRequestConfig;
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

    import * as SWR from 'swr';
    import * as defs from '${relativePath}baseClass';
    import * as Hooks from '${relativePath}hooks';
    import { PontCore } from '${relativePath}pontCore'
    
    ${isEmptyParams ? '' : paramsCode}
    
    export const method = "${method}";
    export const path = "${inter.path}"

    export function mutate(${isEmptyParams ? '' : 'params: HooksParams = {}, '} newValue = undefined, shouldRevalidate = true) {
      return SWR.mutate(Hooks.getUrlKey(path, ${isEmptyParams ? '{}' : 'params'}), newValue, shouldRevalidate);
    }

    export function trigger(${isEmptyParams ? '' : 'params: HooksParams = {}, '} shouldRevalidate = true) {
      return SWR.trigger(Hooks.getUrlKey(path, ${isEmptyParams ? '{}' : 'params'}), shouldRevalidate);
    }

    export function useRequest(${isEmptyParams ? '' : 'params: HooksParams = {}, '} swrOptions = {}) {
      return Hooks.useRequest(path, ${isEmptyParams ? '{}' : 'params'}, swrOptions);
    };

    export function request(${requestParams}) {
      return PontCore.fetch({
        url: PontCore.getUrl(path ${isEmptyParams ? '' : ', params'}),
        method: '${method}',
        ${bodyParamsCode ? 'data,' : ''}
        ...axiosOption,
      });
    }`
  }
}
