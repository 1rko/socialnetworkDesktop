import React from 'react';
import {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer, YMapComponentsProvider, YMapDefaultMarker, YMapControls, YMapZoomControl
    // ...other components
} from "ymap3-components";
import {YMapLocation} from "@yandex/ymaps3-types/imperative/YMap";
//import { features, LOCATION } from './helpers'

export const location: YMapLocation = {center: [27.576537,53.913637], zoom: 13};
// apikey is only for codesandbox.io, xk3d74.csb.app and wxn9cy.csb.app
export const apiKey = '7aaf6613-6d31-4f24-bb03-f8f81f31be74';


const YandexMap = () => {
    return (
        <YMapComponentsProvider apiKey={'7aaf6613-6d31-4f24-bb03-f8f81f31be74'}>
            <YMap location={location}>
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>
                <YMapDefaultMarker coordinates={location.center} />
                {/*  <YMapDefaultMarker
                    coordinates={[53.913598, 27.576635]}
                    draggable={true}
                />*/}
                <YMapControls position="bottom">
                    <YMapZoomControl/>
                </YMapControls>
            </YMap>
        </YMapComponentsProvider>
    );
}

export default YandexMap