import style from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
const classNames = require('classnames');

const ModalOverlay = ({ isOpen, onClose }) => {
  return (
    <div
      className={classNames(isOpen && style.overlay)}
      onClick={() => onClose()}
    ></div>
  );
};

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalOverlay;
