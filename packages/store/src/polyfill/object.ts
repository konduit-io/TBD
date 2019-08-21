/**
 * IE11 polyfill for `Object.assign'
 *
 * The reason we export a function instead of defining Object.assign in
 * the global scope is to allow for tree shaking via the package.json flag
 * `sideEffects: false'
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 *
 * @param target
 * @param rest
 */
export const assign = <T extends object, U>(target: T, ...rest: Partial<U>[]): T & U => {
    /* eslint-disable compat/compat */
    if (typeof Object.assign === "function") {
        return Object.assign(target, ...rest)
    }
    /* eslint-enable compat/compat */

    if (target === null || target === undefined) {
        throw new TypeError("Cannot convert null or undefined to object")
    }

    const to: any = Object(target)

    for (let index = 0; index < rest.length; index += 1) {
        const nextSource: any = rest[index]

        if (nextSource !== null && nextSource !== undefined) {
            // eslint-disable-next-line no-restricted-syntax
            for (const nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey]
                }
            }
        }
    }

    return to
}
