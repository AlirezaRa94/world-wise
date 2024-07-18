import propTypes from 'prop-types';

import styles from './Button.module.css';

Button.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  type: propTypes.oneOf(['primary', 'back', 'position']),
};

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
