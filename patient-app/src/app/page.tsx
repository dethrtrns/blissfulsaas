import Link from "next/link";
import { AlexButton } from "@/components/ui/AlexButton";
import { Sparkles, Shield, Compass, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-surface overflow-hidden font-sans antialiased text-foreground">
      {/* Editorial Navigation */}
      <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-16 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-linear-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
            <span className="text-primary-foreground font-heading font-bold text-lg md:text-xl leading-none">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-xl md:text-2xl text-primary tracking-tighter">Blissful Station</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-primary/30">The Serene Sanctuary</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors">
            Login
          </Link>
          <AlexButton href="/signup" size="sm">
            Apply
          </AlexButton>
        </div>
      </nav>

      {/* Hero: The Digital Curator */}
      <section className="relative flex flex-col justify-center min-h-[90vh] px-6 md:px-16 pt-20 md:pt-12 pb-12">
        {/* Architectural Ambient Blurs */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-screen bg-primary/2 rounded-full blur-[120px] -z-10 pointer-events-none transform translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-1/4 h-1/2 bg-accent/20 rounded-full blur-[100px] -z-10 pointer-events-none transform -translate-x-1/4" />

        <div className="max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col text-center md:text-left items-center md:items-start animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/10 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/60 mb-4 md:mb-6 shadow-sm w-fit">
              <Sparkles className="w-3 h-3" /> The Curated Sanctuary
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal tracking-tight text-primary leading-[1.05] mb-4 md:mb-6">
              Where Science Meets <br className="hidden lg:block" />
              <span className="italic font-light simmer-text px-2">Architectural Healing.</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-primary/70 max-w-xl leading-relaxed font-light tracking-tight mb-8">
              A private ecosystem designed to pair world-class clinical expertise with an environment of profound digital calm.
            </p>

            <div className="flex gap-4 w-full md:w-auto">
              <AlexButton href="/signup" size="lg" className="shadow-2xl shadow-primary/20">
                Find Your Specialist
              </AlexButton>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
            <div className="relative aspect-square w-full bg-surface-container-lowest rounded-[4rem] border border-outline-variant/10 shadow-2xl overflow-hidden group">
              <img
                src="/hero-illustration.png"
                alt="Architectural Sanctuary Illustration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Editorial Feature Gallery - Asymmetric Grid */}
      <section className="py-20 md:py-32 px-6 md:px-16 bg-surface-container-low/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">

          {/* Card 1: Overlapping Layout */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-32 text-center md:text-left">
            <div className="w-full md:w-1/2 aspect-[4/5] bg-surface-container-lowest rounded-xl md:rounded-[3.5rem] border border-outline-variant/10 shadow-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab30?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Architectural Sanctuary"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-10000 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-primary/30">Curation 01</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal leading-tight">Handpicked <br className="hidden md:block" /> Specialist Network.</h2>
              <p className="text-base md:text-lg text-primary/60 leading-relaxed font-light tracking-tight">
                We don't just provide access; we provide alignment. Each practioner in the Blissful Sanctuary is vetted for both clinical rigor and human-centric empathy.
              </p>
              <div className="pt-2 md:pt-4">
                <Link href="/about" className="flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0 text-xs font-bold uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-2 hover:border-primary transition-all">
                  Explore Standards
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Flip */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16 lg:gap-32 text-center md:text-left">
            <div className="w-full md:w-1/2 aspect-[4/5] bg-surface-container-lowest rounded-xl md:rounded-[3.5rem] border border-outline-variant/10 shadow-2xl overflow-hidden group hover:rotate-0 transition-transform duration-1000 md:-rotate-2">
              <img
                src="https://images.unsplash.com/photo-1620121692029-d088224efc74?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Digital Serenity"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-10000 opacity-80 group-hover:opacity-100"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-primary/30">Curation 02</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal leading-tight">Boundaries <br className="hidden md:block" /> Defined by Color.</h2>
              <p className="text-base md:text-lg text-primary/60 leading-relaxed font-light tracking-tight">
                A visual sanctuary where structural lines are replaced by tonal depth. No harsh borders. No clinical noise. Just a breathable space for meaningful recovery.
              </p>
              <div className="flex justify-center md:justify-start gap-8 pt-4 md:pt-6">
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <Shield className="w-5 h-5 text-primary/20" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-40">Privacy Shield</span>
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start">
                  <Compass className="w-5 h-5 text-primary/20" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-40">Guided Path</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 md:py-32 px-6 flex flex-col items-center text-center bg-surface">
        <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-primary/20 mb-12 md:mb-16">Trusted by world-class institutions</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-32 opacity-20 grayscale">
          <span className="text-xl md:text-2xl font-heading font-bold tracking-tighter">YALE MEDICAL</span>
          <span className="text-xl md:text-2xl font-heading font-bold tracking-tighter">STANFORD CARE</span>
          <span className="text-xl md:text-2xl font-heading font-bold tracking-tighter">NIEMEYER HOSP.</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low py-16 md:py-20 px-6 md:px-16 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">B</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">Blissful Station</span>
            </div>
            <p className="text-[10px] md:text-xs font-medium text-primary/40 leading-relaxed max-w-xs">
              A private ecosystem for high-end mental well-being. Built on the principles of architectural calm and scientific rigor.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
            <div className="flex flex-col gap-4">
              <span className="text-primary/20">The Portal</span>
              <a href="/login" className="hover:text-primary transition-colors">Sign In</a>
              <a href="/signup" className="hover:text-primary transition-colors">Apply</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-primary/20">Legal</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Governance</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-primary/20">Global</span>
              <span className="hover:text-primary transition-colors">Worldwide</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 md:pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary/20">
          <span>© {new Date().getFullYear()} Blissful Station Sanctuary</span>
          <span>PRIVATE • ENCRYPTED • SECURE</span>
        </div>
      </footer>
    </main>
  );
}
