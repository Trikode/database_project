import React, { useEffect, useState } from 'react';

const MostVisitedContent = () => {
  const [mostVisitedContent, setMostVisitedContent] = useState([]);

  useEffect(() => {
    // Questo aggiorna il conteggio delle visite
    const updateVisitCount = async (contentId) => {
      try {
        await fetch(`/api/content/${contentId}/visit`, { method: 'POST' });
      } catch (error) {
        console.error(error);
      }
    };

    // Questo recupera gli oggetti più visitati
    const fetchMostVisitedContent = async () => {
      try {
        const response = await fetch('/api/most-visited');
        const data = await response.json();
        setMostVisitedContent(data);
      } catch (error) {
        console.error(error);
      }
    };

    /*
    // Simula una visita a un contenuto specifico
    const simulateContentVisit = async () => {
      // Sostituisci 'contentId' con l'ID effettivo del contenuto visitato
      const contentId = 1;
      await updateVisitCount(contentId);
      fetchMostVisitedContent();
    };

    // Simula una visita iniziale per ottenere i contenuti più visitati all'avvio
    simulateContentVisit();
    */
  }, []);

  return (
    <div>
      <h2>Contenuti più visitati</h2>
      <ul>
        {mostVisitedContent.map((content) => (
          <li key={content.id_product}>
            {content.name} - Visite: {content.visit_count}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MostVisitedContent;
