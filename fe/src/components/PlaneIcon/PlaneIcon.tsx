interface PlaneIconProps {
    size?: number;
    outlined?: boolean;
}

const PlaneIcon: React.FC<PlaneIconProps> = ({ size = 20, outlined = false }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 1.6c.8 0 1.3.9 1.3 2v5.6l7.9 4.6v1.9l-7.9-2.4-.2 5.2 2.6 1.9v1.5L12 20.9l-3.7 1v-1.5l2.6-1.9-.2-5.2-7.9 2.4v-1.9l7.9-4.6V3.6c0-1.1.5-2 1.3-2z"
                fill="currentColor"
                stroke={outlined ? '#0b0b0d' : 'none'}
                strokeWidth={1.4}
                strokeLinejoin="round"
                paintOrder="stroke"
            />
        </svg>
    );
};

export default PlaneIcon;
