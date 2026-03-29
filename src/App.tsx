/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Quote, 
  CheckCircle2, 
  UtensilsCrossed, 
  Instagram, 
  Facebook,
  Menu as MenuIcon,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy-ng7boJnt7lSSv1O3mYrSdjJhIVMlg5PYBbvksO8M-enM6lLgJynk9a9snAytv-bee1Ku9q7ytJ9LyO1wnWrRSXKXLQ87eJZUinrn71LLPAmvBbb3EWLXgXWKzAX7z9CLOzM3omNf_FhH_QqYaUo8axHEoGiV5-nx9IZKZTuzScAfg0QVGHEr4afh-zG9kUHfJ-oN61-2mJIWyJCvRBTuL3bgDRD-sorkrR5DSbyroYSr6Na6btdpa86Vm3jtvydOMmpxjOpPkTb",
  dragonRoll: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdqoGJeSrtoHdxDXqIJSwgsYP96fkViA3bf__BkVHpob0FrxvTpjSTbKsf8iI7cLSCVJoK9CVnBpyru9RWrDPkCeUPgDSmw5w7NYhDgck2j45tv6XHOzlBj7976tgK9A9TE7AAewIT9v-XIDepTJSFi6xB3Nr8A-oZkR_DVm2ZiFIUFEzy-595GpLQX_5nV0y3MYmsdwdD5VSwMsJjaM5fSi4iMJRZ0auP1gXD3H27O9TUSh9JRaV0Z4-ZU1KzqBlGBT2MkixfOK0b",
  salmonNigiri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnIuhOVkpDTkob4DdsDy_uD1y480wrNNeuqhdERO86n5YlU5cyvM0HjgRAY9ni2lURq3bqEmijtwWDEmGeQ85NjbgegbdbnjhlVZNp5XtShJhhzsJitpPt25PeI4_WZk_sW-VMNgnGxQDVPX6o8jaqd5Z7GnSNGsUo9KBJ2W3rQBMKXUnHQSLTfu_ucpFjXX62HKTtNgw5_VjRI7wpfv1im33ltyS8JvH3zrrqMi9GZaR_WC6xbzSMnq1dWlborSIeghupt3jboSmt",
  spicyTuna: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzGFsQAdZP5g5ydP40sT8MHT3CMbT8nzTCpkwMAMRxpLyd1bU8nsT6qTwbXErOEeLxuKLsPROPsp2lAQ9IYG3K1ELOEZKEIRHF2J4FYW0nkVqfZj-YX5bbJEAO0NujE-FLxUK7Y2ePM0gqbpYAKUUa0NlOlMekzFVLprG7JKsTtkW2DPjZugwhQN1134MFl1lxtHSLWv92cI9sA-oQwGbrvqsaMEtdiC0Tfn47RIjzUT6VW0B33jeXFKR_9ozjoOwcTFhdzyIys4ZR",
  shrimpTempura: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_w5Wll1kPEJ704KfHz_TrkufpaDSl862N4CZIW2Hg0IzSBSom3-agcziGBM-kCrVPyXCguFGCpsHswtsQPmHErCzUWvWcMqzpPxBjofYFO61hoIwlho4Rll-ODNtJx-Db7uH3ejjuvWQFV6jgyU7k6Xh7UPWnWfKhS6JhIlqGugZ-XpZUnaRtXVlhWTRfA9raFRmYDx5m6-UHphHoAtb7Cw_4RTg401Rt4PbDAOffIzGHA1Avr636frICGigAfAorKlyDDirT1-Li",
  wagyuSkewers: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtGbmU4XkE-LY2lfnMHxy8GqPQfsHIcRQo44qAoLp_m1DlDKIksWcwa2RKg4Gjy_i-qCZESoshaDJSfxxvC3Rb0nTtHNv8b89fz6pjaalQQwelRKq59eRrCEjU3-mEv4_hSL_wOlQJZ0SSMmMOQcXoKejklhi4YAtHdfPfFfVHrHPhoWKRmzpb2yZPKECjmY0M0MJ6LZWZ-OQvyNODBSDlPQ3CCYruZOdtTM13pi0fjTcX3u8SAMz9SwPxqF2w1VxhsH9cqhNt98uG",
  grilledEel: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTEqwHXYrwrUcXaIANDeaEJERbF-TOl_wwZFuWJo9XZAgSMmFYdsuHWXqarJETntnQzxe45B29qTSHGkU1BFt7NpOPZfSXX_oHa5kH-5VikhRW-Aa4NGltQQuKCelZxKvlQ7cLuY5XxBs_O_WOA3KdAazriRbOaBL7FCD-ogzt7zJRW8RTTfeA2dxSB_JhgnGCIcdF1QH66M0iuq1h72ju2Y8SgOUaqbHcCL6F-WM5lMnybzyvFniyQT4-55uQJHw_tYYXxD58AfTV",
  masterChef: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsJW7sJCgK24wE2nbtmfLbekWi7d-snFvvXR111HqqycetPx64RS3ZZ9FoYNpV7S5pa4Ciz0Fn3J_aiwzu15rftHOoUGFjk-c1i8rFsddpWA2b9o_3OCx9C0UyvquCnLt1hccGWOVcG8YyJ0dBkETgu1VMSD7IQbVLW6O6dIBA-RF9R7kjV2gnsgPdRYVNtD6MzW_7M5QP0iTAid-lOZUtHt1ODvLXYlkdTsMEJyEc29RsTe1B7fpLNzeFtxvhvlPT5GeMYbOmVaoG",
  tradition: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkADHJyVHT9XAUF2nMGlvCRgf1msg79aisuL19YIBz-lOSs3_4YBRh_56kCla2YWyN4aDdVUFedOC__oWpFvthTXtf9u_YVA9NnyAM3g47yewjI-G3AxIOerOcwReSC6sepeFz7hNEWt6RewIVh9jDg89UguP24h9K59ZlpiL3ubczl78Jg93GBPdQI4TJTee77M_L3K9u6i1nD3tB5BSzYYZwSoFr7IdPX4E1Yso5c4I1bMKCNeBZLW0KBvD-VkM-4rQ37sB8eFPo"
};

