import { AnyAction, InternalSlice, Reducer } from "../index"

type SliceType<TState> = Slice<TState>
export { SliceType as Slice }

class Slice<TState> {
    private readonly reducer: Reducer<TState>

    private state: TState

    private oldState: TState

    private newState: TState

    private subscribers: Array<(state: any) => unknown> = []

    constructor(reducer: Reducer<TState>) {
        // @ts-ignore
        this.state = reducer(undefined, { type: "@reducer/init" })

        this.oldState = this.state
        this.newState = this.state

        this.reducer = reducer
    }

    updateState(action: AnyAction) {
        this.oldState = this.state
        this.newState = this.reducer(this.state, action)

        if (this.oldState !== this.newState) {
            this.update()
        }
    }

    update() {
        if (this.oldState !== this.newState) {
            this.state = this.newState
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
            (subscriber) => subscriber(this.resolve()),
        )
    }

    subscribe(subscriber: (state: TState) => unknown) {
        return this.subscribers.push(subscriber)
    }

    unsubscribe(subscriber: (state: TState) => unknown) {
        const idx = this.subscribers.indexOf(subscriber)

        this.subscribers.splice(idx, 1)
    }

    // @ts-ignore
    injectState(newState = this.reducer(undefined, { type: "@reducer/init" })) {
        if (this.state !== newState) {
            this.state = newState
            this.update()
        }
    }
}

// eslint-disable-next-line max-len
export const createSlice = <TState>(reducer: Reducer<TState>) => new Slice(reducer) as unknown as InternalSlice<TState>
