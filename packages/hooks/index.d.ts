
//======
// Hooks
//======
import {
    ActionCreator,
    ActionCreator1, ActionCreator2, ActionCreator3, ActionCreator4, ActionCreator5, ActionCreator6,
    Dispatch,
    Middleware,
    PayloadReducer1,
    PayloadReducer2, PayloadReducer3, PayloadReducer4, PayloadReducer5, PayloadReducer6,
    Reducer
} from "@nulliel/store"
import { ReactChild, ReactElement } from "react"

export interface ProviderProps {
    children:    ReactChild
    middleware?: Middleware[]
}

export function StateProvider({ children, middleware }: ProviderProps): ReactElement

export function useSlice<T>(reducer: Reducer<T>): T
export function useDispatch(): Dispatch


// @ts-ignore
export function createAction(type: string): ActionCreator
export function createAction<Arg1, P>(type: string, payloadReducer: PayloadReducer1<Arg1, P>): ActionCreator1<Arg1, P>
export function createAction<Arg1, Arg2, P>(type: string, payloadReducer: PayloadReducer2<Arg1, Arg2, P>): ActionCreator2<Arg1, Arg2, P>
export function createAction<Arg1, Arg2, Arg3, P>(type: string, payloadReducer: PayloadReducer3<Arg1, Arg2, Arg3, P>): ActionCreator3<Arg1, Arg2, Arg3, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, P>(type: string, payloadReducer: PayloadReducer4<Arg1, Arg2, Arg3, Arg4, P>): ActionCreator4<Arg1, Arg2, Arg3, Arg4, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, P>(type: string, payloadReducer: PayloadReducer5<Arg1, Arg2, Arg3, Arg4, Arg5, P>): ActionCreator5<Arg1, Arg2, Arg3, Arg4, Arg5, P>
export function createAction<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(type: string, payloadReducer: PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>): ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>

export function createReducer<TState>(initialState: TState): Reducer<TState>