const NAV_LINKS = [
  { name: "Menu", href: "#", active: true },
  { name: "Reservations", href: "#" },
  { name: "Our Story", href: "#" },
  { name: "Gallery", href: "#" },
];

const CATEGORIES = [
  { name: "Sushi Rolls", icon: "🍣", active: true },
  { name: "Nigiri", icon: "🍤" },
  { name: "Sashimi", icon: "🐟" },
  { name: "Grill", icon: "🔥" },
  { name: "Drinks", icon: "🍶" },
];

const SIGNATURE_DISHES = [
  {
    name: "Dragon Roll",
    price: "$24",
    description: "Shrimp tempura, eel, avocado, topped with unagi sauce and sesame seeds.",
    image: IMAGES.dragonRoll
  },
  {
    name: "Salmon Nigiri",
    price: "$18",
    description: "Hand-pressed premium Atlantic salmon over seasoned vinegar rice.",
    image: IMAGES.salmonNigiri
  },
  {
    name: "Spicy Tuna Roll",
    price: "$19",
    description: "Fresh minced tuna tossed in our signature spicy house sauce.",
    image: IMAGES.spicyTuna
  },
  {
    name: "Shrimp Tempura",
    price: "$16",
    description: "Lightly battered tiger prawns fried to golden perfection.",
    image: IMAGES.shrimpTempura
  },
  {
    name: "Wagyu Skewers",
    price: "$32",
    description: "Premium A5 Wagyu beef grilled over traditional binchotan charcoal.",
    image: IMAGES.wagyuSkewers
  },
  {
    name: "Grilled Eel",
    price: "$22",
    description: "Rich freshwater eel glazed with sweet kabayaki sauce.",
    image: IMAGES.grilledEel
  }
];

