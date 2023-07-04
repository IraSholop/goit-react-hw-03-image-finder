import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ click }) => {
  return (
    <button type="button" className={css.button} onClick={click}>
      Load more
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func
}