import styles from './styles.module.css';
import Alert from '@/components/Alert/Alert.tsx';
import StatusDot from '@/components/StatusDot/StatusDot.tsx';
import { useAppSelector } from '@/lib/hooks/useStore.ts';

const MapReconnectingAlert: React.FC = () => {
    const status = useAppSelector((state) => state.connection.status);
    if (status === 'open') {
        return null;
    }
    return (
        <Alert>
            <div className={styles.title}>
                <StatusDot status={status} />
                {status === 'connecting' || status === 'reconnecting' ? 'Looking for planes...' : 'No connection'}
            </div>
        </Alert>
    );
};

export default MapReconnectingAlert;
