"use client";
import React, { createContext, useContext, useState } from "react";

type ModalState = {
	isOpen: boolean;
	type: "login" | "register" | "forgotPassword";
};

const NavContext = createContext<{
  authModalState: ModalState;
  setAuthModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}>({
  authModalState: {
    isOpen: false,
    type: "login",
  },
  setAuthModalState: () => {}
});

export const NavProvider = ({children}:{children:React.ReactNode}) => {
  const [authModalState,setAuthModalState]= useState<ModalState>({
    isOpen: false,
    type: "login",
  });
  return (
    <NavContext.Provider value={{authModalState,setAuthModalState}}>
        {children}
    </NavContext.Provider>
  )
}
export function useNavContext(){
  return useContext(NavContext)
}
export default NavContext