const STATS = [
  { label: "Happy Customers", value: "5K+" },
  { label: "Fresh Ingredients", value: "100%" },
  { label: "Average Rating", value: "4.9⭐" },
  { label: "Expert Chefs", value: "15+" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
          isScrolled ? "bg-surface/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="text-2xl font-headline font-black tracking-tighter text-on-surface">
          KUROHANA
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`font-label text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                link.active 
                  ? "text-primary font-bold border-b-2 border-secondary pb-1" 
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-primary text-on-primary px-8 py-3 font-label text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all active:scale-95">
            Book a Table
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-on-surface p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-surface border-t border-surface-container-high p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="font-label text-sm uppercase tracking-widest text-on-surface"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-primary text-on-primary px-8 py-4 font-label text-xs font-bold uppercase tracking-widest">
              Book a Table
            </button>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter text-on-surface leading-[0.9]">
                Savor Every <br />
                <span className="text-primary">Perfect Bite</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-md font-light leading-relaxed">
                Experience authentic Japanese sushi crafted with precision, passion, and the freshest ingredients in Los Angeles.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <button className="bg-primary text-on-primary px-10 py-5 font-label text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all">
                  View Menu
                </button>
                <button className="group flex items-center gap-4 text-on-surface font-label text-sm font-bold uppercase tracking-[0.2em]">
                  <span className="w-12 h-[1px] bg-secondary group-hover:w-16 transition-all"></span>
                  Book a Table
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[500px] lg:h-[700px]"
            >
              <div className="absolute inset-0 bg-surface-container-high translate-x-8 translate-y-8 md:translate-x-12 md:translate-y-12"></div>
              <img 
                src={IMAGES.hero} 
                alt="Premium Sushi Platter" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Category Bar */}
        <section className="bg-surface-container-low sticky top-[72px] md:top-[88px] z-40 border-y border-surface-container-high">
          <div className="container mx-auto px-6 md:px-12 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-start md:justify-center py-6 gap-8 md:gap-16 min-w-max">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.name}
                  className={`flex items-center gap-3 group transition-all duration-300 ${
                    cat.active ? "opacity-100" : "opacity-40 hover:opacity-100"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className={`font-headline font-bold text-xs uppercase tracking-widest ${
                    cat.active ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface"
                  }`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Chef's Signature Section */}
        <section className="py-24 md:py-32 bg-surface">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
              <div className="max-w-xl">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6"
                >
                  Chef's Signature Selection
                </motion.h2>
                <p className="text-on-surface-variant font-light leading-relaxed">
                  Each dish is a testament to our commitment to the craft of traditional omakase with a modern Californian twist.
                </p>
              </div>
              <a href="#" className="text-primary font-bold text-xs uppercase tracking-widest group flex items-center gap-2">
                View Full Menu
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {SIGNATURE_DISHES.map((dish, idx) => (
                <motion.div 
                  key={dish.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-surface-container-low p-6 md:p-8 editorial-shadow transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden mb-8">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-headline font-bold">{dish.name}</h3>
                    <span className="text-secondary font-headline font-bold">{dish.price}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
                    {dish.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 bg-secondary/10 z-0"></div>
                <img 
                  src={IMAGES.masterChef} 
                  alt="Master Chef" 
                  className="relative z-10 w-full h-[500px] md:h-[650px] object-cover editorial-shadow"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <span className="text-primary font-headline font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                  Art of Perfection
                </span>
                <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight leading-tight">
                  Food Made Fresh, Served with Care
                </h2>
                <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                  At Kurohana, we believe that sushi is more than just food—it's an experience of balance and harmony. Our master chefs spend decades honing their craft to ensure every slice and every grain of rice is in perfect equilibrium.
                </p>
                <ul className="space-y-6 pt-4">
                  <li className="flex items-center gap-6">
                    <CheckCircle2 className="text-secondary" size={28} />
                    <span className="font-headline font-bold uppercase tracking-widest text-xs md:text-sm">Sustainable Sourcing</span>
                  </li>
                  <li className="flex items-center gap-6">
                    <UtensilsCrossed className="text-secondary" size={28} />
                    <span className="font-headline font-bold uppercase tracking-widest text-xs md:text-sm">Hand-Crafted Daily</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-surface">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {STATS.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-4xl md:text-5xl font-headline font-black text-primary">{stat.value}</div>
                  <p className="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] text-on-surface-variant">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-surface-container-highest">
          <div className="container mx-auto px-6 md:px-12 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Voices of Our Guests</h2>
          </div>
          <div className="container mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-surface p-10 md:p-20 relative editorial-shadow"
            >
              <Quote className="absolute top-8 left-8 md:top-12 md:left-12 text-6xl text-surface-container-high opacity-50" size={64} />
              <p className="text-xl md:text-3xl font-headline leading-relaxed text-on-surface italic relative z-10 mb-10 text-center">
                "This is hands down the best sushi experience I’ve had in LA. Fresh, flavorful, and beautifully presented. The attention to detail in every bite is truly remarkable."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-headline font-bold">
                  JD
                </div>
                <div className="text-left">
                  <h4 className="font-headline font-bold text-xs md:text-sm uppercase tracking-widest">Jameson Delacroix</h4>
                  <p className="text-[10px] md:text-xs text-on-surface-variant font-label">Food Critic, LA Monthly</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Split Showcase */}
        <section className="grid lg:grid-cols-2 bg-surface min-h-[500px] md:min-h-[600px]">
          <div className="relative overflow-hidden h-[350px] lg:h-auto">
            <img 
              src={IMAGES.tradition} 
              alt="Sushi Tradition" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <h3 className="text-white font-headline font-black text-4xl md:text-5xl tracking-tighter drop-shadow-lg">
                Sushi <br /> Tradition
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center p-12 md:p-20 lg:p-28">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-md space-y-8"
            >
              <span className="text-secondary font-headline font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                Timeless Flavors
              </span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
                Authentic Japanese Taste
              </h2>
              <p className="text-on-surface-variant leading-relaxed font-light">
                We honor centuries-old techniques while sourcing the world's most premium seafood to deliver a culinary journey through Tokyo's finest neighborhoods.
              </p>
              <button className="bg-primary text-on-primary px-10 py-5 font-label text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all">
                Explore Menu
              </button>
            </motion.div>
          </div>
        </section>

        {/* Reservation CTA */}
        <section className="py-24 md:py-32 bg-primary">
          <div className="container mx-auto px-6 md:px-12 text-center text-on-primary">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto space-y-10"
            >
              <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tight leading-[0.95]">
                Reserve Your Table Today
              </h2>
              <p className="text-lg opacity-80 font-light max-w-lg mx-auto leading-relaxed">
                Experience the zenith of Japanese dining. Limited seatings available for our nightly Omakase experience.
              </p>
              <button className="bg-surface text-primary px-12 py-6 font-label text-sm font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all">
                Make a Reservation
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-20 px-6 md:px-12 bg-surface-container-highest grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="text-3xl font-black text-on-surface font-headline uppercase tracking-tighter">
            KUROHANA
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs font-light">
            Crafting moments of culinary zen through the art of precision sushi.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-surface rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-surface rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="font-headline text-secondary font-bold uppercase tracking-widest text-[10px]">The Studio</h5>
          <ul className="space-y-4 text-on-surface-variant text-sm font-light">
            <li>Address: Los Angeles, CA</li>
            <li>Contact: (213) 555-0198</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="font-headline text-secondary font-bold uppercase tracking-widest text-[10px]">Quick Links</h5>
          <ul className="space-y-4 text-on-surface-variant text-sm font-light">
            <li><a href="#" className="hover:text-primary transition-colors">Menu</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Reservations</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Gallery</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="font-headline text-secondary font-bold uppercase tracking-widest text-[10px]">Availability</h5>
          <ul className="space-y-4 text-on-surface-variant text-sm font-light">
            <li>Hours: 5PM - 11PM</li>
            <li className="pt-4 border-t border-on-surface/10 text-[10px] uppercase tracking-widest">
              © 2024 KUROHANA SUSHI HOUSE. ALL RIGHTS RESERVED.
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
