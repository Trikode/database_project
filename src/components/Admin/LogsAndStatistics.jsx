import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAccessLogs = ({ userId }) => {
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    const fetchAccessLogs = async () => {
      try {
        const response = await axios.get(`/api/access-logs/user/${userId}`);
        setAccessLogs(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei log di accesso:', error);
      }
    };

    fetchAccessLogs();
  }, [userId]);

  return (
    <div>
      <h2>Log di accesso per l'utente {userId}</h2>
      {accessLogs.map((log) => (
        <div key={log.id_log}>
          <p>Data e ora: {log.timestamp}</p>
          {/* Altre informazioni dei log */}
        </div>
      ))}
    </div>
  );
};

const AppStatistics = () => {
  const [accessLogs, setAccessLogs] = useState([]);

  useEffect(() => {
    const fetchAccessLogs = async () => {
      try {
        const response = await axios.get('/api/access-logs');
        setAccessLogs(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei log di accesso:', error);
      }
    };

    fetchAccessLogs();
  }, []);

  const totalAccesses = accessLogs.length;

  return (
    <div>
      <h2>Statistiche dell'applicazione</h2>
      <p>Numero totale di accessi: {totalAccesses}</p>
      {/* Altre statistiche */}
    </div>
  );
};

const LogsAndStatistics = () => {
  const userId = 123; // ID dell'utente desiderato

  return (
    <div>
      <UserAccessLogs userId={userId} />
      <AppStatistics />
    </div>
  );
};

export default LogsAndStatistics;