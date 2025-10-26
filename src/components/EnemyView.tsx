'use client'
import { css } from '../../styled-system/css'

export type EnemyViewProps = {
  name: string
  hp: number
  maxHp: number
  onHit: () => void
  imageSrc: string
  size?: number
}

export function EnemyView({ name, hp, maxHp, onHit, imageSrc, size = 260 }: EnemyViewProps) {
  const pct = Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)))

  return (
    <div className={css({ display: 'grid', gap: 12, justifyItems: 'center' })}>
      <div
        className={css({
          fontWeight: 'bold',
          fontSize: 'xl',
          textAlign: 'center',
        })}
      >
        {name}
      </div>

      {/* Barre de PV */}
      <div
        className={css({
          w: 'min(360px, 80vw)',
          bg: 'card',
          border: '1px solid',
          rounded: 'xl',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            h: '10px',
            bg: 'red.500',
            transition: 'width 120ms ease-out',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className={css({ fontSize: 'sm', opacity: 0.9 })}>
        ❤️ {hp}/{maxHp}
      </div>

      {/* Zone cliquable */}
      <div
        onClick={onHit}
        role="button"
        aria-label={`Attaquer ${name}`}
        className={css({
          w: `${size}px`,
          h: `${size}px`,
          display: 'grid',
          placeItems: 'center',
          rounded: 'full',
          border: '2px solid',
          borderColor: 'gray.700',
          bg: 'linear-gradient(to bottom, #222, #111)',
          boxShadow: 'lg',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'transform 80ms, opacity 80ms',
          _hover: { transform: 'scale(1.05)' },
          _active: { transform: 'scale(0.9)', opacity: 0.8 },
        })}
      >
        {imageSrc.startsWith('/') ? (
          <img
            src={imageSrc}
            alt={name}
            width={size * 0.7}
            height={size * 0.7}
            className={css({ pointerEvents: 'none' })}
          />
        ) : (
          <span className={css({ fontSize: '7xl' })}>{imageSrc}</span>
        )}
      </div>
    </div>
  )
}
