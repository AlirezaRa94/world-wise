import propTypes from 'prop-types';

CityItem.propTypes = {
  city: propTypes.object.isRequired,
};

function CityItem({ city }) {
  return <li>{city.cityName}</li>;
}

export default CityItem;
