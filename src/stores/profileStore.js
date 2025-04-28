import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { fetchProfile } from '@/app/api'

const initialState = {
    profile: {
        full_name: "",
        email: "",
        mobile_phone: "",
        image_url: null,
        have_pin: false
    },
    loading: false,
    error: null
}

const useProfileStore = create(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                fetchProfile: async () => {
                    try {
                        set({ loading: true, error: null })
                        const response = await fetchProfile()
                        
                        if (!response?.data?.users) {
                            throw new Error('Invalid profile data')
                        }

                        set({ 
                            profile: response.data.users, 
                            loading: false 
                        })
                    } catch (error) {
                        console.error("Error loading profile:", error)
                        set({
                            ...initialState,
                            error: "Failed to load profile",
                            loading: false
                        })
                    }
                },

                updateProfile: (newProfile) => {
                    if (!newProfile) return
                    set({ profile: { ...get().profile, ...newProfile } })
                },

                resetProfile: () => set(initialState)
            }),
            {
                name: 'profile-storage',
                partialize: (state) => ({ profile: state.profile }),
                merge: (persistedState, currentState) => ({
                    ...currentState,
                    ...persistedState,
                    loading: false,
                    error: null
                })
            }
        )
    )
)

export default useProfileStore