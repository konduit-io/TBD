An opinionated and type safe implementation of redux



## Description

`redux-ts` uses the same action -> dispatch -> reducer model popularized by
redux.

## Installation

`redux-ts` currently relies on `react >= 16.8` for hooks support. 

`npm install --save redux-ts react@latest`


###

* Actions
* Reducers
* Assigning Actions to Reducers

## ...

### Actions

An action is a data object used to send data to the store. 
In its simplest form, an action has the following shape:

```typescript
const action = {
    type: "SET_NAME",
    data: {
        name: "Michael"
    }
}
```

In `@nulliel/store` actions are created through the use of **action creators**.
An action creator is a function that returns an action.

Action creators are created through the `createAction` function. 
It is important to use this function instead of creating your own as it stores
important internal metadata about the action and reducers it is bound to. 

```typescript
import { createAction } from "@nulliel/store"

const action = createAction("setName", (name: string) => ({ name }))
```

The second argument to `createAction` is a function that takes up to 6 parameters and must return
an object containing the action **data**.

See the [redux documentation](https://redux.js.org/basics/actions) for an alternate explanation 

#### Notes

* Action names must be unique across a project. Duplicate action names will throw an exception.
* Action names must match the following pattern `/^[a-zA-Z0-9_/]+$/`

### Reducers

## API

`redux-ts` is intended for use with react using hooks. To initialize the store, use
a `StateProvider`.

#### StateProvider

The `StateProvider` component creates the store automatically under the hood. 
This component allows for us to interact with the store through react's hooks system.

```jsx
export default RootComponent = () => (
    <StateProvider>
        // children
    </StateProvider>
)
```

Middleware can be passed to the store through the `middleware` prop.

```jsx
export default RootComponent = () => (
    <StateProvider middleware={[devTool, logger]}>
        // children
    </StateProvider>
)
```

#### createAction(name: string, payloadReducer: (...args) => any)

Creates an action creator. This will be used to bind actions to reducers.  
This returns an action creator similar to the form of `payloadReducer` but 
returning an `Action` instead of `any`

```
interface Action<P> {
    type: string; // createAction name argument
    payload: P;   // createAction payloadReducer return type
```


## TODO
- [ ] Rename library
- [ ] Split into multiple libraries using lerna (redux-ts, redux-ts-hooks, redux-ts-devtools)

## License

redux-ts is [MIT Licensed](https://github.com/nulliel/redux-ts/blob/master/LICENSE).