import { useContext } from "react"

//==============
// Local Imports
//==============
import { StateContext } from "./stateContext"

/**
 *
 */
export function useDispatch()
{
    return useContext(StateContext).dispatch
}
