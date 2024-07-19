import Spinner from '../components/Spinner';
import Message from '../components/Message';
import CountryItem from './CountryItem';

import styles from './CountryList.module.css';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }

  const countriesMap = new Map([
    ...cities.map((city) => [
      city.country,
      { country: city.country, emoji: city.emoji },
    ]),
  ]);

  return (
    !isLoading && (
      <ul className={styles.countryList}>
        {[...countriesMap.values()].map((country) => (
          <CountryItem key={country.country} country={country} />
        ))}
      </ul>
    )
  );
}

export default CountryList;
