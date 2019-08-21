import React, { ReactChild } from "react"

//==============
// Local Imports
//==============
import { StateProvider } from "../StateProvider"

interface Props {
    children: ReactChild
}

//==========
// Component
//==========
export default ({ children }: Props) => (
    <StateProvider>
        {children}
    </StateProvider>
)
