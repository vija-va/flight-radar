import styles from './styles.module.css';
import clsx from 'clsx';
import { getFlightProgress } from '@/lib/utils.ts';
import PlaneIcon from '@/components/PlaneIcon/PlaneIcon.tsx';
import Skeleton from '@/components/Skeleton/Skeleton.tsx';
import type { PlaneDetailed } from '@/types.ts';

interface DetailsPanelFlightInfoProps {
    loading: boolean;
    details: PlaneDetailed | null;
}

const DetailsPanelFlightInfo: React.FC<DetailsPanelFlightInfoProps> = ({ loading, details }) => {
    const progress = getFlightProgress(details?.flightDuration, details?.estimatedArrival);
    const lineStyle = {
        '--progress': progress,
        '--plane-color': details?.color,
    } as React.CSSProperties;

    return (
        <div>
            <div className={styles.desc}>
                {loading ? (
                    <Skeleton width={200} height={14} />
                ) : (
                    <>
                        <span className={styles.planeIcon} style={{ color: details?.color }}>
                            <PlaneIcon size={18} />
                        </span>
                        <span className={styles.airline}>{details?.airline}</span>
                        <span>{details?.model}</span>
                    </>
                )}
            </div>
            <div className={styles.flightInfo}>
                <div className={styles.flightInfoItem}>
                    <div className={styles.flightAirport}>
                        {loading ? <Skeleton width={48} height={20} /> : details?.origin.airport}
                    </div>
                    <div className={styles.flightCity}>
                        {loading ? <Skeleton width={64} height={12} /> : details?.origin.city}
                    </div>
                </div>
                <div className={styles.flightLineWrapper}>
                    <div key={details?.id} className={styles.flightLine} style={lineStyle}>
                        {!loading && (
                            <>
                                <div className={styles.flightLineFill} />
                                <span className={styles.flightLinePlane}>
                                    <PlaneIcon size={18} outlined />
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={clsx(styles.flightInfoItem, styles.right)}>
                    <div className={styles.flightAirport}>
                        {loading ? <Skeleton width={48} height={20} /> : details?.destination.airport}
                    </div>
                    <div className={styles.flightCity}>
                        {loading ? <Skeleton width={64} height={12} /> : details?.destination.city}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPanelFlightInfo;
