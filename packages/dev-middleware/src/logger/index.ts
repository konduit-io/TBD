import { AnyAction, Middleware } from "@nulliel/store"
import { timer } from "@nulliel/cl"

import { aggregateReducers } from "./stateTransformer"
import { LogEntry, print } from "./print"

export const loggerMiddleware: Middleware = (store, { dispatch }) => {
    return {
        dispatch(action: AnyAction) {
            const logEntry: LogEntry<unknown> = {
                started:     timer.now(),
                startedTime: new Date(),
                prevState:   aggregateReducers(store, ...action.reducers),
                action,
            } as LogEntry<unknown>

            let returnedValue: any

            try {
                returnedValue = dispatch(action)
            }
            catch (e) {
                logEntry.error = e
            }

            logEntry.took      = timer.now() - logEntry.started
            logEntry.nextState = aggregateReducers(store, ...action.reducers)

            print(logEntry)

            return returnedValue
        },
    }
}
