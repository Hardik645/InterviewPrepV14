"use client";
import React from "react"
import { NavProvider } from "./NavContext"

function ContextProvider({children}:{children:React.ReactNode}) {
  return (
    <NavProvider>
        {children}
    </NavProvider>
  )
}

export default ContextProvider