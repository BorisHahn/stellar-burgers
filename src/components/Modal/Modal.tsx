import * as ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { IOrderPayload } from '../../types/ingredientsTypes';
import { IOrderItem } from '../../types/ordersTypes';
const classNames = require('classnames');
const portal = document.getElementById('modals');

interface IModalProps {
  children?: ReactNode;
  onClose: () => void;
  title?: string;
  objectInStore?: IOrderPayload | object | null;
  currentObject?: IOrderItem | object;
}

interface KeyboardEvent {
  code: string;
}

const Modal: FC<IModalProps> = ({
  children,
  onClose,
  objectInStore,
  currentObject,
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
        !(currentObject || objectInStore) && styles.hiddenWrapper,
      )}
    >
      <ModalOverlay onClose={onClose} isOpen={!!(currentObject || objectInStore)} />
      <div
        className={classNames(
          'pt-10 pl-10 pr-10',
          styles.modal,
          (currentObject || objectInStore) && styles.opened,
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
