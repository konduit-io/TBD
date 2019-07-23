import {createAction} from "./action";
import {createReducer} from "./reducer";

test("Multiple actions cannot be created with the same name", () => {
    createAction("test")

    expect(() => {
        createAction("test")
    }).toThrow("Duplicate action 'test'")
})

test("An action cannot be assigned to the same reducer twice", () => {
    const action = createAction("shouldNotAllowMultipleAssignments")

    expect(() => {
        const reducer = createReducer({})

        action.assign(reducer)
        action.assign(reducer)
    }).toThrow("Action cannot be assigned to the same reducer more than once")
})
