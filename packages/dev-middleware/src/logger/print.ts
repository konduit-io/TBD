import { pad } from "@nulliel/cl"
import { AnyAction } from "@nulliel/store"

export interface LogEntry<T> {
    action: AnyAction

    prevState: T
    nextState: T

    started:     number
    startedTime: Date

    took: number

    error?: Error
}

const colors = {
    title:     "inherit",
    prevState: "#9E9E9E",
    action:    "#03A9F4",
    nextState: "#4CAF50",
    error:     "#F20404",
}

export const formatTime = (time: Date) =>
    `${pad(time.getHours().toString(), 2)}:`
    + `${pad(time.getMinutes().toString(), 2)}:`
    + `${pad(time.getSeconds().toString(), 2)}.`
    + `${pad(time.getMilliseconds().toString(), 3)}`

const printHeader = (log: LogEntry<unknown>, logger: Console) => {
    const formattedTime = formatTime(log.startedTime)
    const parts = ["action"];

    parts.push(`%c${String(log.action.type)}`);
    parts.push(`%c@ ${formattedTime}`);
    parts.push(`%c(in ${log.took.toFixed(2)} ms)`);

    const header    = parts.join(" ");
    const headerCSS = `color: ${colors.title}; font-weight: lighter`

    try {
        logger.group(`%c ${header}`, headerCSS)
    }
    catch (e) {
        logger.log(header)
    }
}

const printBody = (log: LogEntry<unknown>, logger: Console) => {

    logger.log("%c prev state", `color: ${colors.prevState}; font-weight: bold`, log.prevState)
    logger.log("%c action    ", `color: ${colors.action}; font-weight: bold`, log.action)

    if (log.error) {
        logger.log("%c error     ", `color: ${colors.error}; font-weight: bold;`, log.error)
    }

    logger.log("%c next state", `color: ${colors.nextState}; font-weight: bold`, log.nextState)
}

export const print = (log: LogEntry<unknown>) => {
    const logger = console

    printHeader(log, logger)
    printBody(log, logger)

    try {
        logger.groupEnd()
    }
    catch (e) {
        logger.log("—— log end ——")
    }
}
