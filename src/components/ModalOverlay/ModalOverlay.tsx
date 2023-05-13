import { FC } from 'react';
import style from './ModalOverlay.module.css';
const classNames = require('classnames');

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return (
    <div className={classNames(style.overlay)} onClick={() => onClose()}></div>
  );
};

export default ModalOverlay;
