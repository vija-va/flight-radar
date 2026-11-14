import clsx from 'clsx';
import styles from './styles.module.css';
import type { VerticalDirection } from '@/types.ts';

interface VerticalSpeedIconProps {
    direction: VerticalDirection;
}

const VerticalSpeedIcon: React.FC<VerticalSpeedIconProps> = ({ direction }) => {
    return (
        <svg
            className={clsx(styles.icon, styles[direction])}
            width="14"
            height="14"
            viewBox="0 0 12 12"
            aria-hidden="true"
        >
            <path
                d={direction === 'level' ? 'M2 6h8' : 'M6 10V2.5M2.8 5.5L6 2.3l3.2 3.2'}
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default VerticalSpeedIcon;
