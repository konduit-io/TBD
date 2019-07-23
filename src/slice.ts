type SliceType<TState> = Slice<TState>
export { SliceType as Slice }

class Slice<TState>
{
    private subscribers: Array<(state: any) => unknown> = []

    private state: TState
    private readonly stateEvaluator: () => TState

    constructor(stateEvaluator: () => TState, initialState?: TState)
    {
        this.state          = initialState as TState
        this.stateEvaluator = stateEvaluator
    }

    update() {
        const oldState = this.state
        const newState = this.stateEvaluator()

        if (oldState !== newState) {
            this.state = newState
            return true
        }

        return false
    }

    resolve() {
        this.update()
        return this.state
    }

    notify() {
        this.subscribers.slice().forEach(
            (subscriber) => subscriber(this.resolve())
        )
    }

    subscribe(subscriber: (state: TState) => unknown) {
        return this.subscribers.push(subscriber)
    }

    unsubscribe(subscriber: (state: TState) => unknown) {
        const idx = this.subscribers.indexOf(subscriber)

        this.subscribers.splice(idx, 1)
    }
}

export function createSlice<TState>(stateEvaluator: () => TState, initialState?: TState)
{
    return new Slice(stateEvaluator, initialState)
}

export function isSlice<T>(query: unknown): query is Slice<T> {
    return query && query instanceof Slice
}
