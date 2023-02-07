import style from './ModalOverlay.module.css';
const classNames = require('classnames');

const ModalOverlay = ({ isOpen }) => {
  return <div className={classNames(isOpen && style.overlay)}></div>;
};

export default ModalOverlay;
