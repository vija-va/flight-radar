import styles from './styles.module.css';
import { formatNumber, getRatio } from '@/lib/utils.ts';
import Skeleton from '@/components/Skeleton/Skeleton.tsx';

interface DetailsPanelPassengersProps {
    loading: boolean;
    passengers?: number;
    maxPassengers?: number;
}

const DetailsPanelPassengers: React.FC<DetailsPanelPassengersProps> = ({ loading, passengers, maxPassengers }) => {
    const load = getRatio(passengers, maxPassengers);
    const barStyle = { '--load': load } as React.CSSProperties;

    return (
        <div className={styles.passengers}>
            <div className={styles.value}>
                {loading ? (
                    <Skeleton width={160} height={18} />
                ) : (
                    <>
                        {formatNumber(passengers)}
                        <span>/ {formatNumber(maxPassengers)} passengers</span>
                    </>
                )}
            </div>
            <div className={styles.bar} style={barStyle}>
                <div className={styles.barFill} />
            </div>
        </div>
    );
};

export default DetailsPanelPassengers;
