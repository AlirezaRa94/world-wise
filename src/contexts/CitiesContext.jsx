import { createContext, useContext, useEffect, useState } from "react";
import propTypes from "prop-types";

const URL = "http://localhost:3001";

CitiesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const response = await fetch(`${URL}/cities`);
        const data = await response.json();

        setCities(data);
      } catch {
        alert("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch {
      alert("Failed to fetch the city data!");
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(city) {
    try {
      setIsLoading(true);

      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("Failed to add the city!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, addCity, currentCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
