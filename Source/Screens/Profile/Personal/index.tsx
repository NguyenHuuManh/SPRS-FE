import { faCalendar, faCity, faEdit, faPhone, faTimesCircle, faUserAlt, faUserCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/core";
import { Field, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdate } from "../../../ApiFunction/Auth";
import AppSelectGroupUser from "../../../Components/AppSelectGroupUser";
import AppSelectHuyen from "../../../Components/AppSelectHuyen";
import AppSelectTinh from "../../../Components/AppSelectTinh";
import AppSelectXa from "../../../Components/AppSelectXa";
import ButtonCustom from "../../../Components/ButtonCustom";
import ContainerField from "../../../Components/ContainerField";
import DateTimePicker from "../../../Components/DateTimePicker";
import HeaderContainer from "../../../Components/HeaderContainer";
import Input from "../../../Components/Input";
import { AppColor } from "../../../Helper/propertyCSS";
import { height, width } from "../../../Helper/responsive";
import { profileActions } from "../../../Redux/Actions";
import styles from "../styles";
import { updateForm } from "../validate";
export default () => {
    const dispatch = useDispatch()
    const param = useRoute<any>();
    // const profile = param?.params?.profile
    const [idTinh, setIdTinh] = useState("");
    const [idHuyen, setIdHuyen] = useState("");
    const [disable, setDisable] = useState(true);
    const profile = useSelector((state) => state.profileReducer);
    const upateProfile = (values) => {
        apiUpdate(values).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "C???p nh???t th??ng tin th??nh c??ng",
                        position: "top"
                    });
                    dispatch(profileActions.profileRequest())
                    setDisable(true);
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: res.data.message,
                    position: "top"
                })
                return
            }
            Toast.show({
                type: "error",
                text1: "Ch???c n??ng ??ang b???o tr??",
                position: "top"
            })
        })
    }
    // console.log("res", moment(profile?.data?.dob).format("DD-MM-YYYY"))

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#FFF", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: profile?.data?.username || "",
                    dob: moment(profile?.data?.dob).format('DD-MM-YYYY') || "",
                    groupsId: profile?.data?.groups_user?.[0]?.id || "",
                    full_name: profile?.data?.full_name || "",
                    phone: profile?.data?.phone || "",
                    city: profile?.data?.address?.city?.id,
                    district: profile?.data?.address?.district?.id,
                    subDistrict: profile?.data?.address?.subDistrict?.id,
                    addressLine: "",
                }}
                validationSchema={updateForm}
                enableReinitialize
                onSubmit={(values) => {
                    const { city, district, subDistrict, addressLine, groupsId, ...body } = values

                    const dataBody = {
                        ...body,
                        full_name: values.full_name.replace(/\s\s+/g, ' '),
                        address: {
                            city: {
                                code: "",
                                id: values.city,
                                name: ""
                            },
                            district: {
                                code: "",
                                id: values?.district,
                                name: ""
                            },
                            subDistrict: {
                                code: "",
                                id: values?.subDistrict,
                                name: "",
                            },
                            addressLine: values?.addressLine,
                        },
                        groups_user: [{ id: groupsId }]
                    }
                    upateProfile(dataBody)
                }}
            >
                {({ submitForm, resetForm }) => (
                    <View style={{ width: width }}>
                        <View style={{ height: height * 0.07, alignItems: "center", zIndex: 100, backgroundColor: "#F6BB57" }}>
                            <HeaderContainer
                                flexRight={1}
                                flexCenter={10}
                                isBack
                                centerEl={(
                                    <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 20, color: "#FFF" }}>Th??ng tin t??i kho???n</Text>
                                    </View>
                                )}
                                flexLeft={1}
                            />
                            {/* <View style={[styles.avata, styles.boxShadowAvata]}></View> */}
                        </View>
                        <View style={{ flex: 6, backgroundColor: "#FFFF", padding: "5%", justifyContent: "space-around", paddingBottom: "5%", marginTop: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{ flexDirection: "row", padding: 10, borderWidth: 1, borderColor: "#e0dcce", borderRadius: 10, width: 110 }}
                                    onPress={() => {
                                        if (disable) {
                                            setDisable(false);
                                            // setody({ ...body })
                                        } else {
                                            resetForm();
                                            setDisable(true);
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={disable ? faUserEdit : faTimesCircle} color={disable ? AppColor.MAIN_COLOR : 'red'} style={{ width: '10%' }} />
                                    <Text style={{ color: AppColor.CORLOR_TEXT, width: '90%', textAlign: 'center', fontWeight: 'bold' }}>{disable ? "Ch???nh s???a" : "H???y"}</Text>
                                </TouchableOpacity>
                            </View>
                            <ContainerField title="T??n t??i kho???n">
                                <Field
                                    component={Input}
                                    name="username"
                                    placeholder="Nh???p t??n t??i kho???n"
                                    iconLeft={faUserCircle}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    editable={false}
                                />
                            </ContainerField>
                            <ContainerField title="H??? v?? t??n">
                                <Field
                                    component={Input}
                                    name="full_name"
                                    placeholder="Nh???p h??? v?? t??n"
                                    iconLeft={faUserCircle}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    editable={!disable}
                                />
                            </ContainerField>
                            <ContainerField title="S??? ??i???n tho???i">
                                <Field
                                    component={Input}
                                    keyboardType="numeric"
                                    name="phone"
                                    iconLeft={faPhone}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Nh???p s??? ??i???n tho???i"
                                    editable={!disable}
                                />
                            </ContainerField>
                            <ContainerField title="Ng??y sinh" disabled={disable}>
                                <Field
                                    component={DateTimePicker}
                                    iconLeft={faCalendar}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    name="dob"
                                    placeholder="Nh???p ng??y sinh"
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="T???nh/Th??nh ph???">
                                <Field
                                    component={AppSelectTinh}
                                    iconLeft={faCity}
                                    name="city"
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="T???nh/Th??nh ph???"
                                    onSelectOption={(item) => { setIdTinh(item?.id || "") }}
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="Qu???n/Huy???n">
                                <Field
                                    component={AppSelectHuyen}
                                    name="district"
                                    iconLeft={faCity}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Qu???n/Huy???n"
                                    idTinh={idTinh}
                                    onSelectOption={(item) => { setIdHuyen(item?.id || "") }}
                                    disabled={disable}
                                />
                            </ContainerField>
                            <ContainerField title="Qu???n/Huy???n">
                                <Field
                                    component={AppSelectXa}
                                    name="subDistrict"
                                    iconLeft={faCity}
                                    horizontal
                                    styleTitle={{ width: 90 }}
                                    placeholder="Qu???n/Huy???n"
                                    idHuyen={idHuyen}
                                    disabled={disable}
                                />
                            </ContainerField>
                            {!disable && (
                                <ButtonCustom title="C???p nh???t" styleContain={{ backgroundColor: "#579cfe", marginTop: 20 }} onPress={submitForm} />
                            )}
                        </View>
                    </View>
                )}
            </Formik>

            {/* </View> */}
        </KeyboardAwareScrollView >
    );

}