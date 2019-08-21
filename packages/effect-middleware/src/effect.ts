import { ActionCreator6, AnyAction, Store } from "@nulliel/store"

import { EffectResolver } from "../index"

export const effects = (() => {
    const internalEffects: Map<string, EffectResolver<any>> = new Map()

    let internalStore: Store = {} as Store

    return {
        createEffect<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
            actionCreator: ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
            handler: EffectResolver<P>,
        ) {
            const actionName = actionCreator.toString()

            if (internalEffects.has(actionName)) {
                throw new Error(`Duplicate effect ${actionName} registered`)
            }

            internalEffects.set(actionName, handler)
        },
        hasEffect(type: string) {
            return internalEffects.has(type)
        },
        runEffect(action: AnyAction) {
            const effect = internalEffects.get(action.type)!

            return effect(internalStore, action.data)
        },
        setStore(store: Store) {
            internalStore = store
        },
    }
})()
