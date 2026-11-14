import type { SocketStatus } from '@/types.ts';
import clsx from 'clsx';
import styles from './styles.module.css';

const StatusDot: React.FC<{ status: SocketStatus }> = ({ status }) => {
    return <span className={clsx(styles.dot, styles[status])} />;
};

export default StatusDot;
