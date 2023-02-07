import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const classNames = require('classnames');

const Modal = ({ children, onClose, header, isOpen}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={classNames(styles.wrapper, isOpen && styles.opened)}>
      <div className={classNames('pt-10 pl-10 pr-10', styles.modal)}>
        <div className={styles.header}>
          <h1 className={classNames('text text_type_main-medium', !header && styles.hide)}>
            Детали ингредиента
          </h1>

          <CloseIcon
            type='primary'
            className={styles.close}
            onClick={() => handleClose()}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
