# `@nulliel/cl`

## Features

* Useful development middleware  
  * Redux DevTools integration
  * Redux logger integration
  * State freezing

## Installation

`npm install --save @nulliel/middleware`

## Usage

```
import { createStore } from "@nulliel/store"
import { devTools } from "@nulliel/middleware"

const store = createStore(devTools)
```


