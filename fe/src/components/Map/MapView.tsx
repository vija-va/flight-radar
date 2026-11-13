import { useRef } from 'react';
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import styles from './styles.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMap } from './helpers/useMap.ts';

setWorkerUrl(workerUrl);

const MapView = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    useMap(mapRef);

    return <div className={styles.map} ref={mapRef} />;
};

export default MapView;
