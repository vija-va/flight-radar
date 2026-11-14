import styles from './styles.module.css';

interface SkeletonProps {
    width: number;
    height?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height = 15 }) => {
    return (
        <span className={styles.skeleton} style={{ width: `${width}px`, height: `${height}px` }} aria-hidden="true" />
    );
};

export default Skeleton;
