import {
    ActionCreator,
    ActionCreator1,
    ActionCreator2,
    ActionCreator3,
    ActionCreator4,
    ActionCreator5,
    ActionCreator6,
    Dispatch,
    Middleware,
    Reducer,
} from "@nulliel/store"

export const effectMiddleware: Middleware

export interface EffectResolver<P> {
    (api: EffectAPI, payload: Readonly<P>): Promise<any>
}

export interface EffectAPI {
    dispatch: Dispatch;
    resolve<T>(reducer: Reducer<T>): T;
}

// @ts-ignore
export function createEffect<P>(actionCreator: ActionCreator, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, P>(actionCreator: ActionCreator1<Arg1, P>, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, Arg2, P>(actionCreator: ActionCreator2<Arg1, Arg2, P>, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, Arg2, Arg3, P>(actionCreator: ActionCreator3<Arg1, Arg2, Arg3, P>, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, Arg2, Arg3, Arg4, P>(actionCreator: ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, Arg2, Arg3, Arg4, Arg5, P>(actionCreator: ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>, handler: EffectResolver<S, P>): void
export function createEffect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>, handler: EffectResolver<S, P>): void
