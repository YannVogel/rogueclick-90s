'use client'
import { create } from 'zustand'

type Enemy = {
  id: number
  name: string
  hp: number
  maxHp: number
  reward: number // points gagnés quand il est battu
}

type PlayerStats = {
  damage: number // dégâts par clic
  cps: number // clicks per second (limite de vitesse d’attaque)
  lastAttack: number // timestamp du dernier clic
}

type GameState = {
  timeLeft: number
  runPoints: number
  legacyPoints: number
  currentEnemy: Enemy | null
  player: PlayerStats
  isRunning: boolean

  // actions
  startRun: () => void
  tick: () => void
  attack: () => void
  endRun: () => void
}

const enemies: Enemy[] = [
  { id: 1, name: 'Slime VHS 👾', hp: 5, maxHp: 5, reward: 1 },
  { id: 2, name: 'Rat mutant 🐀', hp: 10, maxHp: 10, reward: 2 },
  { id: 3, name: 'Fantôme VHS 👻', hp: 15, maxHp: 15, reward: 3 },
]

function getRandomEnemy(): Enemy {
  const e = enemies[Math.floor(Math.random() * enemies.length)]
  // copie fraîche pour pas muter l’original
  return { ...e }
}

export const useGame = create<GameState>((set, get) => ({
  timeLeft: 60,
  runPoints: 0,
  legacyPoints: 0,
  currentEnemy: null,
  player: { damage: 1, cps: 1, lastAttack: 0 },
  isRunning: false,

  startRun: () => {
    set({
      timeLeft: 60,
      runPoints: 0,
      currentEnemy: getRandomEnemy(),
      isRunning: true,
    })
  },

  tick: () => {
    const { timeLeft, isRunning } = get()
    if (!isRunning) return
    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 })
    } else {
      get().endRun()
    }
  },

  attack: () => {
    const { currentEnemy, player, runPoints } = get()
    if (!currentEnemy) return

    const now = Date.now()
    if (now - player.lastAttack < 1000 / player.cps) {
      return // trop rapide, CPS limité
    }

    const newHp = currentEnemy.hp - player.damage
    if (newHp > 0) {
      set({
        currentEnemy: { ...currentEnemy, hp: newHp },
        player: { ...player, lastAttack: now },
      })
    } else {
      // ennemi vaincu
      set({
        runPoints: runPoints + currentEnemy.reward,
        currentEnemy: getRandomEnemy(),
        player: { ...player, lastAttack: now },
      })
    }
  },

  endRun: () => {
    const { runPoints, legacyPoints } = get()
    // calcul des LegacyPoints → pour l’instant 1:1 avec les runPoints
    set({
      legacyPoints: legacyPoints + runPoints,
      isRunning: false,
      currentEnemy: null,
    })
  },
}))
