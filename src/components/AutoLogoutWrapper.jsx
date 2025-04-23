"use client"; // This is important to indicate this component runs on the client side

import { useAutoLogout } from "@/hooks/useAutoLogout"; // your custom hook
import { ReactNode } from "react";

export function AutoLogoutWrapper({ children }) {
    useAutoLogout(); // This will check for token expiration on every page load

    return <>{children}</>; // Render the children normally
}
