import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 fixed py-5 px-5 z-10">
            <Link href="/" className="flex-1">
                <div className="px-4">
                    <Image src="/Logo.png" alt="Logo" width={120} height={20} />
                </div>
            </Link>
            <div className="flex items-center">
                <ul className="text-lg menu menu-horizontal p-0">
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/transactions/transfer">Transfer</Link>
                    </li>
                    <li>
                        <Link href="/transactions/topup">Topup</Link>
                    </li>
                    <li>
                        <Link href="/transactions/payment">Payment</Link>
                    </li>
                    <li>
                        <Link href="/signout" className="text-error">
                            Sign Out
                        </Link>
                    </li>
                </ul>
                <div className="divider divider-primary divider-horizontal py-2"></div>
                <ThemeToggle></ThemeToggle>
            </div>
        </div>
    );
}
