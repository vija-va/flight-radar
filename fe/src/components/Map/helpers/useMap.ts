import { useEffect, useState, type RefObject } from 'react';
import { type ExpressionSpecification, GeoJSONSource, MapLibreMap } from 'maplibre-gl';
import { CENTER_COORDINATES, PLANES_LAYER_ID, PLANES_SOURCE_ID, STYLES_LINK, ZOOM } from './constants';
import { addPlanesLayer, toFeatureCollection } from './utils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useStore.ts';
import { planesSelectors } from '@/store/slices/planes.ts';
import { planeSelected, selectionCleared } from '@/store/slices/selection.ts';

export const useMap = (containerRef: RefObject<HTMLDivElement | null>): MapLibreMap | null => {
    const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);
    const planes = useAppSelector(planesSelectors.selectAll);
    const selectedId = useAppSelector((state) => state.selection.selectedId);
    const dispatch = useAppDispatch();

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

        map.on('click', (ev) => {
            const features = map.queryRenderedFeatures(ev.point, { layers: [PLANES_LAYER_ID] });
            if (features.length > 0) {
                const id = features[0].properties.id;
                if (typeof id === 'string') {
                    dispatch(planeSelected(id));
                }
            } else {
                dispatch(selectionCleared());
            }
        });

        map.on('mouseenter', PLANES_LAYER_ID, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', PLANES_LAYER_ID, () => {
            map.getCanvas().style.cursor = '';
        });

        return () => {
            map.remove();
        };
    }, [containerRef, dispatch]);

    useEffect(() => {
        if (mapInstance === null) {
            return;
        }

        const layer = mapInstance.getSource(PLANES_SOURCE_ID);
        if (layer instanceof GeoJSONSource) {
            layer.setData(toFeatureCollection(planes));
        }
    }, [planes, mapInstance]);

    useEffect(() => {
        if (mapInstance === null) {
            return;
        }

        const expression: ExpressionSpecification = ['==', ['get', 'id'], selectedId];
        mapInstance.setPaintProperty(PLANES_LAYER_ID, 'icon-halo-color', ['case', expression, '#fff', 'rgba(0,0,0,0)']);
        mapInstance.setPaintProperty(PLANES_LAYER_ID, 'icon-halo-width', ['case', expression, 2, 0]);
    }, [mapInstance, selectedId]);

    return mapInstance;
};
