import { useParams, useSearchParams } from 'react-router-dom';

import styles from './City.module.css';

function City() {
  const { cityId } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.city}>
      <h2>{cityId}</h2>
      <p>
        Position: {lat}, {lng}
      </p>
    </div>
  );
}

export default City;
