'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const target = new Date(targetDate).getTime()

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!mounted) return (
    <div className="flex gap-8 md:gap-14">
      {['Days', 'Hours', 'Minutes', 'Seconds'].map(label => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="text-[clamp(36px,5vw,72px)] font-light text-white leading-none tracking-[-0.03em] tabular-nums">--</span>
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#3A3A3E]">{label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex gap-8 md:gap-14">
      {[
        { label: 'Days',    value: timeLeft.days },
        { label: 'Hours',   value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="text-[clamp(36px,5vw,72px)] font-light text-white leading-none tracking-[-0.03em] tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#3A3A3E]">{label}</span>
        </div>
      ))}
    </div>
  )
}
