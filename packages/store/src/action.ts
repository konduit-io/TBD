import { ActionCreator6, PayloadReducer6, Reducer } from "../index"

/**
 * TODO: Description
 *
 * @param {string} type
 */
const addAction = (() => {
    const actions = new Set<string>()

    return (type: string) => {
        if (actions.has(type)) {
            throw new Error(`Duplicate action '${type}'`)
        }

        actions.add(type)
    }
})()

/**
 * TODO: Description
 *
 * @param {string} type
 */
const validateAction = (type: string) => {
    const validName = /^[a-zA-Z0-9_/]+$/

    if (!validName.test(type)) {
        throw new Error(`Action '${type}' must only contain alphanumeric characters and _ or /`)
    }
}

/**
 * TODO: Description
 *
 * @param {string}          type
 * @param {PayloadReducer6} payloadReducer
 */
export const createAction = <Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>(
    type: string,
    payloadReducer: PayloadReducer6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P>,
): ActionCreator6<Arg1, Arg2, Arg3, Arg4, Arg5, Arg6, P> => {
    validateAction(type)
    addAction(type)

    // eslint-disable-next-line max-len
    const actionCreator = (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5, arg6: Arg6) => {
        const data = payloadReducer
            ? payloadReducer(arg1, arg2, arg3, arg4, arg5, arg6)
            : {} as P

        return {
            type,
            data,
            reducers: actionCreator.reducers,
        }
    }

    actionCreator.assign = (reducer: Reducer<any>) => {
        if (actionCreator.reducers.indexOf(reducer) !== -1) {
            throw new Error(`Action '${type}' cannot be assigned to the same reducer more than once`)
        }

        actionCreator.reducers.push(reducer)
    }

    actionCreator.reducers = [] as Array<Reducer<any>>
    actionCreator.toString = () => type

    return actionCreator
}
