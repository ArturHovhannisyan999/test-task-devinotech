import React from "react";
import "./index.css";

export const NavBar = ({children}: {children: React.ReactNode}) => {
    return (
        <nav className="nav">{children}</nav>
    )
}