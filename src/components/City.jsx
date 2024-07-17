import { useParams } from 'react-router-dom';

import styles from './City.module.css';

function City() {
  const { cityId } = useParams();

  return (
    <div className={styles.city}>
      <h2>{cityId}</h2>
    </div>
  );
}

export default City;
