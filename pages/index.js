import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Shield,
  Crown,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Play,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Eye,
  Lock,
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);

      // Intersection Observer for fade-in animations
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element, index) => {
        const elementTop =
          element.getBoundingClientRect().top + window.pageYOffset;
        const elementVisible = 150;

        if (scrolled > elementTop - window.innerHeight + elementVisible) {
          setIsVisible((prev) => ({ ...prev, [index]: true }));
        }
      });
    };

    // Smooth scrolling for navigation links
    const handleNavClick = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleNavClick);

    // Initial check for elements in view
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleNavClick);
    };
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Contenu Exclusif",
      description: "Accès à du contenu privé et personnalisé",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "100% Discret",
      description: "Confidentialité totale garantie",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Accès Immédiat",
      description: "Contenu disponible instantanément",
    },
  ];

  const testimonials = [
    {
      text: "Une expérience absolument incroyable. Le contenu est de qualité exceptionnelle.",
      author: "Alex M.",
      rating: 5,
      verified: true,
    },
    {
      text: "Discrétion parfaite et contenu premium. Exactement ce que je cherchais.",
      author: "Thomas L.",
      rating: 5,
      verified: true,
    },
    {
      text: "Service professionnel et contenu de haute qualité. Très satisfait.",
      author: "Marc D.",
      rating: 5,
      verified: true,
    },
  ];

  const pricing = {
    originalPrice: "199€",
    currentPrice: "99€",
    savings: "50% OFF",
    features: [
      "Accès complet au contenu exclusif",
      "Vidéos HD en qualité premium",
      "Photos privées haute résolution",
      "Contenu mis à jour régulièrement",
      "Support prioritaire",
      "Accès à vie",
    ],
  };

  return (
    <>
      <Head>
        <title>DivineSensual - Contenu Exclusif Premium</title>
        <meta
          name="description"
          content="Découvrez un univers de contenu exclusif et privé de haute qualité"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="font-playfair text-2xl font-bold text-white">
                Divine<span className="text-pink-400">Sensual</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a
                  href="#hero"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  Accueil
                </a>
                <a
                  href="#features"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  Avantages
                </a>
                <a
                  href="#pricing"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  Tarifs
                </a>
                <a
                  href="#testimonials"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  Avis
                </a>
              </div>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-2">
                <a
                  href="#hero"
                  className="block py-2 text-white hover:text-pink-400 transition-colors"
                >
                  Accueil
                </a>
                <a
                  href="#features"
                  className="block py-2 text-white hover:text-pink-400 transition-colors"
                >
                  Avantages
                </a>
                <a
                  href="#pricing"
                  className="block py-2 text-white hover:text-pink-400 transition-colors"
                >
                  Tarifs
                </a>
                <a
                  href="#testimonials"
                  className="block py-2 text-white hover:text-pink-400 transition-colors"
                >
                  Avis
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="hero"
          className="hero-section flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/30 to-pink-900/50 z-10" />
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20' />

          <div className="container mx-auto px-6 text-center text-white z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
                <span className="text-sm font-medium">
                  Contenu Exclusif Premium
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Découvrez Mon
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Univers Privé
              </span>
            </motion.h1>

            <motion.p
              className="font-inter text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Accédez à du contenu exclusif et privé de haute qualité, créé
              spécialement pour vous. Une expérience unique et mémorable vous
              attend.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button className="cta-button group">
                <span>Accéder Maintenant</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="video-preview-button"
                onClick={() => setVideoPlaying(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Voir l&apos;Aperçu
              </button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                <span>100% Discret</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                <span>Accès Immédiat</span>
              </div>
              <div className="flex items-center">
                <Crown className="w-4 h-4 mr-2 text-pink-400" />
                <span>Contenu Premium</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="container mx-auto px-6">
            <motion.div
              className={`text-center mb-16 fade-in ${
                isVisible[0] ? "visible" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
                Pourquoi Choisir{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Mon Contenu
                </span>
              </h2>
              <p className="font-inter text-xl text-gray-400 max-w-2xl mx-auto">
                Une expérience unique et personnalisée qui dépasse toutes vos
                attentes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`feature-card fade-in ${
                    isVisible[1 + index] ? "visible" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="container mx-auto px-6">
            <motion.div
              className={`text-center mb-16 fade-in ${
                isVisible[4] ? "visible" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
                Accès{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Premium
                </span>
              </h2>
              <p className="font-inter text-xl text-gray-400 max-w-2xl mx-auto">
                Offre limitée - Ne manquez pas cette opportunité exclusive
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="pricing-card relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-pink-500 to-purple-500 text-white px-4 py-2 rounded-bl-lg font-bold">
                  {pricing.savings}
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl text-gray-400 line-through mr-4">
                      {pricing.originalPrice}
                    </span>
                    <span className="text-5xl font-bold text-white">
                      {pricing.currentPrice}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Accès à vie - Pas de renouvellement
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {pricing.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="cta-button w-full text-lg py-4">
                  <span>Accéder Maintenant</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    🔒 Paiement sécurisé • ⚡ Accès immédiat • 🛡️ Garantie 30
                    jours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="container mx-auto px-6">
            <motion.div
              className={`text-center mb-16 fade-in ${
                isVisible[5] ? "visible" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
                Ce Qu&apos;en Disent{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Mes Membres
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`testimonial-card fade-in ${
                    isVisible[6 + index] ? "visible" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="font-inter text-gray-300 mb-6 italic leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-inter font-semibold text-white">
                      {testimonial.author}
                    </div>
                    {testimonial.verified && (
                      <div className="flex items-center text-green-400 text-sm">
                        <Check className="w-4 h-4 mr-1" />
                        Vérifié
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-white">
                Prêt à Découvrir Mon{" "}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Univers Privé
                </span>
                ?
              </h2>
              <p className="font-inter text-xl text-gray-300 mb-8 leading-relaxed">
                Rejoignez des milliers de membres satisfaits et accédez à du
                contenu exclusif de haute qualité.
                <br />
                <span className="text-pink-400 font-semibold">
                  Offre limitée - Ne manquez pas cette opportunité !
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="cta-button text-xl py-4 px-8">
                  <span>Accéder Maintenant - {pricing.currentPrice}</span>
                  <ArrowRight className="w-6 h-6 ml-3" />
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    🔒 Paiement 100% sécurisé
                  </p>
                  <p className="text-sm text-gray-400">
                    ⚡ Accès immédiat après paiement
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="font-playfair text-2xl font-bold text-white mb-4">
                Divine<span className="text-pink-400">Sensual</span>
              </div>
              <div className="section-divider"></div>
              <div className="flex flex-wrap justify-center space-x-8 text-gray-400 font-inter">
                <a href="#" className="hover:text-white transition-colors">
                  Mentions Légales
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Politique de Confidentialité
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Conditions d&apos;Utilisation
                </a>
              </div>
              <div className="mt-8 text-gray-500 font-inter">
                © 2024 DivineSensual. Tous droits réservés.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
