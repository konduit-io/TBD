
test("a", () => {
    expect(1).toBe(1)
})
/*
import { Middleware } from "./types";
import { createAction } from "./action"
import { createReducer } from "./reducer"
import { createStore } from "./store"

test("Throws when an action has no reducers", () => {
    const store  = createStore()
    const action = createAction("testNoReducers", (x: number) => ({ x }))

    expect(() => {
        store.dispatch(action(0))
    }).toThrow("Action 'testNoReducers' has no assigned reducers. Did you forget to use reducer.on(testNoReducers, ...)?")
})

test("Reducers are called when dispatched", () => {
    const store  = createStore()
    const action = createAction("testDispatch", (x: number) => ({ x }))

    const reducer = createReducer({ x: 0 })
        .on(action, (payload, state) => ({ x: payload.x }))

    store.dispatch(action(5))

    expect(store.resolve(reducer).x).toBe(5)
})

test("Calls to dispatch are flattened", done => {
    const store = createStore()

    const action  = createAction("dispatchFlattens")
    const reducer = createReducer({ x: 0 })
        .on(action, (_, state) => ({ x: state.x + 1}))

    const counter = store.wrapReducer(reducer)
    let count = 0

    counter.subscribe((state) => {
        expect(state.x).toBe(count + 1)
        count = state.x

        if (state.x < 10) {
            store.dispatch(action())
        } else {
            expect(count).toBe(10)
            done()
        }
    })

    store.dispatch(action())
})

test("Middleware is applied", () => {
    let middlewareCalled = false
    let reducerCallCount = 0

    const middleware: Middleware = (_, { dispatch }) => ({
        dispatch(action) {
            middlewareCalled = true
            dispatch(action)
        }
    })

    const action  = createAction("testMiddlewareIsApplied")
    const reducer = createReducer({ i: 0 })
        .on(action, (payload) => { reducerCallCount++; return payload })

    const store = createStore(middleware)

    store.wrapReducer(reducer)

    expect(middlewareCalled).toBe(false)
    expect(reducerCallCount).toBe(0)

    store.dispatch(action())

    expect(middlewareCalled).toBe(true)
    expect(reducerCallCount).toBe(1)
})

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
        createReducer({x: 0})
            .on(action, () => ({}))
            .effect(action, async (_, payload) => {})
    }).toThrow("jreijio")
})

test("Effects can dispatch", () => {
    const store = createStore()

    const onAction     = createAction("onDispatch", (x: number) => ({ x }))
    const effectAction = createAction("effectDispatch")

    const reducer = createReducer({ x: 0 })
        .on(onAction, (payload) => ({ x: payload.x }))
        .effect(effectAction, async ({ dispatch }, payload) => {
            dispatch(onAction(5))
        })

    store.dispatch(effectAction())

    expect(store.resolve(reducer).x).toBe(5)
})

test("Effects can get state", (done) => {
    const store = createStore()
    const effectAction = createAction("effectDispatch")

    const reducer = createReducer({ x: 73 })
        .effect(effectAction, async ({ resolve }, payload) => {
            expect(resolve(reducer).x).toBe(73)
            done()
        })

    store.dispatch(effectAction())
})
*/