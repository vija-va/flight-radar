import styles from './styles.module.css';
import clsx from 'clsx';

const Alert: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={clsx('glass', styles.modal)}>{children}</div>;
};

export default Alert;
