// Générer un identifiant unique si ce n'est pas déjà fait
const userId = localStorage.getItem("userId") || crypto.randomUUID();
if (!localStorage.getItem("userId")) {
  localStorage.setItem("userId", userId); // Sauvegarde l'ID unique pour les prochaines visites
}

function verifierPermissionGeolocalisation() {
  if (!navigator.permissions) {
    showTempMessage("⚠️ Impossible de vérifier les permissions", "error");
    return;
  }

  navigator.permissions
    .query({ name: "geolocation" })
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
            "error."
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
}

function obtenirPosition() {
  const btn = document.querySelector(".cta-button");
  const btnOriginalText = btn.textContent; // Sauvegarde le texte original
  btn.disabled = true;
  btn.textContent = "⌛ Traitement en cours...";
  btn.style.opacity = "0.8"; // Effet visuel de désactivation

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
}

// Fonctions utilitaires
function resetButton(btn, originalText) {
  btn.textContent = originalText;
  btn.disabled = false;
  btn.style.opacity = "1";
}

function showTempMessage(message, type) {
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
}

// Ajout des animations CSS dynamiquement
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; top: 0; } to { opacity: 1; top: 20px; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);
