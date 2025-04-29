"use client";
import { useEffect, useState } from 'react';
import useProfileStore from '@/stores/profileStore';
import CreatePinModal from './CreatePinModal';

export default function PinCheck() {
    const { profile, loading } = useProfileStore();
    const [showPinModal, setShowPinModal] = useState(false);

    
    useEffect(() => {
        if (!loading && profile && profile.have_pin === false) {
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