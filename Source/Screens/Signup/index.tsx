import { faEye, faEyeSlash, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiSigup } from "../../ApiFunction/Auth";
import AppSelectAccount from "../../Components/AppSelectAccount";
import AppSelectGroupUser from "../../Components/AppSelectGroupUser";
import AppSelectHuyen from "../../Components/AppSelectHuyen";
import AppSelectTinh from "../../Components/AppSelectTinh";
import AppSelectXa from "../../Components/AppSelectXa";
import ButtonCustom from "../../Components/ButtonCustom";
import ContainerField from "../../Components/ContainerField";
import DateTimePicker from "../../Components/DateTimePicker";
import Input from "../../Components/Input";
import MapPicker from "../../Components/MapPicker";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
import { register } from "./validate";
export default () => {
    const userReducer = useSelector((state: RootState) => state.userReducer);
    const navigation = useNavigation();
    const [idTinh, setIdTinh] = useState("");
    const [idHuyen, setIdHuyen] = useState("");
    const [organizationInfor, setOrganizationInfor] = useState<{
        city: string,
        province: string,
        district: string,
        subDistrict: string,
        addressLine: string,
        GPS_Long: string,
        GPS_Lati: string,
    }>({
        city: "",
        province: "",
        district: "",
        subDistrict: "",
        addressLine: "",
        GPS_Long: "",
        GPS_Lati: "",
    });
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const signup = (body) => {
        const param = { ...body }
        try {
            apiSigup(param)
                .then((e) => {
                    console.log("res", e);
                    if (e.data.code + "" === "200") {
                        Toast.show({
                            type: "success",
                            text1: "Đăng ký tài khoản thành công",
                            position: "top"
                        })
                        navigation.navigate("Signin");
                    } else {
                        Toast.show({
                            type: "error",
                            text1: e.data.message,
                            position: "top"
                        })
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#F6BB57", flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "5%", paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: "manhhe",
                    phone: "0966048002",
                    password: "password",
                    rePassWord: "password",
                    full_name: "Nguyễn Hữu Mạnh",
                    dob: "",
                    city: "",
                    province: "",
                    district: "",
                    subDistrict: "",
                    addressLine: "",
                    groupsId: "",
                    adresslineORG: "",

                }}
                validateOnChange={false}
                validationSchema={register}
                onSubmit={(values) => {
                    let user = {
                        username: values.username,
                        phone: values.phone,
                        password: values.password,
                        full_name: values.full_name.replace(/\s\s+/g, ' '),
                        dob: values.dob,
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
                        groups_user: [{ id: values.groupsId }],
                    }
                    signup(user);
                }
                }
            >
                {({ submitForm, values, errors }) => (
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        {/* <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." /> */}
                        <ContainerField title="Loại tài khoản">
                            <Field
                                component={AppSelectGroupUser}
                                name="groupsId"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Chọn loại tài khoản"
                            />
                        </ContainerField>
                        <ContainerField title="Tên tài khoản">
                            <Field
                                component={Input}
                                name="username"
                                placeholder="Nhập tên tài khoản"
                                horizontal
                                styleTitle={{ width: 90 }}
                            />
                        </ContainerField>
                        <ContainerField title="Họ và tên">
                            <Field
                                component={Input}
                                name="full_name"
                                placeholder="Nhập họ và tên"
                                horizontal
                                styleTitle={{ width: 90 }}
                            />
                        </ContainerField>
                        <ContainerField title="Số điện thoại">
                            <Field
                                component={Input}
                                keyboardType="numeric"
                                name="phone"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Nhập số điện thoại"
                            />
                        </ContainerField>
                        <ContainerField title="Ngày sinh">
                            <Field
                                component={DateTimePicker}
                                horizontal
                                styleTitle={{ width: 90 }}
                                name="dob"
                                placeholder="Nhập ngày sinh"
                            />
                        </ContainerField>
                        <ContainerField title="Tỉnh/Thành phố">
                            <Field
                                component={AppSelectTinh}
                                name="city"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Tỉnh/Thành phố"
                                onSelectOption={(item) => { setIdTinh(item?.id) }}
                            />
                        </ContainerField>
                        <ContainerField title="Quận/Huyện">
                            <Field
                                component={AppSelectHuyen}
                                name="district"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Quận/Huyện"
                                idTinh={idTinh}
                                onSelectOption={(item) => { setIdHuyen(item?.id) }}
                            />
                        </ContainerField>
                        <ContainerField title="Quận/Huyện">
                            <Field
                                component={AppSelectXa}
                                name="subDistrict"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Quận/Huyện"
                                idHuyen={idHuyen}
                            />
                        </ContainerField>
                        <ContainerField title="Mật khẩu">
                            <Field
                                component={Input}
                                name="password"
                                horizontal
                                styleTitle={{ width: 90 }}
                                secureTextEntry={secureTextEntry}
                                iconRight={secureTextEntry ? faEyeSlash : faEye}
                                leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
                                placeholder="Nhập mật khẩu"
                                iconSize={20}
                            />
                        </ContainerField>
                        <ContainerField title="Nhập lại mật khẩu">
                            <Field
                                component={Input}
                                horizontal
                                styleTitle={{ width: 90 }}
                                secureTextEntry
                                name="rePassWord"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </ContainerField>

                        <ButtonCustom
                            styleContain={{ backgroundColor: "#F6BB57", marginTop: "10%" }}
                            styleTitle={{ color: "#FFFF", fontSize: 25 }}
                            title="Đăng ký"
                            onPress={submitForm}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                            <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.goBack() }}>đăng nhập</Text>
                        </View>
                    </View>
                )
                }
            </Formik >
        </KeyboardAwareScrollView>

    )
}