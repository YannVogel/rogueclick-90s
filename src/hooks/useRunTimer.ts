'use client'
import { useEffect } from 'react'
import { useGame } from './useGame'

export function useRunTimer() {
  const { tick, isRunning } = useGame()

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      tick()
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, tick])
}
