import { devToolsMiddleware } from "./devTools"
import { freezerMiddleware } from "./freezer"
import { loggerMiddleware } from "./logger"
import { compose } from "./utils"

export { devToolsMiddleware }
export { freezerMiddleware }
export { loggerMiddleware }

export const devMiddleware = compose(
    devToolsMiddleware,
    freezerMiddleware,
    loggerMiddleware,
)
