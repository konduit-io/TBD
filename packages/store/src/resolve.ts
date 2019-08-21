import { InternalStore, Reducer, Resolve, Slice } from "../index"

export const createResolve = (store: InternalStore): Resolve =>
    <TState>(slice: Slice<TState> | Reducer<TState>) => {
        if (store.isDispatching) {
            throw new Error(
                "You may not call store.resolve() while the reducer is executing. " +
                "The reducer has already received the state as an argument. " +
                "Pass it down from the top reducer instead of reading it from the store"
            )
        }

        return (typeof slice === "function")
            ? store.wrapReducer(slice).resolve()
            : slice.resolve()
    }
