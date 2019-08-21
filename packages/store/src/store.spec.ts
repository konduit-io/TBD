import { createStore } from "./store"
import { createAction } from "./action"
import { createReducer } from "./reducer"

const store  = createStore()

test("Only one store may be created", () => {
    expect(() => createStore())
        .toThrow("Only one store may be created")

})

test("Throws when an action has no reducers", () => {
    const action = createAction("testNoReducers", (x: number) => ({ x }))

    expect(() => {
        store.dispatch(action(0))
    }).toThrow("Action 'testNoReducers' has no assigned reducers")
})

test("Reducers are called when dispatched", () => {
    const action = createAction("testDispatch", (x: number) => ({ x }))

    const reducer = createReducer({ x: 0 })
        .on(action, (payload) => ({ x: payload.x }))

    store.dispatch(action(5))

    expect(store.resolve(reducer).x).toBe(5)
})

test("Calls to dispatch are flattened", (done) => {
    const action  = createAction("dispatchFlattens")
    const reducer = createReducer({ x: 0 })
        .on(action, (_, state) => ({ x: state.x + 1 }))

    const counter = store.wrapReducer(reducer)
    let count = 0

    counter.subscribe((state) => {
        expect(state.x).toBe(count + 1)
        count = state.x

        if (state.x < 10) {
            store.dispatch(action())
        }
        else {
            expect(count).toBe(10)
            done()
        }
    })

    store.dispatch(action())
})
