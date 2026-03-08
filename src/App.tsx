import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Leaf, Utensils, CalendarHeart, ArrowRight, Instagram, Mail, MapPin, MessageCircle, Facebook, Twitter, Menu, X } from 'lucide-react';
import { PreOrderModal, OrderType } from './components/PreOrderModal';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);




export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderModalType, setOrderModalType] = useState<OrderType>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-manna-cream)] text-[var(--color-manna-dark)] overflow-hidden selection:bg-[var(--color-manna-gold)] selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-[var(--color-manna-green)]/95 backdrop-blur-md py-4 shadow-sm border-b border-[var(--color-manna-gold)]/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="w-1/3 hidden md:block">
            <ul className="flex space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-manna-cream)]">
              <li><a href="#menu" className="hover:text-[var(--color-manna-gold)] transition-colors">Menu</a></li>
              <li><a href="#experience" className="hover:text-[var(--color-manna-gold)] transition-colors">Experience</a></li>
            </ul>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="w-1/3 md:hidden flex justify-start">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--color-manna-cream)] hover:text-[var(--color-manna-gold)] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="w-1/3 md:w-1/3 text-center flex justify-center">
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="transition-transform duration-500 hover:scale-105">
              <img src="https://i.postimg.cc/TwBjvM9c/Chat-GPT-Image-Mar-1-2026-04-05-48-PM.png" alt="Manna Logo" className="h-10 md:h-12 w-auto object-contain" referrerPolicy="no-referrer" />
            </a>
          </div>
          <div className="w-1/3 hidden md:flex justify-end">
            <a href="#contact" className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-manna-cream)] border border-[var(--color-manna-cream)]/30 px-6 py-2 rounded-full hover:bg-[var(--color-manna-gold)] hover:text-[var(--color-manna-dark)] hover:border-[var(--color-manna-gold)] transition-all duration-300">
              Inquire
            </a>
          </div>
          
          {/* Mobile Empty Space for Balance */}
          <div className="w-1/3 md:hidden"></div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 pb-6 pt-2 flex flex-col space-y-6 text-center border-t border-[var(--color-manna-gold)]/10">
            <a 
              href="#menu" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[var(--color-manna-cream)] hover:text-[var(--color-manna-gold)] text-sm uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Menu
            </a>
            <a 
              href="#experience" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[var(--color-manna-cream)] hover:text-[var(--color-manna-gold)] text-sm uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Experience
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block mx-auto text-[var(--color-manna-dark)] bg-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold px-8 py-3 rounded-full hover:bg-[var(--color-manna-cream)] hover:text-[var(--color-manna-green)] transition-all duration-300"
            >
              Inquire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="mb-8">
              <img src="https://i.postimg.cc/TwBjvM9c/Chat-GPT-Image-Mar-1-2026-04-05-48-PM.png" alt="Manna Logo" className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
              Fresh Caribbean <br className="hidden sm:block" />
              <span className="italic text-[var(--color-manna-gold-soft)]">Inspired Food</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto">
              Pre-Order Fresh Cinnamon Rolls, Salad Bowls, and Stuffed Sweet Potatoes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-10">
              <a href="#menu" className="inline-flex items-center justify-center bg-[var(--color-manna-gold)] text-[var(--color-manna-dark)] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[var(--color-manna-gold-soft)] transition-colors shadow-lg shadow-[var(--color-manna-gold)]/20 text-center">
                Pre Order Now
              </a>
              <a href="#menu" className="inline-flex items-center justify-center border border-white text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors text-center">
                View Menu
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Serve */}
      <section id="menu" className="py-20 sm:py-32 bg-white text-[var(--color-manna-dark)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">Fresh • Nourishing • Made to Order</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-manna-green)]">What We Serve</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Cinnamon Rolls */}
            <FadeIn delay={0.1} className="h-full">
              <div className="group flex flex-col h-full bg-[var(--color-manna-cream)] rounded-[2rem] overflow-hidden border border-[var(--color-manna-gold)]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=1000" 
                    alt="Cinnamon Rolls" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-serif mb-4 text-[var(--color-manna-green)]">Cinnamon Rolls</h3>
                  <p className="text-sm text-[var(--color-manna-dark)]/70 font-light leading-relaxed mb-8 flex-grow">
                    Fresh baked cinnamon rolls with soft dough and sweet glaze.
                  </p>
                  <button 
                    onClick={() => setOrderModalType('cinnamon-rolls')}
                    className="w-full py-4 rounded-full bg-[var(--color-manna-green)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] hover:shadow-lg transition-all duration-300"
                  >
                    Pre Order
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Salad Bowls */}
            <FadeIn delay={0.2} className="h-full">
              <div className="group flex flex-col h-full bg-[var(--color-manna-cream)] rounded-[2rem] overflow-hidden border border-[var(--color-manna-gold)]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Salad Bowls" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-serif mb-4 text-[var(--color-manna-green)]">Salad Bowls</h3>
                  <p className="text-sm text-[var(--color-manna-dark)]/70 font-light leading-relaxed mb-8 flex-grow">
                    Create your own healthy salad bowl with fresh ingredients and toppings.
                  </p>
                  <button 
                    onClick={() => setOrderModalType('salad-bowls')}
                    className="w-full py-4 rounded-full bg-[var(--color-manna-green)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] hover:shadow-lg transition-all duration-300"
                  >
                    Build Your Bowl
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Stuffed Sweet Potatoes */}
            <FadeIn delay={0.3} className="h-full">
              <div className="group flex flex-col h-full bg-[var(--color-manna-cream)] rounded-[2rem] overflow-hidden border border-[var(--color-manna-gold)]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src="https://i.postimg.cc/kgRR8456/stffed.png" 
                    alt="Stuffed Sweet Potatoes" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-serif mb-4 text-[var(--color-manna-green)]">Stuffed Sweet Potatoes</h3>
                  <p className="text-sm text-[var(--color-manna-dark)]/70 font-light leading-relaxed mb-8 flex-grow">
                    Delicious baked sweet potatoes filled with meats and toppings.
                  </p>
                  <button 
                    onClick={() => setOrderModalType('sweet-potatoes')}
                    className="w-full py-4 rounded-full bg-[var(--color-manna-green)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] hover:shadow-lg transition-all duration-300"
                  >
                    Pre Order
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Manna Section */}
      <section className="py-20 sm:py-32 px-6 md:px-12 max-w-7xl mx-auto relative bg-[var(--color-manna-cream)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-16 items-center">
          <div className="md:col-span-5 relative">
            <FadeIn>
              <div className="aspect-[3/4] w-full relative oval-mask overflow-hidden shadow-2xl bg-[var(--color-manna-green-secondary)]">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                  alt="Elegant catering experience" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-[var(--color-manna-gold)]/30 flex items-center justify-center p-2 hidden md:flex">
                <div className="w-full h-full rounded-full border border-[var(--color-manna-gold)]/20 animate-[spin_20s_linear_infinite] border-dashed"></div>
              </div>
            </FadeIn>
          </div>
          
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-manna-green)] leading-tight">
                Gather. Nourish. Live.
              </h2>
              <div className="w-24 h-1 bg-[var(--color-manna-gold)] mt-8 mb-10 rounded-full"></div>
              
              <p className="text-lg md:text-xl text-[var(--color-manna-dark)]/80 font-light leading-relaxed mb-8">
                Manna Cart is a versatile mobile food concept. From fresh salad bowls and stuffed sweet potatoes to Caribbean-inspired dishes and artisanal pastries, we serve whatever nourishes the soul, straight from our service pans.
              </p>
              
              <a href="#experience" className="inline-flex items-center space-x-3 text-[var(--color-manna-gold)] font-medium uppercase tracking-widest text-sm group">
                <span>Discover our experiences</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Manna Cart Section */}
      <section className="py-20 sm:py-32 bg-[var(--color-manna-cream)] relative border-t border-[var(--color-manna-gold)]/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          <FadeIn className="order-2 lg:order-1 h-full w-full">
            <div className="relative w-full aspect-video lg:rounded-r-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://i.postimg.cc/Vvy0KPZF/manna2.png" 
                alt="Fresh customizable bowls" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="order-1 lg:order-2 px-6 md:px-12 lg:pl-20 lg:pr-12 max-w-3xl">
            <div className="py-12">
              <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">Our Concept</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[var(--color-manna-green)] mb-8">
                About Manna Cart
              </h2>
              
              <div className="space-y-6 text-lg text-[var(--color-manna-dark)]/80 font-light leading-relaxed">
                <p>
                  Manna Cart is a modern mobile kitchen designed for flexibility. Whether it's a corporate lunch, a wedding, or a street-side pop-up, we adapt our menu to the moment.
                </p>
                <p>
                  Our offerings range from healthy customizable bowls to traditional Caribbean favorites, all prepared fresh and served with care.
                </p>
                <p>
                  We believe in the power of variety. Our cart is equipped to serve any dish that can be prepared in food service pans, ensuring a fresh and hot experience every time.
                </p>
              </div>
              
              <div className="mt-10 flex items-center space-x-4">
                <div className="w-16 h-px bg-[var(--color-manna-gold)]"></div>
                <span className="text-[var(--color-manna-green)] font-serif italic text-xl">Fresh & Customizable</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How Manna Cart Works */}
      <section className="py-20 sm:py-32 bg-white relative border-t border-[var(--color-manna-gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src="https://i.postimg.cc/6QwRXK95/manna-cart.png" 
                  alt="Manna Cart in action" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 className="text-4xl sm:text-5xl font-serif text-[var(--color-manna-green)] mb-8">
                How the Manna Cart Works
              </h2>
              <p className="text-lg text-[var(--color-manna-dark)]/80 font-light leading-relaxed mb-6">
                The Manna Cart is designed for ultimate flexibility, serving a variety of foods tailored to your event and location. Our mobile kitchen prepares diverse meals using professional food service pans, ensuring everything is fresh and hot.
              </p>
              <p className="text-lg text-[var(--color-manna-dark)]/80 font-light leading-relaxed mb-8">
                Our menu is dynamic and changes based on availability and event needs. Examples of what we serve include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[var(--color-manna-dark)]/70 font-medium uppercase tracking-wider">
                <li className="flex items-center"><Utensils className="w-4 h-4 mr-2 text-[var(--color-manna-gold)]" /> Fresh Salad Bowls</li>
                <li className="flex items-center"><Utensils className="w-4 h-4 mr-2 text-[var(--color-manna-gold)]" /> Cinnamon Rolls & Pastries</li>
                <li className="flex items-center"><Utensils className="w-4 h-4 mr-2 text-[var(--color-manna-gold)]" /> Stuffed Sweet Potatoes</li>
                <li className="flex items-center"><Utensils className="w-4 h-4 mr-2 text-[var(--color-manna-gold)]" /> Traditional Caribbean Dishes</li>
                <li className="flex items-center"><Utensils className="w-4 h-4 mr-2 text-[var(--color-manna-gold)]" /> Custom Bowl Combinations</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Event Experience Section */}
      <section id="experience" className="py-20 sm:py-32 bg-[var(--color-manna-cream)] relative border-t border-[var(--color-manna-gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">Mobile Catering Cart</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-[var(--color-manna-green)] font-serif">A Versatile Culinary Experience</h2>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto text-center">
            {/* Text Content */}
            <FadeIn>
              <div>
                <p className="text-xl text-[var(--color-manna-dark)]/80 font-light leading-relaxed mb-10">
                  Elevate your next gathering with the Manna Cart experience. We bring a modern mobile kitchen directly to your venue, serving a curated menu tailored to your event's unique vibe and flavor profile.
                </p>
                
                <div className="mb-12">
                  <h4 className="text-[var(--color-manna-gold)] font-serif text-2xl mb-6">Perfect For:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                      {[
                        { title: "Weddings", desc: "A unique and modern addition to your reception or cocktail hour." },
                        { title: "Corporate Events", desc: "Impress clients and nourish your team with fresh, hot meals." },
                        { title: "Birthdays", desc: "Celebrate milestones with a custom-tailored menu for your guests." },
                        { title: "Private Gatherings", desc: "Elevate your intimate dinner parties with a mobile kitchen experience." }
                      ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-[var(--color-manna-green)] font-medium text-lg mb-1">{item.title}</span>
                        <span className="text-[var(--color-manna-dark)]/60 text-sm font-light leading-relaxed">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#contact" className="inline-flex items-center justify-center space-x-3 bg-[var(--color-manna-gold)] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-manna-dark)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  <CalendarHeart className="w-5 h-5" />
                  <span>Request Event Quote</span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-32 bg-[var(--color-manna-green)] text-white relative border-t border-[var(--color-manna-gold)]/20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-10 sm:mb-16 text-[var(--color-manna-cream)]">
              Ready to Nourish Your Next Event?
            </h2>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#experience" className="w-full md:w-auto inline-flex items-center justify-center bg-[var(--color-manna-gold)] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-cream)] hover:text-[var(--color-manna-green)] transition-colors duration-300 shadow-lg">
                Book the Cart
              </a>
              
              <a href="#menu" className="w-full md:w-auto inline-flex items-center justify-center bg-[var(--color-manna-cream)] text-[var(--color-manna-green)] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors duration-300 shadow-lg">
                Explore Our Menu
              </a>
              
              <a href="https://wa.me/17215266181" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto inline-flex items-center justify-center bg-[var(--color-manna-green)] border border-[var(--color-manna-gold)] text-[var(--color-manna-gold)] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-gold)] hover:text-[var(--color-manna-dark)] transition-colors duration-300 shadow-lg">
                WhatsApp Order (721-526-6181)
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[var(--color-manna-green)] text-[var(--color-manna-cream)] pt-24 pb-12 relative overflow-hidden border-t border-[var(--color-manna-gold)]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
              {/* Brand Column */}
              <div className="flex flex-col items-start space-y-6">
                <img 
                  src="https://i.postimg.cc/TwBjvM9c/Chat-GPT-Image-Mar-1-2026-04-05-48-PM.png" 
                  alt="Manna Logo" 
                  className="h-16 w-auto object-contain mb-2" 
                  referrerPolicy="no-referrer" 
                />
                <p className="text-sm leading-relaxed text-[var(--color-manna-cream)]/80 max-w-xs">
                  Fresh, customizable bowls and refreshing drinks brought directly to you. Experience the taste of Manna.
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-manna-gold)] font-medium pt-2">
                  Gather &bull; Nourish &bull; Live
                </p>
              </div>

              {/* Navigation Column */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-lg font-serif text-[var(--color-manna-cream)]">Explore</h3>
                <ul className="space-y-4 text-sm text-[var(--color-manna-cream)]/70">
                  <li>
                    <a href="#menu" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[var(--color-manna-gold)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Menu
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[var(--color-manna-gold)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Catering
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[var(--color-manna-gold)] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-lg font-serif text-[var(--color-manna-cream)]">Contact</h3>
                <ul className="space-y-4 text-sm text-[var(--color-manna-cream)]/70">
                  <li>
                    <a href="mailto:hello@mannafoods.com" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300 flex items-start space-x-3">
                      <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-manna-gold)]/70" />
                      <span>hello@mannafoods.com</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/17215266181" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300 flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-manna-gold)]/70" />
                      <span>+1 (721) 526-6181</span>
                    </a>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--color-manna-gold)]/70" />
                    <span>Sint Maarten</span>
                  </li>
                </ul>
              </div>

              {/* Social Column */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-lg font-serif text-[var(--color-manna-cream)]">Follow Us</h3>
                <a 
                  href="https://instagram.com/manna.sxm" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block bg-white/5 p-6 rounded-2xl hover:bg-[var(--color-manna-gold)]/10 border border-white/5 hover:border-[var(--color-manna-gold)]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Instagram className="w-6 h-6 text-[var(--color-manna-cream)] group-hover:text-[var(--color-manna-gold)] transition-colors" />
                    <ArrowRight className="w-4 h-4 text-[var(--color-manna-cream)]/50 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[var(--color-manna-cream)]/60 mb-1">Instagram</p>
                  <p className="font-serif text-xl text-[var(--color-manna-cream)] group-hover:text-[var(--color-manna-gold)] transition-colors">@Manna.SXM</p>
                </a>
              </div>
            </div>
          </FadeIn>
          
          <div className="pt-8 border-t border-[var(--color-manna-gold)]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-manna-cream)]/40 uppercase tracking-[0.1em] font-medium">
            <p>&copy; {new Date().getFullYear()} Manna Foods. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-manna-gold)] transition-colors duration-300">Privacy Policy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-manna-gold)] transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <PreOrderModal 
        isOpen={orderModalType !== null} 
        onClose={() => setOrderModalType(null)} 
        type={orderModalType} 
      />
    </div>
  );
}
