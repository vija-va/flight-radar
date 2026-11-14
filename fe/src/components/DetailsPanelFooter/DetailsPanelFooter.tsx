import clsx from 'clsx';
import styles from './styles.module.css';
import StatusDot from '@/components/StatusDot/StatusDot.tsx';
import Skeleton from '@/components/Skeleton/Skeleton.tsx';
import { DETAILS_STATUS_DOT, DETAILS_STATUS_LABELS, FLIGHT_STATUS_LABELS } from '@/lib/constants.ts';
import type { DetailsStatus, FlightStatus } from '@/types.ts';

interface DetailsPanelFooterProps {
    loading: boolean;
    registration?: string;
    flightStatus?: FlightStatus;
    detailsStatus: DetailsStatus;
}

const DetailsPanelFooter: React.FC<DetailsPanelFooterProps> = ({
    loading,
    registration,
    flightStatus,
    detailsStatus,
}) => {
    return (
        <div className={styles.footer}>
            {loading ? <Skeleton width={90} height={14} /> : <span>Reg. {registration}</span>}
            <div className={styles.statuses}>
                {!loading && flightStatus && (
                    <span className={clsx(styles.flightStatus, styles[flightStatus])}>
                        {FLIGHT_STATUS_LABELS[flightStatus]}
                    </span>
                )}
                <span className={styles.liveStatus}>
                    <StatusDot status={DETAILS_STATUS_DOT[detailsStatus]} />
                    {DETAILS_STATUS_LABELS[detailsStatus]}
                </span>
            </div>
        </div>
    );
};

export default DetailsPanelFooter;
