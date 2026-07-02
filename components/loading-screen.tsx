"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)

  // Generate random bounce heights on each mount using a time-based seed
  const bounceProfile = useMemo(() => {
    const rand = seededRandom(Date.now())
    const count = 7
    const heights: number[] = []
    for (let i = 0; i < count; i++) {
      // Range: 25px to 90px, with a natural slight decay toward the end
      const base = 25 + rand() * 65
      const decay = 1 - i * 0.04
      heights.push(Math.round(base * decay))
    }
    // Segment width weights -- also slightly randomized for organic feel
    const weights = heights.map(() => 0.7 + rand() * 0.7)
    return { heights, weights }
  }, [])

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return null
    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)
    return { ctx, w, h }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const setup = setupCanvas(canvas)
    if (!setup) return
    const { ctx, w, h } = setup

    const ballRadius = 6
    const groundY = h * 0.7
    const startX = -20
    const endX = w + 20
    const totalDist = endX - startX

    // Measure brand element for safe zone
    let brandLeft = w * 0.3
    let brandRight = w * 0.7
    let brandBottom = h * 0.62
    const measureBrand = () => {
      if (brandRef.current) {
        const r = brandRef.current.getBoundingClientRect()
        brandLeft = r.left - 40
        brandRight = r.right + 40
        brandBottom = r.bottom + 20
      }
    }

    const { heights: arcHeights, weights: segWeights } = bounceProfile
    const numArcs = arcHeights.length

    // Make sure the arc(s) crossing the brand zone are high enough to clear it
    const totalWeight = segWeights.reduce((a, b) => a + b, 0)
    const segWidths = segWeights.map((sw) => (sw / totalWeight) * totalDist)
    const segStarts: number[] = []
    let cum = 0
    for (let i = 0; i < numArcs; i++) {
      segStarts.push(cum)
      cum += segWidths[i]
    }

    // Boost arcs that cross the brand zone
    const adjustedHeights = [...arcHeights]
    for (let i = 0; i < numArcs; i++) {
      const arcStartX = startX + segStarts[i]
      const arcEndX = arcStartX + segWidths[i]
      if (arcEndX > brandLeft && arcStartX < brandRight) {
        const clearance = groundY - brandBottom + 30
        if (adjustedHeights[i] < clearance) {
          adjustedHeights[i] = clearance
        }
      }
    }

    // Trail
    const trail: { x: number; y: number }[] = []
    const maxTrail = 50

    // Timing -- elegant, unhurried
    const totalDuration = 4200

    let animStart = 0

    function getArcIndex(absX: number): number {
      for (let i = numArcs - 1; i >= 0; i--) {
        if (absX >= segStarts[i]) return i
      }
      return 0
    }

    function getBallPos(t: number): { x: number; y: number } {
      const absX = t * totalDist
      const idx = getArcIndex(absX)
      const localX = absX - segStarts[idx]
      const localT = Math.min(1, localX / segWidths[idx])
      const arcH = adjustedHeights[idx]
      const arcY = -4 * arcH * localT * (localT - 1)
      return { x: startX + absX, y: groundY - arcY }
    }

    function drawTrail() {
      if (trail.length < 3) return
      ctx.beginPath()
      ctx.moveTo(trail[0].x, trail[0].y)
      for (let i = 1; i < trail.length; i++) {
        const p = trail[i]
        const prev = trail[i - 1]
        ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + p.x) / 2, (prev.y + p.y) / 2)
      }
      const first = trail[0]
      const last = trail[trail.length - 1]
      const grad = ctx.createLinearGradient(first.x, first.y, last.x, last.y)
      grad.addColorStop(0, "rgba(233,161,51,0)")
      grad.addColorStop(0.6, "rgba(233,161,51,0.12)")
      grad.addColorStop(1, "rgba(233,161,51,0.28)")
      ctx.strokeStyle = grad
      ctx.lineWidth = ballRadius * 1.1
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()
    }

    function drawShadow(bx: number, by: number) {
      const dist = groundY - by
      if (dist <= 0) return
      // Soft gold reflection on the dark ground
      const alpha = Math.max(0, (1 - dist / 180)) * 0.18
      const scale = Math.max(0.15, 1 - dist / 180)
      ctx.beginPath()
      ctx.ellipse(bx, groundY + 1.5, ballRadius * 3.8 * scale, 2 * scale, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(233,161,51,${alpha})`
      ctx.fill()
    }

    function drawBall(bx: number, by: number) {
      // Outer glow -- brand gold
      const glow = ctx.createRadialGradient(bx, by, ballRadius, bx, by, ballRadius * 2.6)
      glow.addColorStop(0, "rgba(233,161,51,0.18)")
      glow.addColorStop(1, "rgba(233,161,51,0)")
      ctx.beginPath()
      ctx.arc(bx, by, ballRadius * 2.6, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // Body -- gold gradient
      const grad = ctx.createRadialGradient(bx - ballRadius * 0.3, by - ballRadius * 0.35, 0, bx, by, ballRadius)
      grad.addColorStop(0, "rgba(247,206,120,1)")
      grad.addColorStop(0.5, "rgba(233,161,51,1)")
      grad.addColorStop(1, "rgba(179,118,30,1)")
      ctx.beginPath()
      ctx.arc(bx, by, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Highlight
      ctx.beginPath()
      ctx.arc(bx - ballRadius * 0.25, by - ballRadius * 0.3, ballRadius * 0.22, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.5)"
      ctx.fill()
    }

    function frame(now: number) {
      if (animStart === 0) animStart = now
      const elapsed = now - animStart
      const rawT = Math.min(elapsed / totalDuration, 1)
      const eased = 1 - Math.pow(1 - rawT, 1.3)

      const { x: bx, y: by } = getBallPos(eased)

      trail.push({ x: bx, y: by })
      if (trail.length > maxTrail) trail.shift()

      ctx.clearRect(0, 0, w, h)
      drawTrail()
      drawShadow(bx, by)
      drawBall(bx, by)

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(frame)
      } else {
        // Animation complete -- wait a beat then dismiss
        setTimeout(() => setDone(true), 300)
      }
    }

    const startDelay = setTimeout(() => {
      measureBrand()
      animFrameRef.current = requestAnimationFrame(frame)
    }, 150)

    const handleResize = () => {
      setupCanvas(canvas)
      measureBrand()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(startDelay)
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [setupCanvas, bounceProfile])

  // Progress bar synced to animation
  useEffect(() => {
    const dur = 4200
    const start = Date.now()
    const interval = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1)
      setProgress(1 - Math.pow(1 - p, 2.5))
      if (p >= 1) clearInterval(interval)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(16px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0c0f]"
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          <div ref={brandRef} className="relative z-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              {/* Official multicolor wordmark -- dynamic left-to-right reveal */}
              <motion.img
                src="/nexus-multicolor.svg"
                alt="Nexus"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, y: 10 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-9 md:h-14 w-auto select-none"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-9 h-px bg-white/15 origin-center"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/60 font-light select-none"
              >
                Conexion &middot; Comunidad &middot; Movimiento
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col items-center gap-2.5"
            >
              <div className="w-36 h-px bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full origin-left"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-[8px] tracking-[0.2em] uppercase text-white/50 font-light select-none tabular-nums"
              >
                {Math.round(progress * 100)}%
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
