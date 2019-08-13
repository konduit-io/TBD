# redux-ts
An opinionated and type safe implementation of redux

## Description

`redux-ts` uses the same action -> dispatch -> reducer model popularized by
redux.

## Installation

`redux-ts` currently relies on `react >= 16.8` for hooks support. 

`npm install --save redux-ts react@latest`

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