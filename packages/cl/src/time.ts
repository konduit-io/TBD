
// eslint-disable-next-line compat/compat
export const timer = (typeof performance !== "undefined" && performance !== null) && typeof performance.now === "function"
    ? performance
    : Date
