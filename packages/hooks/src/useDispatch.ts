import { useContext } from "react"

//==============
// Local Imports
//==============
import { StateContext } from "./StateContext"

export const useDispatch = () => useContext(StateContext).dispatch
