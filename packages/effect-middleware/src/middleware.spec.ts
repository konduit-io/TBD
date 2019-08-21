import { createAction, createReducer, createStore } from "@nulliel/store"
import { createEffect, effectMiddleware } from "./index"

const store  = createStore(effectMiddleware)

test("Effects run", (done) => {
    const action = createAction("effectsRun", (x: number) => ({ x }))

    createReducer({ x: 0 })

    createEffect(action, async (_, payload) => {
        expect(payload.x).toBe(5)
        done()
    })

    store.dispatch(action(5))
})

test("Effects cannot be defined alongside reducers", () => {
    const action = createAction("testEffect", (x: number) => ({ x }))

    expect(() => {
        createReducer({ x: 0 })
            .on(action, () => ({}))

        createEffect(action, async () => {})
    }).toThrow("Duplicate action testEffect registered")
})

test("Effects can dispatch", () => {
    const onAction     = createAction("onDispatch", (x: number) => ({ x }))
    const effectAction = createAction("effectDispatch")

    const reducer = createReducer({ x: 0 })
        .on(onAction, (payload) => ({ x: payload.x }))

    createEffect(effectAction, async ({ dispatch }) => {
        dispatch(onAction(5))
    })

    store.dispatch(effectAction())

    expect(store.resolve(reducer).x).toBe(5)
})

test("Effects can get state", (done) => {
    const effectAction = createAction("effectState")

    const reducer = createReducer({ x: 73 })

    store.resolve(reducer)

    createEffect(effectAction, async ({ resolve }) => {
        expect(resolve(reducer).x).toBe(73)
        done()
    })

    store.dispatch(effectAction())
})
