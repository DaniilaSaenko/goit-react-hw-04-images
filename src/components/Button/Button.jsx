import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <LoadMore type="button" onClick={onClick}>
    Load more
  </LoadMore>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
