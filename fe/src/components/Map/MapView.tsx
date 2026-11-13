import { useRef } from 'react';
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import styles from './styles.module.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMap } from './helpers/useMap.ts';
import { useAppSelector } from '@/lib/hooks/useStore.ts';

setWorkerUrl(workerUrl);

const MapView = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    useMap(mapRef);

    const selectedId = useAppSelector((state) => state.selection.selectedId);

    return (
        <>
            <div className={styles.mapHeader}> currentID: {selectedId} </div>
            <div className={styles.map} ref={mapRef} />
        </>
    );
};

export default MapView;
