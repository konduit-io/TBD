import { useRef } from "react"

/**
 *
 */
export function useShouldUpdate(deps: unknown[] = [])
{
    const ref = useRef<unknown[]>()

    if (!ref.current) {
        ref.current = deps
        return true
    }

    if (deps) {
        if (deps.length != ref.current.length) {
            ref.current = deps
            return true
        }

        for (let i = 0; i < deps.length; i++) {
            if (deps[i] !== ref.current[i]) {
                ref.current = deps
                return true
            }
        }
    }

    return false
}
