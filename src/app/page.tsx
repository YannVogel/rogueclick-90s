'use client'
import { Button } from 'react-aria-components'
import { useGame } from '@/hooks/useGame'
import { useRunTimer } from '@/hooks/useRunTimer'
import { EnemyView } from '@/components/EnemyView'
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
    <main className={css({ p: 24, display: 'grid', gap: 24, justifyItems: 'center' })}>
      <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>RogueClick 90s</h1>

      <div className={css({ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' })}>
        <div>
          ⏱ Temps restant: <strong>{timeLeft}s</strong>
        </div>
        <div>
          📼 Run Points: <strong>{runPoints}</strong>
        </div>
        <div>
          🎟 Legacy Points: <strong>{legacyPoints}</strong>
        </div>
      </div>

      {currentEnemy && (
        <EnemyView
          name={currentEnemy.name}
          hp={currentEnemy.hp}
          maxHp={currentEnemy.maxHp}
          onHit={attack}
          imageSrc={currentEnemy.image}
          size={240}
        />
      )}
    </main>
  )
}
