import { createAction } from "./action"
import { Reducer } from "../index"

test("Actions must contain a valid name", () => {
    expect(() => {
        createAction("aA0_/@", () => {})
    }).toBeTruthy()

    expect(() => {
        createAction("a^", () => {})
    }).toThrow("Action 'a^' must only contain alphanumeric characters and _ or /")
})

test("Multiple actions cannot be created with the same name", () => {
    createAction("test", () => {})

    expect(() => {
        createAction("test", () => {})
    }).toThrow("Duplicate action 'test'")
})

test("An action cannot be assigned to the same reducer twice", () => {
    const action      = createAction("shouldNotAllowMultipleAssignments", () => {})
    const reducerMock = (() => {}) as unknown as Reducer<any>

    action.assign(reducerMock)

    expect(() => {
        action.assign(reducerMock)
    }).toThrow("Action 'shouldNotAllowMultipleAssignments' cannot be assigned to the same reducer more than once")
})
