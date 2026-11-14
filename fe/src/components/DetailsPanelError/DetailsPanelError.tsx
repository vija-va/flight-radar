import styles from './styles.module.css';

interface DetailsPanelErrorProps {
    reason: string | null;
}

const DetailsPanelError: React.FC<DetailsPanelErrorProps> = ({ reason }) => {
    return (
        <div className={styles.error} role="alert">
            <span className={styles.icon} aria-hidden="true">
                !
            </span>
            <div className={styles.title}>Flight details unavailable</div>
            {reason && <div className={styles.reason}>{reason}</div>}
        </div>
    );
};

export default DetailsPanelError;
