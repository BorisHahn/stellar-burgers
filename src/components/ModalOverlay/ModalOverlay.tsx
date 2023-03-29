import { FC } from 'react';
import style from './ModalOverlay.module.css';
const classNames = require('classnames');

interface IModalOverlayProps {
  onClose: () => void;
  isOpen: boolean;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose, isOpen }) => {
  return (
    <div
      className={classNames(isOpen && style.overlay)}
      onClick={() => onClose()}
    ></div>
  );
};

export default ModalOverlay;
