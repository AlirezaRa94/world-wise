import { createContext, useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';

const URL = 'http://localhost:3001';

CitiesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const response = await fetch(`${URL}/cities`);
        const data = await response.json();

        setCities(data);
      } catch {
        alert('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { CitiesProvider, useCities };
