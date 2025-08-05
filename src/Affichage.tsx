import { useEffect, useState } from 'react';

interface Position {
  latitude: number;
  longitude: number;
}

interface UserPositions {
  userId: string;
  positions: Position[];
}

export default function Affichage() {
  const [localisations, setLocalisations] = useState<UserPositions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recupererLocalisations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/localisation");
      if (!response.ok) throw new Error("Erreur de récupération des données");

      const data = await response.json();

      // Vérification que les données sont au bon format
      if (!Array.isArray(data)) {
        throw new Error("Format des données incorrect");
      }

      setLocalisations(data);
      setError(null);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération :", error);
      setError("Impossible de charger les localisations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recupererLocalisations();
    
    // Mise à jour automatique toutes les 3 secondes
    const interval = setInterval(recupererLocalisations, 3000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        margin: '0',
        padding: '20px',
        backgroundColor: '#f5f7fa',
        color: '#212529',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#3f37c9',
            fontWeight: '600'
          }}>
            Positions des utilisateurs
          </h1>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: '30px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6c757d',
              fontSize: '1.1em'
            }}>
              ⏳ Chargement des positions...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        margin: '0',
        padding: '20px',
        backgroundColor: '#f5f7fa',
        color: '#212529',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#3f37c9',
            fontWeight: '600'
          }}>
            Positions des utilisateurs
          </h1>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: '30px'
          }}>
            <div style={{
              color: '#dc3545',
              textAlign: 'center',
              padding: '20px'
            }}>
              ⚠️ {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regroupement des positions par utilisateur (similaire au code original)
  const positionsParUtilisateur = localisations.reduce((acc: {[key: string]: Position[]}, loc) => {
    const { userId, positions } = loc;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(...positions);
    return acc;
  }, {});

  return (
    <div style={{ 
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      margin: '0',
      padding: '20px',
      backgroundColor: '#f5f7fa',
      color: '#212529',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#3f37c9',
          fontWeight: '600'
        }}>
          Positions des utilisateurs
        </h1>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead style={{
              backgroundColor: '#4361ee',
              color: 'white'
            }}>
              <tr>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  fontWeight: '500'
                }}>
                  Utilisateur
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  fontWeight: '500'
                }}>
                  Positions
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  fontWeight: '500'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(positionsParUtilisateur).map(([userId, positions]) => (
                <tr key={userId} style={{
                  borderBottom: '1px solid #e0e0e0',
                  transition: 'background-color 0.2s'
                }}>
                  <td style={{
                    padding: '12px 15px',
                    verticalAlign: 'top'
                  }}>
                    <div style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '0.9em',
                      color: '#6c757d'
                    }}>
                      {userId}
                    </div>
                  </td>
                  <td style={{
                    padding: '12px 15px',
                    verticalAlign: 'top'
                  }}>
                    <div>
                      {positions.map((position, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: index < positions.length - 1 ? '1px dashed #e0e0e0' : 'none'
                        }}>
                          <span style={{
                            fontFamily: '"Courier New", Courier, monospace',
                            marginRight: '10px'
                          }}>
                            Position {index + 1}: {position.latitude}, {position.longitude}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: '12px 15px',
                    verticalAlign: 'top'
                  }}>
                    <div>
                      {positions.map((position, index) => (
                        <div key={index} style={{
                          padding: '8px 0',
                          borderBottom: index < positions.length - 1 ? '1px dashed #e0e0e0' : 'none'
                        }}>
                          <div style={{
                            display: 'flex',
                            gap: '8px'
                          }}>
                            <a 
                              href={`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '0.85em',
                                cursor: 'pointer',
                                border: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.2s',
                                textDecoration: 'none',
                                backgroundColor: '#17a2b8',
                                color: 'white'
                              }}
                            >
                              ℹ️ Voir infos
                            </a>
                            <a 
                              href={`https://www.google.com/maps?q=${position.latitude},${position.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '0.85em',
                                cursor: 'pointer',
                                border: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.2s',
                                textDecoration: 'none',
                                backgroundColor: '#4bb543',
                                color: 'white'
                              }}
                            >
                              🗺️ Voir sur Maps
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {Object.keys(positionsParUtilisateur).length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6c757d',
              fontSize: '1.1em'
            }}>
              Aucune position enregistrée pour le moment.
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #4361ee, #4895ef)',
              color: 'white',
              padding: '1rem 2.5rem',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(67, 97, 238, 0.4)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              marginTop: '1rem'
            }}
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}