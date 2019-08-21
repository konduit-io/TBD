import { Middleware } from "../index"
import { createAction } from "./action"
import { createReducer } from "./reducer"
import { createStore } from "./store"

test("Middleware is applied", () => {
    let middlewareCalled = false
    let reducerCallCount = 0

    const middleware: Middleware = (_, { dispatch }) => ({
        dispatch(action) {
            middlewareCalled = true
            dispatch(action)
        },
    })

    const action  = createAction("testMiddlewareIsApplied")
    const reducer = createReducer({ i: 0 })
        .on(action, (payload) => {
            reducerCallCount += 1
            return payload
        })

    const store = createStore(middleware)

    store.wrapReducer(reducer)

    expect(middlewareCalled).toBe(false)
    expect(reducerCallCount).toBe(0)

    store.dispatch(action())

    expect(middlewareCalled).toBe(true)
    expect(reducerCallCount).toBe(1)
})