'use client'
import { Button } from 'react-aria-components'
import { useGame } from '../hooks/useGame'
import { css } from '../../styled-system/css'

export default function Home() {
  const { runPoints, legacyPoints, click, convertEndOfRun } = useGame()

  return (
    <main className={css({ p: 24, display:'grid', gap: 24 })}>
      <h1 className={css({ fontSize:'2xl', fontWeight:'bold' })}>RogueClick 90s — Base</h1>

      <section className={css({ display:'flex', gap: 16, flexWrap:'wrap' })}>
        <div className={css({ bg:'card', p: 16, rounded:'xl' })}>
          📼 Points de run : <strong>{runPoints}</strong>
        </div>
        <div className={css({ bg:'card', p: 16, rounded:'xl' })}>
          🎟️ Points permanents : <strong>{legacyPoints}</strong>
        </div>
      </section>

      <Button
        onPress={click}
        className={css({
          px: 24, py: 16, rounded:'xl', border:'1px solid', bg:'card',
          _focusVisible:{ outline:'2px solid token(colors.neon)' }
        })}
        aria-label="Cliquer pour gagner des points"
      >
        Rembobiner (cliquer)
      </Button>

      <Button
        onPress={() => convertEndOfRun(0.1)}
        className={css({ mt: 8, px: 16, py: 12, rounded:'xl', border:'1px solid', bg:'card' })}
      >
        Terminer la run → convertir 10%
      </Button>
    </main>
  )
}
