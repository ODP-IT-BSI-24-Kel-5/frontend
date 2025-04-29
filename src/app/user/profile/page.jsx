"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { fetchProfile, updateProfile } from "@/app/api";

export default function ProfilePage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [imageUrl, setImageUrl] = useState("/profile.png"); // Default image
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Fetch current user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await fetchProfile();

                setFullName(userData.full_name || "");
                setEmail(userData.email || "");
                setMobilePhone(userData.mobile_phone || "");
                setImageUrl(userData.image_url || "/profile.png");
                setIsFetching(false);
            } catch (error) {
                toast.error("Failed to load profile data");
                console.error("Profile fetch error:", error);
                setIsFetching(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                // 2MB limit
                toast.error("Image size should be less than 2MB");
                return;
            }
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        try {
            const formData = new FormData();
            formData.append("full_name", fullName);
            formData.append("email", email);
            formData.append("mobile_phone", mobilePhone);
            if (imageFile) {
                formData.append("image_url", imageFile);
            }

            updateProfile(formData)

            router.back()
            toast.success("Profile updated successfully!");
            router.refresh();
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                toast.error("Failed to update profile");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            <Toaster></Toaster>
            <Navbar />
            <div className="flex items-center min-h-screen py-10">
                <div className="w-full h-fit my-auto md:w-3/4 lg:w-1/3 p-6 md:p-10 flex flex-col justify-center bg-base-100 rounded-lg mx-auto">
                    <h1 className="text-2xl font-semibold mb-6 text-primary">
                        Edit Profile
                    </h1>

                    <form onSubmit={handleUpdateProfile}>
                        {/* Profile Image */}
                        <div className="mb-6 flex flex-col items-center">
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={imageUrl}
                                    alt="Profile"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>

                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-secondary">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className={`w-full border ${
                                    error.fullName
                                        ? "border-error"
                                        : "border-gray-300"
                                } text-base-content rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            {error.fullName && (
                                <p className="text-error text-sm mt-1">
                                    {error.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-secondary">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`w-full border ${
                                    error.email
                                        ? "border-error"
                                        : "border-gray-300"
                                } text-base-content rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {error.email && (
                                <p className="text-error text-sm mt-1">
                                    {error.email}
                                </p>
                            )}
                        </div>

                        {/* Mobile Phone */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-secondary">
                                Mobile Phone
                            </label>
                            <input
                                type="text"
                                className={`w-full border ${
                                    error.mobilePhone
                                        ? "border-error"
                                        : "border-gray-300"
                                } text-base-content rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                                value={mobilePhone}
                                onChange={(e) => setMobilePhone(e.target.value)}
                                required
                            />
                            {error.mobilePhone && (
                                <p className="text-error text-sm mt-1">
                                    {error.mobilePhone}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner mr-2"></span>
                                    Updating...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
