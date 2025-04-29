"use client";
import { useEffect, useState } from "react";
import useProfileStore from "@/stores/profileStore";
import CreatePinModal from "./CreatePinModal";
import useAuthStore from "@/stores/authStore";

export default function PinCheck() {
    const { profile, loading } = useProfileStore();
    const [showPinModal, setShowPinModal] = useState(false);

    useEffect(() => {
        const token = useAuthStore.getState().getToken();
        if (token && !loading && profile && !profile.have_pin == true) {
            setShowPinModal(true);
        } else {
            setShowPinModal(false);
        }
    }, [profile.have_pin, loading]);

    return (
        <CreatePinModal
            isOpen={showPinModal}
            onClose={() => setShowPinModal(false)}
        />
    );
}
