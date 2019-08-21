export const unstack = <T>(fn: (t: T) => void) => {
    const queue = [] as T[]
    let running = false

    return (t: T) => {
        queue.unshift(t)

        if (!running) {
            running = true

            while (queue.length) {
                fn(queue.pop()!)
            }

            running = false
        }
    }
}
