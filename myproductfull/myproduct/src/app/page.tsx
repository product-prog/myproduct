'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, Shield, Crown, Mail, Phone, Instagram, Twitter } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);

      // Intersection Observer for fade-in animations
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const elementVisible = 150;
        
        if (scrolled > elementTop - window.innerHeight + elementVisible) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
        }
      });
    };

    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleNavClick);
    
    // Initial check for elements in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  const services = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Contenu Exclusif Premium",
      description: "Accédez à du contenu unique et personnalisé, créé spécialement pour vous.",
      price: "À partir de 49€"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Sessions Personnalisées",
      description: "Réservez une session privée adaptée à vos désirs et préférences.",
      price: "Sur devis"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Expérience VIP",
      description: "Profitez d'un accès privilégié et d'une attention particulière.",
      price: "À partir de 199€"
    }
  ];

  const testimonials = [
    {
      text: "Une expérience absolument exceptionnelle. Le professionnalisme et l'élégance sont au rendez-vous.",
      author: "Client Satisfait",
      rating: 5
    },
    {
      text: "Un service de qualité supérieure avec une attention aux détails remarquable.",
      author: "Membre VIP",
      rating: 5
    },
    {
      text: "Discrétion, qualité et sophistication. Exactement ce que je recherchais.",
      author: "Client Premium",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-playfair text-2xl font-bold text-white">
              Divine<span className="rose-gold-accent">Sensual</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-white hover:text-[#E8B4A0] transition-colors">Accueil</a>
              <a href="#apropos" className="text-white hover:text-[#E8B4A0] transition-colors">À Propos</a>
              <a href="#services" className="text-white hover:text-[#E8B4A0] transition-colors">Services</a>
              <a href="#contact" className="text-white hover:text-[#E8B4A0] transition-colors">Contact</a>
            </div>
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <a href="#accueil" className="block py-2 text-white hover:text-[#E8B4A0] transition-colors">Accueil</a>
              <a href="#apropos" className="block py-2 text-white hover:text-[#E8B4A0] transition-colors">À Propos</a>
              <a href="#services" className="block py-2 text-white hover:text-[#E8B4A0] transition-colors">Services</a>
              <a href="#contact" className="block py-2 text-white hover:text-[#E8B4A0] transition-colors">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="hero-section flex items-center justify-center">
        <Image 
          src="/hero-image.jpg" 
          alt="Hero" 
          fill
          className="hero-bg object-cover"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          priority
        />
        <div className="container mx-auto px-6 text-center text-white z-10">
          <motion.h1 
            className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-shadow-glamour"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Élégance & <span className="rose-gold-accent">Sensualité</span>
          </motion.h1>
          <motion.p 
            className="font-inter text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Découvrez un univers de raffinement et d&apos;exclusivité, où chaque moment devient une expérience inoubliable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="glamour-btn font-inter text-lg mr-4 mb-4">
              Découvrir l&apos;Exclusivité
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-inter hover:bg-white hover:text-black transition-all">
              En Savoir Plus
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`fade-in ${isVisible[0] ? 'visible' : ''}`}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Une Approche <span className="rose-gold-accent">Unique</span>
              </h2>
              <p className="font-inter text-lg text-gray-700 mb-6 leading-relaxed">
                Avec des années d&apos;expérience dans l&apos;art de la séduction et du glamour, 
                je vous offre une expérience personnalisée qui dépasse toutes vos attentes. 
                Chaque interaction est pensée pour créer des moments d&apos;exception.
              </p>
              <p className="font-inter text-lg text-gray-700 mb-8 leading-relaxed">
                Ma philosophie repose sur trois piliers : l&apos;élégance, la discrétion et 
                l&apos;authenticité. Je crois que la vraie beauté réside dans la confiance 
                et l&apos;expression de soi.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold rose-gold-accent">500+</div>
                  <div className="font-inter text-sm text-gray-600">Clients Satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold rose-gold-accent">5★</div>
                  <div className="font-inter text-sm text-gray-600">Note Moyenne</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold rose-gold-accent">100%</div>
                  <div className="font-inter text-sm text-gray-600">Discrétion</div>
                </div>
              </div>
            </div>
            <div className={`fade-in ${isVisible[1] ? 'visible' : ''}`}>
              <Image 
                src="/about-image.jpg" 
                alt="À Propos" 
                width={600}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 glamour-gradient">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 fade-in ${isVisible[2] ? 'visible' : ''}`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
              Services <span className="rose-gold-accent">Premium</span>
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto">
              Chaque service est conçu pour vous offrir une expérience unique et mémorable, 
              dans le plus grand respect de votre intimité.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`glamour-card p-8 rounded-lg text-center fade-in ${isVisible[3 + index] ? 'visible' : ''}`}
              >
                <div className="rose-gold-accent mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="font-inter text-gray-300 mb-6">
                  {service.description}
                </p>
                <div className="font-playfair text-xl font-bold rose-gold-accent mb-4">
                  {service.price}
                </div>
                <button className="glamour-btn w-full">
                  Réserver Maintenant
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 champagne-bg">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 fade-in ${isVisible[6] ? 'visible' : ''}`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Témoignages <span className="rose-gold-accent">Clients</span>
            </h2>
            <p className="font-inter text-xl text-gray-700 max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience avec nous.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-lg shadow-lg fade-in ${isVisible[7 + index] ? 'visible' : ''}`}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-[#E8B4A0]" />
                  ))}
                </div>
                <p className="font-inter text-gray-700 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="font-inter font-semibold text-gray-900">
                  — {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 glamour-gradient">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 fade-in ${isVisible[10] ? 'visible' : ''}`}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
              Prêt à Vivre <span className="rose-gold-accent">l&apos;Exception</span> ?
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Contactez-moi dès maintenant pour discuter de vos désirs et réserver votre expérience personnalisée.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`fade-in ${isVisible[11] ? 'visible' : ''}`}>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Votre Nom" 
                    className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#E8B4A0]"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Votre Email" 
                    className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#E8B4A0]"
                  />
                </div>
                <div>
                  <select className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8B4A0]">
                    <option value="">Choisir un Service</option>
                    <option value="premium">Contenu Exclusif Premium</option>
                    <option value="session">Session Personnalisée</option>
                    <option value="vip">Expérience VIP</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    rows={4} 
                    placeholder="Votre Message" 
                    className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-[#E8B4A0]"
                  ></textarea>
                </div>
                <button type="submit" className="glamour-btn w-full text-lg">
                  Envoyer le Message
                </button>
              </form>
            </div>
            
            <div className={`fade-in ${isVisible[12] ? 'visible' : ''}`}>
              <div className="space-y-8">
                <div className="flex items-center space-x-4 text-white">
                  <Mail className="w-6 h-6 text-[#E8B4A0]" />
                  <div>
                    <div className="font-inter font-semibold">Email</div>
                    <div className="text-gray-300">contact@divinesensual.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <Phone className="w-6 h-6 text-[#E8B4A0]" />
                  <div>
                    <div className="font-inter font-semibold">Téléphone</div>
                    <div className="text-gray-300">+33 1 23 45 67 89</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-white">
                  <Shield className="w-6 h-6 text-[#E8B4A0]" />
                  <div>
                    <div className="font-inter font-semibold">Confidentialité</div>
                    <div className="text-gray-300">100% Discrétion Garantie</div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="font-inter font-semibold text-white mb-4">Suivez-moi</div>
                  <div className="flex space-x-4">
                    <Instagram className="w-8 h-8 text-white hover:text-[#E8B4A0] cursor-pointer transition-colors" />
                    <Twitter className="w-8 h-8 text-white hover:text-[#E8B4A0] cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="font-playfair text-2xl font-bold text-white mb-4">
              Divine<span className="rose-gold-accent">Sensual</span>
            </div>
            <div className="section-divider"></div>
            <div className="flex flex-wrap justify-center space-x-8 text-gray-400 font-inter">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions d&apos;Utilisation</a>
            </div>
            <div className="mt-8 text-gray-500 font-inter">
              © 2024 DivineSensual. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

