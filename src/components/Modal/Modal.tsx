import * as ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {IOrderPayload} from '../../types/ingredientsTypes';
const classNames = require('classnames');
const portal = document.getElementById('modals');

interface IModalProps {
  children?: ReactNode;
  onClose: () => void;
  title?: string;
  objectInStore: IOrderPayload | object | null;
}

interface KeyboardEvent {
  code: string;
}

const Modal: FC<IModalProps> = ({
  children,
  onClose,
  objectInStore,
  title,
}) => {
  const handleCloseByEsc = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleCloseByEsc);
    return () => window.removeEventListener('keyup', handleCloseByEsc);
  });

  return ReactDOM.createPortal(
    <div
      className={classNames(
        styles.wrapper,
        !objectInStore && styles.hiddenWrapper,
      )}
    >
      <ModalOverlay onClose={onClose} isOpen={!!objectInStore} />
      <div
        className={classNames(
          'pt-10 pl-10 pr-10',
          styles.modal,
          objectInStore && styles.opened,
        )}
      >
        <div className={styles.header}>
          <h1
            className={classNames(
              'text text_type_main-medium',
              styles.text,
              !title && styles.hide,
            )}
          >
            {title}
          </h1>

          <CloseIcon type='primary' onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    portal!,
  );
};

export default Modal;