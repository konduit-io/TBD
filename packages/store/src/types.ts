import { AnyAction } from "./action"
import { Reducer } from "./reducer"
import { Slice } from "./slice"

export interface Store {
    dispatch:    Dispatch,
    resolve:     Resolve,
    wrapReducer: WrapReducer;
}

export interface InternalStore extends Store {
    isDispatching: boolean
    isEffect: boolean
    slices: Map<Reducer<any>, InternalSlice<any>>

    wrapReducer: InternalWrapReducer;
}

export interface Middleware {
    (store: InternalStore, middlewareAPI: MiddlewareAPI): Partial<MiddlewareAPI>
}

export interface MiddlewareAPI {
    dispatch:    Dispatch;
    resolve:     Resolve;
    wrapReducer: InternalWrapReducer;
}

export interface Dispatch {
    (action: AnyAction): void
}

export interface Resolve {
    <TState>(wrapper: Slice<TState> | Reducer<TState>): TState
}

export interface InternalWrapReducer {
    <TState>(reducer: Reducer<TState>): InternalSlice<TState>
}

export interface WrapReducer {
    <TState>(reducer: Reducer<TState>): Slice<TState>
}

export interface InternalSlice<TState> extends Slice<TState> {
    updateState(action: AnyAction): void
    injectState(newState: TState): void
}
