type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare type ConfigInterface = import('swr').ConfigInterface;

declare namespace defs {
  export class LoginDto {
    /** email */
    email?: string;

    /** password */
    password?: string;
  }

  export class RegisterDto {
    /** email */
    email?: string;

    /** password */
    password?: string;

    /** username */
    username?: string;
  }
}

declare namespace API {
  /**
   *
   */
  export namespace app {
    /**
     * health check
     * /app/hello
     */
    export namespace healthCheck {
      export class Params {
        /** name */
        name?: any;
      }

      export type HooksParams = (() => Params) | Params;

      export type Response = any;

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      );

      export function trigger(params?: HooksParams, shouldRevalidate = true);

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string

      export function request(params: Params, options?: any): Promise<Response>;
    }
  }

  /**
   *
   */
  export namespace auth {
    /**
     * login
     * /auth/login
     */
    export namespace login {
      export class Params {}

      export type HooksParams = (() => Params) | Params;

      export type Response = any;

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      );

      export function trigger(params?: HooksParams, shouldRevalidate = true);

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string

      export function request(params: Params, options?: any): Promise<Response>;
    }

    /**
     * register
     * /auth/register
     */
    export namespace register {
      export class Params {}

      export type HooksParams = (() => Params) | Params;

      export type Response = any;

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      );

      export function trigger(params?: HooksParams, shouldRevalidate = true);

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string

      export function request(params: Params, options?: any): Promise<Response>;
    }
  }

  /**
   *
   */
  export namespace user {
    /**
     *
     * /user
     */
    export namespace profile {
      export class Params {}

      export type HooksParams = (() => Params) | Params;

      export type Response = any;

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate = true,
      );

      export function trigger(params?: HooksParams, shouldRevalidate = true);

      export function useRequest(
        params?: HooksParams,
        options?: ConfigInterface,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string

      export function request(params: Params, options?: any): Promise<Response>;
    }
  }
}
