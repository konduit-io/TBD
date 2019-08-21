import { createAction, createReducer, createStore } from "@nulliel/store"
import { effectMiddleware } from "./index"

test("Effects run", (done) => {
    const store  = createStore()
    const action = createAction("testEffect", (x: number) => ({ x }))

    createReducer({ x: 0 })
        .effect(action, async (_, payload) => {
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
            .effect(action, async () => {})
    }).toThrow("jreijio")
})

test("Effects can dispatch", () => {
    const store = createStore()

    const onAction     = createAction("onDispatch", (x: number) => ({ x }))
    const effectAction = createAction("effectDispatch")

    const reducer = createReducer({ x: 0 })
        .on(onAction, (payload) => ({ x: payload.x }))
        .effect(effectAction, async ({ dispatch }) => {
            dispatch(onAction(5))
        })

    store.dispatch(effectAction())

    expect(store.resolve(reducer).x).toBe(5)
})

test("Effects can get state", (done) => {
    const store = createStore(effectMiddleware)
    const effectAction = createAction("effectState")

    const reducer = createReducer({ x: 73 })

    store.resolve(reducer)

    reducer.effect(effectAction, async ({ resolve }) => {
        expect(resolve(reducer).x).toBe(73)
        done()
    })

    store.dispatch(effectAction())
})
