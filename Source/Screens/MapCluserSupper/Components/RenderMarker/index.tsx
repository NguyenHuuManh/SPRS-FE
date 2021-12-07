import { useNavigation } from "@react-navigation/core";
import React, { memo, useContext } from "react";
import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { MapStore } from "../..";
import ORG from "../../../../Assets/Images/locationOrganization.svg";
import Relief from "../../../../Assets/Images/locationRelief.svg";
import SOS from "../../../../Assets/Images/locationSOS.svg";
import Store from "../../../../Assets/Images/locationStore.svg";
import { AppColor } from "../../../../Helper/propertyCSS";
interface Props {
    setMarkerTo: any;
    setStrokerDirection: any;
    showModal: any;
    setShowModal: any;
    item: any;
}
const types = ['rp', 'st', 'sos', 'org', 'sp']
export default memo((props: Props) => {
    const { modalBottom: { visible, setVisible }, markerToStore: { markerTo } } = useContext(MapStore)
    const { setMarkerTo, setStrokerDirection, showModal, setShowModal, item } = props
    return (
        <Marker
            // key={item?.id | 0}
            coordinate={item.location}
            onPress={(e) => {
                console.log('item', item);
                if (item?.id) setMarkerTo(item);
                setStrokerDirection(0);
                setVisible(true);
            }}
            tracksViewChanges={false}
        >
            {item.type == 'rp' && (
                <Relief fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'st' && (
                <Store fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'sos' && (
                <SOS fill={'#F4A921'} width={30} height={30} />
            )}
            {item.type == 'org' && (
                <ORG fill={'#F4A921'} width={30} height={30} />
            )}
            {
                !types.includes(item.type) && (
                    <View><Text style={{ color: "red", width: 50 }} ellipsizeMode="tail" numberOfLines={1}>Custom</Text></View>
                )
            }

            {item?.id == markerTo.id && (
                <Text style={{ color: AppColor.CORLOR_TEXT, width: 70 }} ellipsizeMode="tail" numberOfLines={1}>{item?.name}</Text>
                // <Callout
                //     onPress={() => {
                //         navigation.navigate("DetailPoint", { point: item });
                //     }}
                // >
                //     <View style={{ width: 50, height: 50 }}>
                //         <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                //             <Text>{item?.name}</Text>
                //         </View>
                //     </View>
                // </Callout>
            )}
        </Marker>
    )
})