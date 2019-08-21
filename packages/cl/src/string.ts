export const repeat = (str: string, count: number) =>
    (new Array(count + 1)).join(str)

export const pad = (str: string, maxLength: number) =>
    repeat("0", maxLength - str.length) + str
