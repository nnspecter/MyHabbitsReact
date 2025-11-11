import { create } from 'zustand'

interface ScrollStore {
  scrollLeft: number
  setScrollLeft: (value: number) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollLeft: 0,
  setScrollLeft: (value) => set({ scrollLeft: value }),
}))