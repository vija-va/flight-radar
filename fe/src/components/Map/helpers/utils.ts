import type { FeatureCollection, Feature, Point } from 'geojson';
import type { PlaneBasic } from '../../../types.ts';
import type { MapLibreMap } from 'maplibre-gl';
import planeImg from '../../../assets/plane.svg';
import { IMAGE_ID, MAP_LAYER, PLANES_SOURCE_ID } from './constants.ts';
import { MOCK_PLANES } from './mockData.ts';

type PlaneFeatureProps = {
    color: string;
    id: string;
};

export const toFeatureCollection = (planes: PlaneBasic[]): FeatureCollection<Point, PlaneFeatureProps> => {
    const features: Feature<Point, PlaneFeatureProps>[] = planes.map((plane) => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [plane.longitude, plane.latitude],
        },
        properties: { color: plane.color, id: plane.id },
    }));

    return {
        type: 'FeatureCollection',
        features,
    };
};

export const getLayerImage = async (src: string, width: number, height: number): Promise<HTMLImageElement> => {
    const image = new Image(width, height);
    image.src = src;
    await image.decode();
    return image;
};

export const addPlanesLayer = async (map: MapLibreMap): Promise<void> => {
    const image = await getLayerImage(planeImg, 32, 32);
    map.addImage(IMAGE_ID, image, { sdf: true });

    map.addSource(PLANES_SOURCE_ID, {
        type: 'geojson',
        data: toFeatureCollection(MOCK_PLANES),
        promoteId: 'id',
    });

    map.addLayer(MAP_LAYER);
};
