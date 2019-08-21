
//======
// Hooks
//======
export interface ProviderProps {
    children:    ReactChild
    middleware?: Middleware[]
}

export function StateProvider({ children, middleware }: ProviderProps): ReactElement

export function useSlice<T>(reducer: Reducer<T>): T
export function useDispatch(): Dispatch
