import { useAppDispatch, useAppSelector } from '@/lib/hooks/useStore.ts';
import { selectionCleared } from '@/store/slices/selection.ts';
import styles from './styles.module.css';
import DetailsPanelFlightInfo from '@/components/DetailsPanelFlightInfo/DetailsPanelFlightInfo.tsx';
import DetailsPanelField from '@/components/DetailsPanelField/DetailsPanelField.tsx';
import clsx from 'clsx';
import DetailsPanelHeader from '@/components/DetailsPanelHeader/DetailsPanelHeader.tsx';
import DetailsPanelPassengers from '@/components/DetailsPanelPassengers/DetailsPanelPassengers.tsx';
import VerticalSpeedIcon from '@/components/VerticalSpeedIcon/VerticalSpeedIcon.tsx';
import DetailsPanelFooter from '@/components/DetailsPanelFooter/DetailsPanelFooter.tsx';
import DetailsPanelError from '@/components/DetailsPanelError/DetailsPanelError.tsx';
import {
    formatDuration,
    formatHeading,
    formatNumber,
    formatSpeed,
    formatTime,
    formatTimeLeft,
    formatVerticalSpeed,
} from '@/lib/utils.ts';

const DetailsPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const details = useAppSelector((state) => state.selection.details);
    const reason = useAppSelector((state) => state.selection.reason);
    const detailsStatus = useAppSelector((state) => state.selection.detailsStatus);

    const isLoading = detailsStatus === 'loading';
    const handleClose = () => dispatch(selectionCleared());

    if (detailsStatus === 'idle') return null;

    if (detailsStatus === 'error') {
        return (
            <div className={clsx('glass', styles.panel)}>
                <DetailsPanelHeader loading={false} flightNumber={details?.flightNumber} onClose={handleClose} />
                <DetailsPanelError reason={reason} />
            </div>
        );
    }

    const { value, direction } = formatVerticalSpeed(details?.verticalSpeed);
    return (
        <div className={clsx('glass', styles.panel)}>
            <DetailsPanelHeader loading={isLoading} flightNumber={details?.flightNumber} onClose={handleClose} />
            <div>
                <DetailsPanelFlightInfo loading={isLoading} details={details} />
                <div className={styles.fieldsWrapper}>
                    <DetailsPanelField label="Altitude" loading={isLoading}>
                        {formatNumber(details?.altitude)} <span>m</span>
                    </DetailsPanelField>
                    <DetailsPanelField label="Ground speed" loading={isLoading}>
                        {formatSpeed(details?.speed)} <span>km/h</span>
                    </DetailsPanelField>
                    <DetailsPanelField label="Vertical speed" loading={isLoading}>
                        <VerticalSpeedIcon direction={direction} />
                        {value} <span>m/s</span>
                    </DetailsPanelField>
                    <DetailsPanelField label="Heading" loading={isLoading}>
                        {formatHeading(details?.heading)}
                    </DetailsPanelField>
                    <DetailsPanelField label="Arrives (local)" loading={isLoading}>
                        {formatTime(details?.estimatedArrival)}
                        <span>{formatTimeLeft(details?.estimatedArrival)}</span>
                    </DetailsPanelField>
                    <DetailsPanelField label="Flight time" loading={isLoading}>
                        {formatDuration(details?.flightDuration)}
                    </DetailsPanelField>
                </div>
                <DetailsPanelPassengers
                    loading={isLoading}
                    passengers={details?.numberOfPassengers}
                    maxPassengers={details?.maxPassengers}
                />
            </div>
            <DetailsPanelFooter
                loading={isLoading}
                registration={details?.registration}
                flightStatus={details?.status}
                detailsStatus={detailsStatus}
            />
        </div>
    );
};

export default DetailsPanel;
