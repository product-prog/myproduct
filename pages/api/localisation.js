export default function handler(req, res) {
  if (req.method === "POST") {
    // Gestion des nouvelles localisations
    try {
      const { latitude, longitude, userId } = req.body;

      // Validation des données
      if (!latitude || !longitude || !userId) {
        return res.status(400).json({
          message: "Données manquantes",
          error: "latitude, longitude et userId sont requis",
        });
      }

      // Log des données reçues (pour debug)
      console.log("📍 Localisation reçue:", {
        userId,
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
      });

      // Ici vous pouvez ajouter votre logique métier
      // Par exemple : sauvegarder en base, envoyer un email, etc.

      // Réponse de succès
      res.status(200).json({
        success: true,
        message: "Localisation enregistrée avec succès",
        data: {
          userId,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("❌ Erreur API localisation:", error);
      res.status(500).json({
        message: "Erreur serveur",
        error: error.message,
      });
    }
  } else if (req.method === "GET") {
    // Récupération des localisations
    try {
      // Ici vous devriez récupérer les vraies données depuis votre base de données
      // Pour l'exemple, je retourne des données fictives
      const localisations = [
        {
          userId: "user-123",
          positions: [
            {
              latitude: 48.8566,
              longitude: 2.3522,
              timestamp: "2024-01-15 14:30:00",
            },
            {
              latitude: 48.8566,
              longitude: 2.3522,
              timestamp: "2024-01-15 14:35:00",
            },
          ],
        },
        {
          userId: "user-456",
          positions: [
            {
              latitude: 43.2965,
              longitude: 5.3698,
              timestamp: "2024-01-15 15:00:00",
            },
          ],
        },
      ];

      res.status(200).json(localisations);
    } catch (error) {
      console.error("❌ Erreur récupération localisations:", error);
      res.status(500).json({
        message: "Erreur serveur",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
