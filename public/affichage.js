async function recupererLocalisations() {
  try {
    const response = await fetch("/api/localisation");
    if (!response.ok) throw new Error("Erreur de récupération des données");

    const localisations = await response.json();

    // Vérification que les données sont au bon format
    if (!Array.isArray(localisations)) {
      throw new Error("Format des données incorrect");
    }

    // Regroupement des positions par utilisateur
    const positionsParUtilisateur = localisations.reduce((acc, loc) => {
      const { userId, positions } = loc;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(...positions);
      return acc;
    }, {});

    // Création du tableau HTML
    let html = `
            <table>
                <thead>
                    <tr>
                        <th>Utilisateur</th>
                        <th>Positions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

    for (const [userId, positions] of Object.entries(positionsParUtilisateur)) {
      html += `
                <tr>
                    <td>
                        <div class="user-id">${userId}</div>
                    </td>
                    <td>
                        <div class="positions-list">
            `;

      positions.forEach((position, index) => {
        html += `
                    <div class="position-item">
                        <span class="coordinates">Position ${index + 1}: ${
          position.latitude
        }, ${position.longitude}</span>
                    </div>
                `;
      });

      html += `
                        </div>
                    </td>
                    <td>
                        <div class="positions-actions">
            `;

      positions.forEach((position) => {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}`;
        const googleMapsUrl = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`;

        html += `
                    <div class="position-item">
                        <div class="btn-group">
                            <a href="${nominatimUrl}" target="_blank" class="btn btn-info">
                                <i class="fas fa-info-circle"></i> Voir infos
                            </a>
                            <a href="${googleMapsUrl}" target="_blank" class="btn btn-success">
                                <i class="fas fa-map-marked-alt"></i> Voir sur Maps
                            </a>
                        </div>
                    </div>
                `;
      });

      html += `
                        </div>
                    </td>
                </tr>
            `;
    }

    html += `
                </tbody>
            </table>
        `;

    document.getElementById("positions").innerHTML = html;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération :", error);
    document.getElementById("positions").innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i> Impossible de charger les localisations.
            </div>
        `;
  }
}

// Mise à jour automatique toutes les 3 secondes
setInterval(recupererLocalisations, 3000);

// Chargement initial
recupererLocalisations();
