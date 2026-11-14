import styles from './styles.module.css';
import radar from '@/assets/images/radar.svg';
import StatusBar from '@/components/StatusBar/StatusBar.tsx';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useStore.ts';
import { planesSelectors } from '@/store/slices/planes.ts';
import Button from '@/components/Button/Button.tsx';
import clsx from 'clsx';
import { retryClicked } from '@/store/actions.ts';

const MapHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const planesCount = useAppSelector(planesSelectors.selectTotal);
    const status = useAppSelector((state) => state.connection.status);
    const attempt = useAppSelector((state) => state.connection.attempt);

    return (
        <header className={clsx('glass', styles.header)}>
            <div className={styles.headerItem}>
                <img className={styles.icon} src={radar} alt="logo" />
                <span className={styles.title}>Flight Radar</span>
            </div>
            <div className={styles.headerItem}>
                <StatusBar status={status} attempt={attempt} />
            </div>
            {planesCount > 0 && (
                <div className={styles.headerItem}>
                    <span className={styles.planesCounter}>{planesCount} planes</span>
                </div>
            )}

            {status === 'closed' && (
                <div className={styles.headerItem}>
                    <Button type="button" onClick={() => dispatch(retryClicked())}>
                        Retry
                    </Button>
                </div>
            )}
        </header>
    );
};

export default MapHeader;
