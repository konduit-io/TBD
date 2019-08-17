
export const repeat = (str, times) => (new Array(times + 1)).join(str);

export const pad = (num, maxLength) => repeat('0', maxLength - num.toString().length) + num;

export const formatTime = time => `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;

export const timer =
    (typeof performance !== "undefined" && performance !== null) && typeof performance.now === "function" ?
        performance :
        Date

function getLogLevel(level, action, payload, type) {
    switch (typeof level) {
        case 'object':
            return typeof level[type] === 'function' ? level[type](...payload) : level[type];
        case 'function':
            return level(action);
        default:
            return level;
    }
}

function defaultTitleFormatter(action, time, took) {
    const parts = ['action'];

    parts.push(`%c${String(action.type)}`);
    parts.push(`%c@ ${time}`);
    parts.push(`%c(in ${took.toFixed(2)} ms)`);

    return parts.join(' ');
}

const colors = {
    title: () => 'inherit',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
}
export function printBuffer(buffer) {
    buffer.forEach((logEntry, key) => {
        const { started, startedTime, action, prevState, error } = logEntry
        let { took, nextState } = logEntry
        const nextEntry = buffer[key + 1]

        if (nextEntry) {
            nextState = nextEntry.prevState
            took = nextEntry.started - started
        }


        const logger = console
        const level = "log"

        // Message
        const isCollapsed = false

        const formattedTime = formatTime(startedTime)
        const titleCSS = colors.title ? `color: ${colors.title()};` : '';
        const headerCSS = ['color: gray; font-weight: lighter;'];
        headerCSS.push(titleCSS);
        headerCSS.push('color: gray; font-weight: lighter;');
        headerCSS.push('color: gray; font-weight: lighter;');
        const title = defaultTitleFormatter(action, formattedTime, took);

        // Render
        try {
            if (isCollapsed) {
                if (colors.title) {
                    logger.groupCollapsed(`%c ${title}`, ...headerCSS);
                } else logger.groupCollapsed(title);
            } else if (colors.title) {
                logger.group(`%c ${title}`, ...headerCSS);
            } else {
                logger.group(title);
            }
        } catch (e) {
            logger.log(title);
        }

        const prevStateLevel = getLogLevel(level, action, [prevState], 'prevState');
        const actionLevel = getLogLevel(level, action, [action], 'action');
        const errorLevel = getLogLevel(level, action, [error, prevState], 'error');
        const nextStateLevel = getLogLevel(level, action, [nextState], 'nextState');

        if (prevStateLevel) {
            if (colors.prevState) {
                const styles = `color: ${colors.prevState()}; font-weight: bold`;

                logger[prevStateLevel]('%c prev state', styles, prevState);
            } else logger[prevStateLevel]('prev state', prevState);
        }

        if (actionLevel) {
            if (colors.action) {
                const styles = `color: ${colors.action()}; font-weight: bold`;

                logger[actionLevel]('%c action    ', styles, action);
            } else logger[actionLevel]('action    ', action);
        }

        if (error && errorLevel) {
            if (colors.error) {
                const styles = `color: ${colors.error()}; font-weight: bold;`;

                logger[errorLevel]('%c error     ', styles, error);
            } else logger[errorLevel]('error     ', error);
        }

        if (nextStateLevel) {
            if (colors.nextState) {
                const styles = `color: ${colors.nextState()}; font-weight: bold`;

                logger[nextStateLevel]('%c next state', styles, nextState);
            } else logger[nextStateLevel]('next state', nextState);
        }

        if (logger.withTrace) {
            logger.groupCollapsed('TRACE');
            logger.trace();
            logger.groupEnd();
        }

        try {
            logger.groupEnd();
        } catch (e) {
            logger.log('—— log end ——');
        }
    });
}
