import React from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import Relief from "../../../../Assets/Images/locationRelief.svg";
import SOS from "../../../../Assets/Images/locationSOS.svg";
import Store from "../../../../Assets/Images/locationStore.svg";
import ORG from "../../../../Assets/Images/locationOrganization.svg";
import { addAnItems } from "../../../../Helper/FunctionCommon";
import { MainStyle } from "../../../../Style/main_style";
import { AppColor } from "../../../../Helper/propertyCSS";

const Margin_BT = 20;

interface Props {
    typePoinst: any;
    setTypePoints: any;
}

export default (props: Props) => {
    const { typePoinst, setTypePoints } = props
    const points = [
        { name: "Điểm cứu trợ", id: "rp" }, { name: "SOS", id: "sos" }, { name: "Cửa hàng", id: "st" }, { name: "Tổ chức", id: "org" }
    ]

    const onSelectedItem = (item) => {
        setTypePoints(addAnItems(typePoinst, item, "id"));
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={[{
                width: 100,
                height: 40,
                borderRadius: 10,
                marginRight: 10,
                backgroundColor: Boolean(typePoinst.filter((elm) => elm.id === item.id).length > 0) ? '#e4f0c7' : "#FFFF",
                marginBottom: Margin_BT,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#FFFF",
            }, MainStyle.boxShadow,]}
                onPress={() => {
                    onSelectedItem(item);
                }}
            >
                {item.id == 'rp' && (
                    <View style={{ flexDirection: "row" }}>
                        <Relief width={30} height={30} />
                        <Text style={{ textAlignVertical: "center", color: AppColor.CORLOR_TEXT }}>Cứu trợ</Text>
                    </View>
                )}
                {item.id == 'st' && (
                    <View style={{ flexDirection: "row" }}>
                        <Store width={30} height={30} />
                        <Text style={{ textAlignVertical: "center", color: AppColor.CORLOR_TEXT }}>Cửa hàng</Text>
                    </View>
                )}
                {item.id == 'sos' && (
                    <View style={{ flexDirection: "row" }}>
                        <SOS width={30} height={30} />
                        <Text style={{ textAlignVertical: "center", color: AppColor.CORLOR_TEXT }}>SOS</Text>
                    </View>
                )}
                {item.id == 'org' && (
                    <View style={{ flexDirection: "row" }}>
                        <ORG width={30} height={30} />
                        <Text style={{ textAlignVertical: "center", color: AppColor.CORLOR_TEXT }}>Tổ chức</Text>
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ zIndex: 100, marginTop: 10, position: "absolute" }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={points}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
                horizontal
            />
        </View>
    )
}