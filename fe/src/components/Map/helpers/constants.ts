import type { LngLatLike, SymbolLayerSpecification } from 'maplibre-gl';

export const STYLES_LINK = 'https://tiles.openfreemap.org/styles/dark';
export const PLANES_LAYER_ID = 'planes-layer';
export const PLANES_SOURCE_ID = 'planes';
export const IMAGE_ID = 'plane-image';
export const CENTER_COORDINATES: LngLatLike = [-90, 50];
export const ZOOM = 3.3;

export const MAP_LAYER: SymbolLayerSpecification = {
    id: PLANES_LAYER_ID,
    type: 'symbol',
    source: PLANES_SOURCE_ID,
    paint: {
        'icon-color': ['coalesce', ['get', 'color'], '#fff'],
    },
    layout: {
        'icon-image': IMAGE_ID,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
};
