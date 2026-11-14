import Skeleton from '@/components/Skeleton/Skeleton.tsx';
import styles from './styles.module.css';

interface DetailsPanelFieldProps {
    label: string;
    loading: boolean;
    children: React.ReactNode;
}

const DetailsPanelField: React.FC<DetailsPanelFieldProps> = ({ label, loading, children }) => {
    return (
        <div className={styles.field}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{loading ? <Skeleton width={100} height={18} /> : children}</div>
        </div>
    );
};

export default DetailsPanelField;
