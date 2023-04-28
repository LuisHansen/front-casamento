import React from "react";
import HamburgerDrawer from "react-hamburger-drawer";

export const CollapsibleMenu: React.FC = () => {
    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
    )
}