"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ShoppingBag, Search, Menu, X, ArrowRight } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

type NavLink = {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Tienda" },
  { href: "/nexuniversity", label: "Nexuniversity" },
  { href: "/corporativo", label: "Corporativo" },
  { href: "/blog", label: "Blog" },
]

const highlightLinks: NavLink[] = [
  { href: "/contacto", label: "Contacto" },
  { href: "/spikeball", label: "SpikeBall" },
]

const highlightPillClass =
  "inline-flex items-center h-8 px-4 rounded-full bg-accent text-accent-foreground text-caption font-semibold hover:brightness-105 hover:scale-[1.03] transition-all duration-300"

export function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalQuantity, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // White logo/links only while sitting on top of a dark hero. Turns dark on scroll or on light pages.
  const lightOnDark = overHero && !scrolled

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // Sin el delay de 4.6s que esperaba a la intro: la intro ahora solo aparece
        // en la primera visita de la sesion, asi que atarse a su duracion dejaba el
        // navbar invisible varios segundos en todas las demas.
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo -- white over dark hero, smoothly turns dark on scroll / light pages */}
            <Link href="/" className="group flex items-center" aria-label="Nexus inicio">
              <img
                src="/nexus-banner-white.svg"
                alt="Nexus"
                style={{ filter: lightOnDark ? "invert(0)" : "invert(1)" }}
                className="h-7 w-auto group-hover:opacity-70 transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </Link>

            {/* Desktop Nav -- centered */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-ui rounded-lg transition-colors duration-300 hover:bg-foreground/[0.03] ${
                    lightOnDark ? "text-background/80 hover:text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Buscar"
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:bg-foreground/[0.04] ${
                  lightOnDark ? "text-background/80 hover:text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Search className="w-[16px] h-[16px]" strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                aria-label="Carrito de compras"
                className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:bg-foreground/[0.04] ${
                  lightOnDark ? "text-background/80 hover:text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShoppingBag className="w-[16px] h-[16px]" strokeWidth={1.5} />
                {totalQuantity > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground"
                  >
                    {totalQuantity}
                  </motion.span>
                )}
              </button>

              <div className={`hidden md:block w-px h-5 mx-2 ${lightOnDark ? "bg-background/20" : "bg-border"}`} />

              <div className="hidden md:flex items-center gap-1.5">
                {highlightLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={highlightPillClass}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
                className={`flex lg:hidden items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:bg-foreground/[0.04] ${
                  lightOnDark ? "text-background/80 hover:text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {menuOpen ? (
                  <X className="w-[16px] h-[16px]" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-[16px] h-[16px]" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu -- fullscreen overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-3xl z-40 overflow-y-auto"
            >
              <nav className="flex flex-col px-8 pt-10 pb-16 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-border/50"
                    >
                      <span className="text-[1.75rem] font-semibold tracking-[-0.03em] text-foreground">
                        {link.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col gap-3"
                >
                  {highlightLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center w-full h-14 rounded-2xl bg-accent text-accent-foreground text-body font-semibold hover:brightness-105 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer />
    </>
  )
}
