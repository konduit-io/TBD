import { AnyAction, Dispatch, InternalStore } from "../index"
import { unstack } from "./unstack"

export const createDispatch = (store: InternalStore): Dispatch => unstack(
    (action: AnyAction) => {
        if (store.isDispatching) {
            throw new Error("Reducers may not dispatch actions")
        }

        if (action.reducers.length === 0) {
            throw new Error(`Action '${action.type}' has no assigned reducers.` )
        }

        const slices = action.reducers.map(store.wrapReducer)

        try {
            // eslint-disable-next-line no-param-reassign
            store.isDispatching = true
            slices.forEach((slice) => slice.updateState(action))
        }
        finally {
            // eslint-disable-next-line no-param-reassign
            store.isDispatching = false
        }

        slices.forEach((slice) => slice.notify())
    },
)
