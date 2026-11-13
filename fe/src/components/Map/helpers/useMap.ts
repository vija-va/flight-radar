import { useEffect, useState, type RefObject } from 'react';
import { GeoJSONSource, MapLibreMap } from 'maplibre-gl';
import { CENTER_COORDINATES, PLANES_SOURCE_ID, STYLES_LINK, ZOOM } from './constants';
import { addPlanesLayer, toFeatureCollection } from './utils';
import { useAppSelector } from '@/lib/hooks/useStore.ts';
import { planesSelectors } from '@/store/slices/planes.ts';

export const useMap = (containerRef: RefObject<HTMLDivElement | null>): MapLibreMap | null => {
    const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);
    const planes = useAppSelector(planesSelectors.selectAll);

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

    useEffect(() => {
        if (mapInstance === null) {
            return;
        }

        const layer = mapInstance.getSource(PLANES_SOURCE_ID);
        if (layer instanceof GeoJSONSource) {
            layer.setData(toFeatureCollection(planes));
        }
    }, [planes, mapInstance]);

    return mapInstance;
};
