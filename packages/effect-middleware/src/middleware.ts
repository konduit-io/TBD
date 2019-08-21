import { AnyAction, Dispatch, InternalStore } from "@nulliel/store"

import { effects } from "./effect"

export const getDispatch = (store: InternalStore): Dispatch =>
    (action: AnyAction) => {
        if (effects.hasEffect(action.type)) {
            // TODO: Test
            if (action.reducers.length !== 0) {
                throw new Error(`Action '${action.type}' may not be bound to both an effect and a reducer`)
            }

            return effects.runEffect(action)
        }

        return store.dispatch(action)
    }
