import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
interface Props {
    defaultLocation?: any;
}
export default (props: Props) => {
    const { defaultLocation } = props
    const [mapReady, setMapReady] = useState(false);

    const mapRef = useRef(null);

    // useEffect(() => {
    //     console.log("vao daay");
    // }, [defaultLocation])

    if (!isEmpty(defaultLocation)) {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation={true}
                region={defaultLocation}
                zoomEnabled
                ref={mapRef}
                onMapReady={() => { setMapReady(true) }}
            >
                {mapReady && (
                    <>
                        <Marker
                            coordinate={{
                                latitude: defaultLocation.latitude,
                                longitude: defaultLocation.longitude
                            }}
                            title={"marker.title"}
                            description={"marker.description"}
                        />
                    </>

                )}
            </MapView>
        )
    } else {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
            />
        )
    }
}