import { AnyAction, Dispatch, InternalStore } from "../index"

export function createDispatch(store: InternalStore): Dispatch {
    function dispatch(action: AnyAction) {
        if (store.isDispatching) {
            // error("Reducers may not dispatch actions");
        }

        if (action.reducers.length === 0) {
            // error("Action '${action.type}' has no assigned reducers.")
        }

        const slices = action.reducers.map(store.wrapReducer)

        try {
            store.isDispatching = true
            slices.forEach((slice) => slice.updateState(action))
        } finally {
            store.isDispatching = false
        }

        slices.forEach((slice) => slice.notify())
    }

    return dispatch // unstack(dispatch)
}
