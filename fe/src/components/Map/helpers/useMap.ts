import { useEffect, useState, type RefObject } from 'react';
import { MapLibreMap } from 'maplibre-gl';
import { CENTER_COORDINATES, STYLES_LINK, ZOOM } from './constants';
import { addPlanesLayer } from './utils';

export const useMap = (containerRef: RefObject<HTMLDivElement | null>): MapLibreMap | null => {
    const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);
    useEffect(() => {
        const mapContainer = containerRef.current;
        if (!mapContainer) return;

        const map = new MapLibreMap({
            container: mapContainer,
            style: STYLES_LINK,
            center: CENTER_COORDINATES,
            zoom: ZOOM,
        });

        map.on('load', async () => {
            await addPlanesLayer(map);
            setMapInstance(map);
        });

        return () => {
            map.remove();
        };
    }, [containerRef]);

    return mapInstance;
};
