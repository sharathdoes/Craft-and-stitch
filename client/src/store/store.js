import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Initial state
      setUser: (user) => set({ user }), // Function to update the user state
      clearUser: () => set({ user: null }), // Function to clear user state (e.g., on logout)
    }),
    {
      name: 'auth-storage', // Key for localStorage
      getStorage: () => localStorage, // Specify storage type
    }
  )
);

const useCompanyStore = create(
    persist(
      (set) => ({
        company: null, // Initial state
        setCompany: (company) => set({ company }), // Function to update company state
        clearCompany: () => set({ company: null }), // Function to clear company state (e.g., on logout)
      }),
      {
        name: 'company-storage', // Key for localStorage
        getStorage: () => localStorage, // Specify storage type
      }
    )
  );
  
  export { useAuthStore, useCompanyStore };
