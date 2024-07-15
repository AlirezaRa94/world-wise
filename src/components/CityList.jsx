import propTypes from 'prop-types';

import Spinner from '../components/Spinner';
import Message from '../components/Message';
import CityItem from './CityItem';

import styles from './CityList.module.css';

CityList.propTypes = {
  cities: propTypes.array.isRequired,
  isLoading: propTypes.bool.isRequired,
};

function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    );
  }

  return (
    !isLoading && (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    )
  );
}

export default CityList;
