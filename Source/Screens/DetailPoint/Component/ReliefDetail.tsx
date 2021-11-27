import { faChevronLeft, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import { isEmpty, isNull, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { apiUpdateStatusNotification } from "../../../ApiFunction/Notification";
import { apiGetReliefPointDetail } from "../../../ApiFunction/ReliefPoint";
import { apiSubcribleStore } from "../../../ApiFunction/StorePoint";
import ContainerField from "../../../Components/ContainerField";
import HeaderContainer from "../../../Components/HeaderContainer";
import Input from "../../../Components/Input";
import MultipleAddItem from "../../../Components/MultipleAddItem";
import StoreCategory from "../../../Components/StoreCategory";
import TimePicker from "../../../Components/TimePicker";
import { AppColor } from "../../../Helper/propertyCSS";
import { MainStyle } from "../../../Style/main_style";
import styles from "../styles";
const type = [
    'rp', 'st', 'sos', 'org'
]
const StoreDetail = ({ point, from }) => {
    const [data, setData] = useState<any>({});
    const [items, setItems] = useState<any>([]);
    const navigation = useNavigation();
    const getReliefPoint = (id) => {
        if (isEmpty(id + "") || isUndefined(id) || isNull(id)) return;
        apiGetReliefPointDetail({ id: id }).then((res) => {
            if (res.status == 200) {
                console.log("res", res)
                if (res.data.code == "200") {
                    setData(res.data.obj);
                    setItems(res.data.obj.reliefInformations);
                    return;
                }
            } else {
                Toast.show({
                    type: "error",
                    text1: res.data.message,
                    position: "top"
                })
            }
        })
    }

    useEffect(() => {
        getReliefPoint(point?.id);
    }, [point])

    const subcribeStore = () => {
        const body = {
            store_id: point.id
        }
        apiSubcribleStore(body).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "Đã theo dõi cửa hàng",
                        position: "top"
                    })
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: res.data.message,
                    position: "top"
                })
            } else {
                Toast.show({
                    type: "error",
                    text1: "Chức năng đang được bảo trì",
                    position: "top"
                })
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: "7%" }}>
                <HeaderContainer
                    flexRight={1}
                    flexCenter={10}
                    flexLeft={1}
                    leftView
                    iconLeft={faChevronLeft}
                    leftOnpress={() => {
                        if (from == 'Notification') {
                            navigation.navigate(from)
                        } else {
                            navigation.replace(from);
                        }
                    }}
                    centerEl={(
                        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ fontSize: 20, color: "#FFFF" }}>{point.name}</Text>
                            <FontAwesomeIcon icon={faStore} style={{ marginLeft: 10 }} color="#f57842" size={26} />
                        </View>
                    )}
                />
            </View>

            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[{ width: "100%", height: 180, backgroundColor: "#FFFF", padding: 1, borderRadius: 10, marginTop: 20 }, MainStyle.boxShadow]}>

                </View>
                <Formik
                    initialValues={{
                        open_time: data?.open_time || "",
                        close_time: data?.close_time || "",
                        status: data?.status || "",
                        name: data?.name || "",
                        description: data?.description || "",
                        address: data?.address?.subDistrict.name + " - " + data?.address?.district.name + " - " + data?.address?.city.name
                    }}
                    enableReinitialize
                    onSubmit={(values) => { }}
                >
                    {({ submitForm, values }) => (
                        <View >
                            <ContainerField title="Tên điểm">
                                <Field
                                    component={Input}
                                    name="name"
                                    horizontal
                                    styleTitle={{ width: 110 }}
                                />
                            </ContainerField>

                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "50%", paddingRight: 5 }}>
                                    <ContainerField title="Giờ mở cửa">
                                        <Field
                                            component={TimePicker}
                                            name="open_time"
                                            mode="time"
                                            horizontal
                                            placeholder="Mở cửa"
                                            styleTitle={{ width: 110 }}
                                        />
                                    </ContainerField>
                                </View>
                                <View style={{ width: "50%", paddingLeft: 5 }}>
                                    <ContainerField title="Giờ đóng cửa">
                                        <Field
                                            component={TimePicker}
                                            name="close_time"
                                            mode="time"
                                            horizontal
                                            placeholder="Đóng cửa"
                                            styleTitle={{ width: 110 }}
                                        />
                                    </ContainerField>
                                </View>
                            </View>

                            <ContainerField title="Mô tả">
                                <Field
                                    component={Input}
                                    name="description"
                                    horizontal
                                    placeholder="Mô tả"
                                    styleTitle={{ width: 110 }}
                                />
                            </ContainerField>

                            <ContainerField title="địa điểm">
                                <View style={{ height: 50, width: "100%", display: "flex", justifyContent: "center", paddingLeft: 15 }}>
                                    <Text style={{ color: AppColor.CORLOR_TEXT }}>
                                        {values.address}
                                    </Text>
                                </View>
                            </ContainerField>
                            <ContainerField title="Sản phẩm">
                                <MultipleAddItem items={items} readOnly />
                            </ContainerField>
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}
export default StoreDetail;