"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"

export function NewsletterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 lg:py-44 bg-secondary/40 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/[0.06] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent/[0.04] pointer-events-none" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-medium">
                Newsletter
              </p>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.035em] text-foreground leading-[1.05]">
              No te pierdas nada.
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-md mx-auto">
              Torneos, lanzamientos de productos y ofertas exclusivas directo a tu correo. Sin spam, solo lo que importa.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 h-12 px-5 rounded-xl bg-background border border-border text-foreground text-[14px] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all duration-300"
              required
            />
            <button
              type="submit"
              disabled={submitted}
              className="h-12 px-7 rounded-xl bg-foreground text-background text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={2} />
                  Listo
                </>
              ) : (
                <>
                  Suscribirme
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </motion.form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-[13px] text-accent font-medium"
            >
              Bienvenido a la comunidad Nexus.
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-6 text-[11px] text-muted-foreground"
          >
            Puedes darte de baja en cualquier momento. Leemos nuestra politica de privacidad.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
