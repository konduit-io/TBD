/* eslint-disable max-len */

//========
// Actions
//========

export interface ActionObject {
    name: string
    toString(): string

    reducers: Array<Reducer<any>>
    assign(reducer: Reducer<any>): void
}

export interface Action<P> {
    type:     string
    data:     P
    reducers: Array<Reducer<any>>
}

export type AnyAction = Action<any>

export interface ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> extends ActionObject {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6): Action<P>
}
export interface ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P> extends ActionObject {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5): Action<P>
}
export interface ActionCreator4<Arg1, Arg2, Arg3, Arg4, P> extends ActionObject {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4): Action<P>
}
export interface ActionCreator3<Arg1, Arg2, Arg3, P> extends ActionObject {
    (arg1: Arg1, arg2: Arg2, arg3: Arg3): Action<P>
}
export interface ActionCreator2<Arg1, Arg2, P> extends ActionObject {
    (arg1: Arg1, arg2: Arg2): Action<P>
}
export interface ActionCreator1<Arg1, P> extends ActionObject {
    (arg1: Arg1): Action<P>
}
export interface ActionCreator extends ActionObject {
    (): Action<undefined>
}

export type PayloadReducer1<Arg1, P> = (arg1: Arg1) => P
export type PayloadReducer2<Arg1, Arg2, P> = (arg1: Arg1, arg2: Arg2) => P
export type PayloadReducer3<Arg1, Arg2, Arg3, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3) => P
export type PayloadReducer4<Arg1, Arg2, Arg3, Arg4, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => P
export type PayloadReducer5<Arg1, Arg2, Arg3, Arg4, Arg5, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => P
export type PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => P

// @ts-ignore
export function createAction(type: string): ActionCreator
export function createAction<Arg1, P>(type: string, payloadReducer: PayloadReducer1<Arg1, P>): ActionCreator1<Arg1, P>
export function createAction<Arg1, Arg2, P>(type: string, payloadReducer: PayloadReducer2<Arg1, Arg2, P>): ActionCreator2<Arg1, Arg2, P>
export function createAction<Arg1, Arg2, Arg3, P>(type: string, payloadReducer: PayloadReducer3<Arg1, Arg2, Arg3, P>): ActionCreator3<Arg1, Arg2, Arg3, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, P>(type: string, payloadReducer: PayloadReducer4<Arg1, Arg2, Arg3, Arg4, P>): ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, P>(type: string, payloadReducer: PayloadReducer5<Arg1, Arg2, Arg3, Arg4, Arg5, P>): ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(type: string, payloadReducer: PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>): ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>

//=========
// Reducers
//=========
type Handler<S, P> = (payload: Readonly<P>, state: S) => Partial<S>

export interface Reducer<S> {
    (state: S, action: AnyAction): S

    on<P>(actionCreator: ActionCreator, handler: Handler<S, P>): Reducer<S>
    on<Arg1, P>(actionCreator: ActionCreator1<Arg1, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, P>(actionCreator: ActionCreator2<Arg1, Arg2, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, P>(actionCreator: ActionCreator3<Arg1, Arg2, Arg3, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, P>(actionCreator: ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, Arg5, P>(actionCreator: ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>, handler: Handler<S, P>): Reducer<S>
    on<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>, handler: Handler<S, P>): Reducer<S>
}

export interface InternalReducer<TState> extends Reducer<TState> {
    handlers: Map<string, Handler<TState, any>>
}

export function createReducer<TState>(initialState: TState): Reducer<TState>

//======
// Slice
//======
export class Slice<TState>
{
    constructor(stateEvaluator: () => TState, initialState?: TState)

    update(): boolean

    resolve(): TState

    notify(): void

    subscribe(subscriber: (state: TState) => unknown): number
    unsubscribe(subscriber: (state: TState) => unknown): void
}
export function createSlice<TState>(stateEvaluator: () => TState, initialState?: TState)

export interface InternalSlice<TState> extends Slice<TState> {
    updateState(action: AnyAction): void
    injectState(newState: TState): void
}

//======
// Store
//======
export interface Store {
    dispatch:    Dispatch,
    resolve:     Resolve,
    wrapReducer: WrapReducer;
}

export interface InternalStore extends Store {
    isDispatching: boolean
    slices: Map<Reducer<any>, InternalSlice<any>>

    wrapReducer: InternalWrapReducer;
}

export interface Dispatch {
    (action: AnyAction): void
}

export interface Resolve {
    <TState>(wrapper: Slice<TState> | Reducer<TState>): TState
}

export interface WrapReducer {
    <TState>(reducer: Reducer<TState>): Slice<TState>
}

export interface InternalWrapReducer {
    <TState>(reducer: Reducer<TState>): InternalSlice<TState>
}

export function createStore(...middleware: Middleware[]): Store

//===========
// Middleware
//===========
export interface Middleware {
    (store: InternalStore, middlewareAPI: MiddlewareAPI): Partial<MiddlewareAPI>
}

export interface MiddlewareAPI {
    dispatch:    Dispatch;
    resolve:     Resolve;
    wrapReducer: InternalWrapReducer;
}
