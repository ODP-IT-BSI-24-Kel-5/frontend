import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'


const useAuthStore = create(
  persist(
    (set, get) => ({

      token: null,
      isAuthenticated: false,

      setToken: (token) => {
        if (token) {
          Cookies.set('token', token)
          set({ token, isAuthenticated: true })
        }
      },
      getToken: () => {
        return get().token || Cookies.get('token')
      },

      logout: () => {
        Cookies.remove('token')
        set({ token: null, isAuthenticated: false })
        redirect('/login')
      },

      checkAuthStatus: () => {
        const token = get().token || Cookies.get('token')

        if (!token) {
          set({ isAuthenticated: false })
          return false
        }

        try {
          // Parse the JWT token
          const payload = JSON.parse(atob(token.split('.')[1]))
          const isValid = payload.exp * 1000 > Date.now()

          if (!isValid) {
            get().logout()
            return false
          }

          // If we have a valid token but state doesn't reflect it
          if (!get().isAuthenticated) {
            set({ token, isAuthenticated: true })
          }

          return true
        } catch (error) {
          console.error('Token validation error:', error)
          get().logout()
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token })
    }
  )
)

export default useAuthStore