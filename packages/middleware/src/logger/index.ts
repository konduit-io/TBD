import { AnyAction, Middleware } from "@nulliel/store"

import { aggregateReducers } from "./stateTransformer"
import { printBuffer, timer } from "./utils"

/**
 * @param store
 * @param dispatch
 */
export const loggerMiddleware: Middleware = (store, { dispatch }) => {
    const logBuffer: any[] = []

    return {
        dispatch(action: AnyAction) {
            const logEntry: { [name: string]: any } = {}

            logBuffer.push(logEntry)

            logEntry.started = timer.now()
            logEntry.startedTime = new Date()
            logEntry.prevState = aggregateReducers(store, ...action.reducers)
            logEntry.action = action

            const returnedValue = dispatch(action)

            logEntry.took = timer.now() - logEntry.started
            logEntry.nextState = aggregateReducers(store, ...action.reducers)

            printBuffer(logBuffer)

            return returnedValue
        },
    }
}
