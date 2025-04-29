"use client"
import { useEffect } from "react";
import Image from "next/image";
import useProfileStore from "@/stores/profileStore";
import Link from "next/link";

export default function WelcomeSection() {
    const { profile, loading, error, fetchProfile } = useProfileStore();
    const firstName = profile.full_name?.split(" ")[0] || "";

    useEffect(() => {
        fetchProfile();
    }, []);
    if (loading) {
        return <WelcomeSectionSkeleton />;
    }

    if (error) {
        return <div className="alert alert-error shadow-lg">{error}</div>;
    }

    return (
        <div className="bg-base-100 pt-20">
            <div className="">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    {/* Welcome Message Section */}
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Assalamu'alaikum, {firstName}
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Check all your incoming and outgoing transactions
                            here
                        </p>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <h2 className="font-bold">{profile.full_name}</h2>
                            <Link href={"/user/profile"}  className="btn btn-link btn-sm text-primary p-0 hover:no-underline">
                                Edit Profile
                            </Link>
                        </div>
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2">
                                <Image
                                    src={
                                        profile.image_url ||
                                        "/placeholder-avatar.png"
                                    }
                                    alt="Profile"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WelcomeSectionSkeleton() {
    return (
        <div className="card bg-base-100 shadow-lg animate-pulse">
            <div className="card-body p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="w-full sm:w-2/3">
                        <div className="h-8 bg-base-300 rounded w-48 mb-4"></div>
                        <div className="h-4 bg-base-300 rounded w-full"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-base-300 rounded w-24"></div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-base-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
