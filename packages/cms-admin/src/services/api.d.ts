type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value;
};

declare type SwrConfig = import('swr').ConfigInterface;

declare namespace defs {
  export class AuthRo {
    /** bio */
    bio: string;

    /** createdAt */
    createdAt: string;

    /** email */
    email: string;

    /** id */
    id: number;

    /** image */
    image: string;

    /** token */
    token: string;

    /** updatedAt */
    updatedAt: string;

    /** username */
    username: string;
  }

  export class LoginDto {
    /** password */
    password: string;

    /** username */
    username: string;
  }

  export class RegisterDto {
    /** email */
    email: string;

    /** password */
    password: string;

    /** username */
    username: string;
  }
}

declare namespace API {
  /**
   * Application
   */
  export namespace app {
    /**
     * Health check
     * /api/app/hello
     */
    export namespace healthCheck {
      class Params {
        /** name */
        name?: any;
      }

      export type HooksParams = (() => Params) | Params;

      export type Response = any;

      export function mutate(
        params?: HooksParams,
        newValue?: any,
        shouldRevalidate?: boolean,
      );

      export function trigger(params?: HooksParams, shouldRevalidate?: boolean);

      export function useRequest(
        params?: HooksParams,
        options?: SwrConfig,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string
      export const path: string

      export function request(
        params: Params,
        fetchOptions?: RequestInit,
      ): Promise<Response>;
    }
  }

  /**
   * Authorization
   */
  export namespace auth {
    /**
     * login
     * /api/auth/login
     */
    export namespace login {
      export type Response = defs.AuthRo;

      export function mutate(newValue?: any, shouldRevalidate?: boolean);

      export function trigger(shouldRevalidate?: boolean);

      export function useRequest(
        options?: SwrConfig,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string
      export const path: string

      export function request(
        body: defs.LoginDto,
        fetchOptions?: RequestInit,
      ): Promise<Response>;
    }

    /**
     * register
     * /api/auth/register
     */
    export namespace register {
      export type Response = defs.AuthRo;

      export function mutate(newValue?: any, shouldRevalidate?: boolean);

      export function trigger(shouldRevalidate?: boolean);

      export function useRequest(
        options?: SwrConfig,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string
      export const path: string

      export function request(
        body: defs.RegisterDto,
        fetchOptions?: RequestInit,
      ): Promise<Response>;
    }
  }

  /**
   * User
   */
  export namespace user {
    /**
     *
     * /api/user
     */
    export namespace profile {
      export type Response = any;

      export function mutate(newValue?: any, shouldRevalidate?: boolean);

      export function trigger(shouldRevalidate?: boolean);

      export function useRequest(
        options?: SwrConfig,
      ): { isLoading: boolean; data: Response; error: Error };

      export const method: string
      export const path: string

      export function request(fetchOptions?: RequestInit): Promise<Response>;
    }
  }
}
