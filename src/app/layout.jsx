// app/layout.js (SERVER COMPONENT – do NOT use hooks like useEffect here)

import "./globals.css";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/theme-provider";
import { AutoLogoutWrapper } from "@/components/AutoLogoutWrapper";
import PinCheck from "./(auth)/_components/PinCheck";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const metadata = {
    title: "Byond Wallet",
    description: "Semua jadi lebih mudah!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <ThemeProvider>
                    <AutoLogoutWrapper>
                        <PinCheck />
                        {children}
                    </AutoLogoutWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
