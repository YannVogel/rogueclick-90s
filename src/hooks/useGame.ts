'use client'
import { create } from 'zustand'

type GameState = {
  runPoints: number       // monnaie temporaire (pendant la run)
  legacyPoints: number    // monnaie permanente (entre les runs)
  click: () => void
  convertEndOfRun: (ratio: number) => void
  resetRun: () => void
}

export const useGame = create<GameState>((set, get) => ({
  runPoints: 0,
  legacyPoints: 0,
  click: () => set(s => ({ runPoints: s.runPoints + 1 })),
  convertEndOfRun: (ratio) => {
    const gained = Math.floor(get().runPoints * ratio)
    set(s => ({ legacyPoints: s.legacyPoints + gained, runPoints: 0 }))
  },
  resetRun: () => set({ runPoints: 0 })
}))
