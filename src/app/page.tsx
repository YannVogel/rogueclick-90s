'use client'
import { Button } from 'react-aria-components'
import { useGame } from '@/hooks/useGame'
import { useRunTimer } from '@/hooks/useRunTimer'
import { css } from '../../styled-system/css'

export default function Home() {
  const { startRun, attack, timeLeft, runPoints, legacyPoints, currentEnemy, isRunning } = useGame()

  useRunTimer()

  if (!isRunning) {
    return (
      <main className={css({ p: 24, display: 'grid', gap: 24 })}>
        <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>RogueClick 90s</h1>
        <p>🎟 Legacy Points: {legacyPoints}</p>
        <Button
          onPress={startRun}
          className={css({ px: 24, py: 16, rounded: 'xl', border: '1px solid', bg: 'card' })}
        >
          ▶️ Start Run
        </Button>
      </main>
    )
  }

  return (
    <main className={css({ p: 24, display: 'grid', gap: 24 })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>RogueClick 90s</h1>
      <p>⏱ Temps restant: {timeLeft}s</p>
      <p>📼 Run Points: {runPoints}</p>
      <p>🎟 Legacy Points: {legacyPoints}</p>

      {currentEnemy && (
        <div className={css({ bg: 'card', p: 16, rounded: 'xl', textAlign: 'center' })}>
          <h2>{currentEnemy.name}</h2>
          <p>
            ❤️ {currentEnemy.hp}/{currentEnemy.maxHp} PV
          </p>
          <Button
            onPress={attack}
            className={css({
              px: 24,
              py: 16,
              rounded: 'xl',
              border: '1px solid',
              bg: 'card',
              _active: { transform: 'scale(0.95)', opacity: 0.7 },
              mt: 4,
            })}
          >
            👊 Attack
          </Button>
        </div>
      )}
    </main>
  )
}
