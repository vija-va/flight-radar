import type { ComponentProps } from 'react';
import styles from './styles.module.css';

const Button: React.FC<ComponentProps<'button'>> = ({ children, ...rest }) => {
    return (
        <button {...rest} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
