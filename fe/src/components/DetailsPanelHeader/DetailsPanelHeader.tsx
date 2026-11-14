import styles from './styles.module.css';
import Skeleton from '@/components/Skeleton/Skeleton.tsx';

interface DetailsPanelHeaderProps {
    loading: boolean;
    flightNumber?: string;
    onClose: () => void;
}

const DetailsPanelHeader: React.FC<DetailsPanelHeaderProps> = ({ loading, flightNumber, onClose }) => {
    return (
        <div className={styles.title}>
            {loading ? <Skeleton width={130} height={30} /> : <span>{flightNumber ?? 'Flight'}</span>}
            <button type="button" className={styles.closeBtn} aria-label="Close details" onClick={onClose}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
};

export default DetailsPanelHeader;
