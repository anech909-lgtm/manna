import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Leaf, Utensils, CalendarHeart, ArrowRight, Instagram, Mail, MapPin, MessageCircle, Facebook, Twitter, Menu, X } from 'lucide-react';

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

const ParallaxCardImage = ({ src, alt }: { src: string, alt: string }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%] h-[130%] w-full">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
};

const BuildYourBowl = () => {
  const [selections, setSelections] = useState({
    greens: [] as string[],
    bases: [] as string[],
    toppings: [] as string[],
    dressings: [] as string[]
  });

  const options = {
    greens: [{ name: 'Mixed Greens', price: 0 }, { name: 'Fresh Spinach', price: 0 }],
    bases: [{ name: 'Rice', price: 0 }, { name: 'Sweet Potatoes', price: 0 }],
    toppings: [
      { name: 'Cherry Tomatoes', price: 0 },
      { name: 'Cucumbers', price: 0 },
      { name: 'Sweet Corn', price: 0 },
      { name: 'Black Beans', price: 0 },
      { name: 'Pico de Gallo', price: 0 },
      { name: 'Avocado', price: 2 },
      { name: 'Guacamole', price: 2 }
    ],
    dressings: [{ name: 'Sriracha', price: 0 }, { name: 'Creamy Herb', price: 0 }, { name: 'Vinaigrette', price: 0 }, { name: 'Sweet Onion', price: 0 }]
  };

  const toggleSelection = (category: keyof typeof selections, itemName: string) => {
    setSelections(prev => {
      const current = prev[category];
      if (current.includes(itemName)) {
        return { ...prev, [category]: current.filter(i => i !== itemName) };
      } else {
        return { ...prev, [category]: [...current, itemName] };
      }
    });
  };

  const calculateTotal = () => {
    let total = 12; // Base price
    Object.entries(selections).forEach(([category, selectedItems]) => {
      selectedItems.forEach(itemName => {
        const item = options[category as keyof typeof options].find(i => i.name === itemName);
        if (item) total += item.price;
      });
    });
    return total;
  };

  return (
    <div className="bg-[var(--color-manna-cream)] rounded-[2rem] p-6 sm:p-10 md:p-16 border border-[var(--color-manna-gold)]/20 shadow-xl shadow-black/5 relative overflow-hidden">
      <div className="text-center mb-10 sm:mb-16">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-manna-green)] mb-4">Build Your Bowl</h3>
        <p className="text-[var(--color-manna-dark)]/70 font-light">Customize your perfect meal from our fresh, daily-prepared ingredients. Base bowl starts at $12.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
        {Object.entries(options).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-lg font-serif text-[var(--color-manna-gold)] mb-6 border-b border-[var(--color-manna-gold)]/20 pb-2 capitalize">{category}</h4>
            <ul className="space-y-4">
              {items.map((item, i) => {
                const isSelected = selections[category as keyof typeof selections].includes(item.name);
                return (
                  <motion.li 
                    key={i} 
                    whileTap={{ scale: 0.97 }}
                    animate={{ 
                      backgroundColor: isSelected ? 'rgba(31, 77, 58, 0.04)' : 'transparent',
                      borderColor: isSelected ? 'rgba(31, 77, 58, 0.15)' : 'transparent'
                    }}
                    className={`flex items-center space-x-3 text-sm font-light cursor-pointer group p-2.5 -mx-2.5 rounded-xl border transition-colors ${isSelected ? 'text-[var(--color-manna-green)] font-medium' : 'text-[var(--color-manna-dark)]/80 border-transparent hover:bg-black/5'}`}
                    onClick={() => toggleSelection(category as keyof typeof selections, item.name)}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[var(--color-manna-green)] border-[var(--color-manna-green)]' : 'border-[var(--color-manna-green)]/30 group-hover:border-[var(--color-manna-green)]'}`}>
                      {isSelected && (
                        <motion.svg 
                          initial={{ scale: 0, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="w-3 h-3 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                    <span className="flex-grow">{item.name} {item.price > 0 && <span className="text-[var(--color-manna-gold)] text-xs ml-1">(+${item.price})</span>}</span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--color-manna-gold)]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg text-center md:text-left">
        <div>
          <h4 className="text-xl sm:text-2xl font-serif text-[var(--color-manna-green)] mb-2">Your Custom Bowl</h4>
          <p className="text-sm text-[var(--color-manna-dark)]/60">
            {Object.values(selections).flat().length > 0 
              ? Object.values(selections).flat().join(', ') 
              : 'Select ingredients to build your bowl'}
          </p>
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="text-3xl font-serif text-[var(--color-manna-gold)]">${calculateTotal()}</div>
          <a 
            href={Object.values(selections).flat().length > 0 ? `https://wa.me/17215266181?text=${encodeURIComponent(`Hi Manna! I'd like to order a Custom Bowl ($${calculateTotal()}):\n\n${Object.entries(selections).filter(([_, items]) => items.length > 0).map(([category, items]) => `${category.charAt(0).toUpperCase() + category.slice(1)}: ${items.join(', ')}`).join('\n')}`)}` : '#'}
            target={Object.values(selections).flat().length > 0 ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`flex-grow md:flex-grow-0 text-center bg-[var(--color-manna-green)] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-all duration-300 ${Object.values(selections).flat().length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--color-manna-dark)] hover:shadow-xl hover:-translate-y-1'}`}
            onClick={(e) => {
              if (Object.values(selections).flat().length === 0) {
                e.preventDefault();
              }
            }}
          >
            Add to Order
          </a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <a href="#" className="transition-transform duration-500 hover:scale-105">
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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-manna-green)] pt-20">
        {/* Subtle background texture/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-manna-green)] via-[var(--color-manna-green-secondary)] to-[var(--color-manna-green)] opacity-80 z-0"></div>
        
        {/* Floating Gold Accents */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-12 h-12 rounded-full border border-[var(--color-manna-gold)]/30 z-0"
        ></motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full border border-[var(--color-manna-gold)]/20 z-0"
        ></motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 text-[var(--color-manna-gold)]/20 z-0"
        >
          <Leaf className="w-16 h-16" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left"
            >
              <div className="mb-8">
                <img src="https://i.postimg.cc/TwBjvM9c/Chat-GPT-Image-Mar-1-2026-04-05-48-PM.png" alt="Manna Logo" className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
                Elevate Your Event <br className="hidden sm:block" />
                <span className="italic text-[var(--color-manna-gold-soft)]">Experience</span> with Manna
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[var(--color-manna-cream)]/90 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-medium mb-10">
                <span>Fresh</span>
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--color-manna-gold)]"></span>
                <span>Nourishing</span>
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--color-manna-gold)]"></span>
                <span>Made to Order</span>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#experience" className="inline-flex items-center justify-center bg-[var(--color-manna-gold)] text-[var(--color-manna-dark)] px-6 sm:px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[var(--color-manna-gold-soft)] transition-colors shadow-lg shadow-[var(--color-manna-gold)]/20 text-center">
                  Book the Pastry Cart
                </a>
                <a href="#menu" className="inline-flex items-center justify-center border border-[var(--color-manna-gold)] text-[var(--color-manna-gold)] px-6 sm:px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-gold)]/10 transition-colors text-center">
                  Order Salad Bowls
                </a>
              </div>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative hidden md:block"
            >
              <div className="aspect-[4/5] rounded-t-[150px] rounded-b-[20px] overflow-hidden relative shadow-2xl shadow-black/40 border border-[var(--color-manna-gold)]/20 bg-[var(--color-manna-green-secondary)]">
                <ParallaxCardImage 
                  src="https://images.unsplash.com/photo-1509365465985-25d11c17e812" 
                  alt="Manna Cinnamon Roll Cart" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-manna-green)]/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
              
              {/* Decorative overlapping image */}
              <motion.div 
                style={{ y: y2 }}
                className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--color-manna-green)] shadow-xl bg-[var(--color-manna-cream)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" 
                  alt="Fresh salad bowl" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
            
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
              
              <p className="text-lg text-[var(--color-manna-dark)]/80 mb-6 leading-relaxed font-light">
                At Manna, we believe that true nourishment goes beyond the plate. Crafted with <span className="font-medium text-[var(--color-manna-green)]">premium, fresh ingredients</span>, our <span className="font-medium text-[var(--color-manna-green)]">made-to-order</span> offerings are designed to elevate every occasion.
              </p>
              <p className="text-lg text-[var(--color-manna-dark)]/80 mb-10 leading-relaxed font-light">
                From our vibrant salad bowls to our <span className="font-medium text-[var(--color-manna-green)]">elegant cart setups</span>, we bring a refined <span className="font-medium text-[var(--color-manna-green)]">event catering experience</span> directly to you. Every detail is intentionally curated to level up your guest experience, creating unforgettable moments where people can truly connect and celebrate.
              </p>
              
              <a href="#experience" className="inline-flex items-center space-x-3 text-[var(--color-manna-gold)] font-medium uppercase tracking-widest text-sm group">
                <span>Discover our experiences</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Signature Bowls */}
      <section id="menu" className="py-20 sm:py-32 bg-white text-[var(--color-manna-dark)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">Fresh • Nourishing • Made to Order</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-manna-green)]">Signature Salad Bowls</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 sm:mb-32">
            {[
              {
                title: "Chicken Bowl",
                price: "$15",
                desc: "Grilled organic chicken, mixed greens, roasted sweet potato, quinoa, toasted almonds, and our signature green goddess dressing.",
                img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2600&auto=format&fit=crop"
              },
              {
                title: "Shrimp Bowl",
                price: "$21",
                desc: "Wild-caught shrimp, baby spinach, avocado, mango salsa, edamame, sesame seeds, and a light citrus vinaigrette.",
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              },
              {
                title: "Beef Bowl",
                price: "$22",
                desc: "Grass-fed beef, wild rice, roasted brussels sprouts, cherry tomatoes, pickled red onions, and a balsamic glaze.",
                img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2600&auto=format&fit=crop"
              }
            ].map((bowl, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.2} className="h-full">
                  <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-transparent hover:border-[var(--color-manna-green)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--color-manna-green)]/10 transition-all duration-500 relative">
                    <div className="absolute top-4 right-4 z-20 bg-[var(--color-manna-gold)] text-white w-14 h-14 rounded-full flex items-center justify-center font-medium shadow-md transform group-hover:scale-105 group-hover:-rotate-3 hover:scale-110 hover:rotate-0 transition-all duration-300 cursor-default">
                      {bowl.price}
                    </div>
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                      <ParallaxCardImage src={bowl.img} alt={bowl.title} />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-serif mb-3 text-[var(--color-manna-green)]">{bowl.title}</h3>
                      <p className="text-sm text-[var(--color-manna-dark)]/70 font-light leading-relaxed mb-8 flex-grow">
                        {bowl.desc}
                      </p>
                      <button className="w-full py-3 rounded-full border border-[var(--color-manna-green)] text-[var(--color-manna-green)] text-xs uppercase tracking-widest font-medium group-hover:bg-[var(--color-manna-green)] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                        Pre-Order Now
                      </button>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>

          {/* Build Your Bowl Section */}
          <FadeIn>
            <BuildYourBowl />
          </FadeIn>
        </div>
      </section>

      {/* Cinnamon Roll Cart (Coming Soon) */}
      <section className="py-20 sm:py-32 bg-[var(--color-manna-green)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509365465985-25d11c17e812')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-manna-green)] via-transparent to-[var(--color-manna-green)]"></div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center border border-[var(--color-manna-gold)] text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full mb-6 sm:mb-8 shadow-[0_0_15px_rgba(198,167,94,0.3)]">
              Coming Soon
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 sm:mb-8 leading-tight drop-shadow-lg">
              Cinnamon Roll Cart <br/>
              <span className="italic text-[var(--color-manna-gold-soft)] text-2xl sm:text-4xl md:text-5xl lg:text-6xl">– Coming April 2026 –</span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-10 sm:mb-12 max-w-2xl mx-auto">
              Warm, fresh, handcrafted cinnamon rolls served from our elegant pastry cart.
            </p>
            
            <a href="#contact" className="inline-flex items-center justify-center bg-transparent border border-[var(--color-manna-gold)] text-[var(--color-manna-gold)] px-8 sm:px-10 py-4 rounded-full text-xs sm:text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-manna-gold)] hover:text-[var(--color-manna-dark)] transition-all duration-500 shadow-[0_0_20px_rgba(198,167,94,0.2)] hover:shadow-[0_0_30px_rgba(198,167,94,0.5)] text-center">
              Join the Waitlist
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Event Experience Section */}
      <section id="experience" className="py-20 sm:py-32 bg-[var(--color-manna-cream)] relative border-t border-[var(--color-manna-gold)]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-[var(--color-manna-gold)] text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">Event Pastry Cart</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-[var(--color-manna-green)] font-serif">Level Up Your Guest Experience</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <FadeIn className="col-span-2">
                <div className="aspect-[16/9] rounded-t-[2rem] rounded-bl-[2rem] overflow-hidden shadow-xl border border-[var(--color-manna-gold)]/20">
                  <img 
                    src="https://i.postimg.cc/tJhqRWh3/Chat-GPT-Image-Mar-1-2026-12-34-11-AM.png" 
                    alt="Manna Floral Event Setup" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="aspect-square rounded-bl-[2rem] overflow-hidden shadow-lg border border-[var(--color-manna-gold)]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop" 
                    alt="Premium floral decor and table setting" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="aspect-square rounded-br-[2rem] overflow-hidden shadow-lg border border-[var(--color-manna-gold)]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop" 
                    alt="Elegant cake and floral styling" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.6}>
                <div className="aspect-square rounded-tl-[2rem] overflow-hidden shadow-lg border border-[var(--color-manna-gold)]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" 
                    alt="Manna Custom Pastry Cart Desserts" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div className="aspect-square rounded-tr-[2rem] overflow-hidden shadow-lg border border-[var(--color-manna-gold)]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=1000&auto=format&fit=crop" 
                    alt="Elegant event styling and decor" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text Content */}
            <FadeIn>
              <div className="lg:pl-12">
                <p className="text-xl text-[var(--color-manna-dark)]/80 font-light leading-relaxed mb-10">
                  Make your next gathering unforgettable with our bespoke pastry cart. We bring a touch of elegance and artisanal sweetness directly to your venue, creating a stunning focal point that delights every guest.
                </p>
                
                <div className="mb-12">
                  <h4 className="text-[var(--color-manna-gold)] font-serif text-2xl mb-6">Perfect For:</h4>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                    {[
                      { title: "Weddings", desc: "A beautiful addition to your reception or cocktail hour." },
                      { title: "Corporate Events", desc: "Impress clients and treat your team." },
                      { title: "Birthdays", desc: "Celebrate milestones with artisanal treats." },
                      { title: "Private Gatherings", desc: "Elevate your intimate dinner parties." }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col">
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
                Pre-Order Salad Bowls
              </a>
              
              <a href="https://wa.me/17215266181" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto inline-flex items-center justify-center bg-[var(--color-manna-green)] border border-[var(--color-manna-gold)] text-[var(--color-manna-gold)] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-manna-gold)] hover:text-[var(--color-manna-dark)] transition-colors duration-300 shadow-lg">
                WhatsApp Order (721-526-6181)
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[var(--color-manna-green)] text-[var(--color-manna-cream)] py-16 sm:py-24 relative overflow-hidden border-t border-[var(--color-manna-gold)]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <FadeIn>
            <img src="https://i.postimg.cc/TwBjvM9c/Chat-GPT-Image-Mar-1-2026-04-05-48-PM.png" alt="Manna Logo" className="h-20 sm:h-24 md:h-32 w-auto object-contain mx-auto mb-6 sm:mb-8" referrerPolicy="no-referrer" />
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[var(--color-manna-cream)]/80 font-medium mb-12 sm:mb-16">
              Gather &bull; Nourish &bull; Live
            </p>
            
            <div className="flex flex-col items-center space-y-6 mb-12 sm:mb-16 w-full">
              <a href="mailto:hello@mannafoods.com" className="text-[var(--color-manna-cream)]/70 hover:text-[var(--color-manna-gold)] transition-colors duration-300 font-light flex items-center justify-center space-x-3 text-base sm:text-lg w-full">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">hello@mannafoods.com</span>
              </a>
              <a href="https://wa.me/7215266181" className="text-[var(--color-manna-cream)]/70 hover:text-[var(--color-manna-gold)] transition-colors duration-300 font-light flex items-center justify-center space-x-3 text-base sm:text-lg w-full">
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>+1 (721) 526-6181</span>
              </a>
              <div className="text-[var(--color-manna-cream)]/70 font-light flex items-center justify-center space-x-3 text-base sm:text-lg w-full">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Find our current location</span>
              </div>
            </div>

            <div className="flex space-x-10 justify-center mb-20">
              <a href="#" className="text-[var(--color-manna-cream)]/50 hover:text-[var(--color-manna-gold)] transition-all duration-300 transform hover:-translate-y-1">
                <Instagram className="w-7 h-7" />
              </a>
              <a href="#" className="text-[var(--color-manna-cream)]/50 hover:text-[var(--color-manna-gold)] transition-all duration-300 transform hover:-translate-y-1">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="#" className="text-[var(--color-manna-cream)]/50 hover:text-[var(--color-manna-gold)] transition-all duration-300 transform hover:-translate-y-1">
                <Twitter className="w-7 h-7" />
              </a>
            </div>
          </FadeIn>
          
          <div className="w-full pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-manna-cream)]/40 uppercase tracking-[0.2em] font-medium">
            <p>&copy; {new Date().getFullYear()} Manna Foods. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-[var(--color-manna-gold)] transition-colors duration-300">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
