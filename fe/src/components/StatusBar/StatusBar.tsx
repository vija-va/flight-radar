import styles from './styles.module.css';
import clsx from 'clsx';
import { SOCKET_LABELS } from '@/lib/constants.ts';
import StatusDot from '@/components/StatusDot/StatusDot.tsx';
import type { SocketStatus } from '@/types.ts';

interface StatusBarProps {
    status: SocketStatus;
    attempt: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ status, attempt }) => {
    return (
        <div className={styles.statusBar}>
            <StatusDot status={status} />
            <span className={clsx(styles.label, styles[status])}>
                {SOCKET_LABELS[status]} {status === 'reconnecting' && `(try ${attempt})`}
            </span>
        </div>
    );
};

export default StatusBar;
