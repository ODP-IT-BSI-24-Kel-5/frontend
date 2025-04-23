import Image from "next/image";

export default function WelcomeSection({ name, profileImage }) {
    return (
        <div className="flex justify-between items-center py-6 pt-16">
            <div>
                <h1 className="text-3xl font-bold mb-1">Welcome, {name}</h1>
                <p className="text-gray-600">
                    Check all your incoming and outgoing transactions here
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-right font-bold">{name} Abdillah</h2>
                    <button className="text-xs text-green-500 text-right block ml-auto">
                        Edit Profile
                    </button>
                </div>
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-green-500 ring-offset-2">
                        <Image
                            src={profileImage || "/placeholder-avatar.jpg"}
                            alt="Profile"
                            width={48}
                            height={48}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
