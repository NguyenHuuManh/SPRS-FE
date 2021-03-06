import { faEye, faEyeSlash, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { apiGetOtpSignup, apiSigup } from "../../ApiFunction/Auth";
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
import { AppColor } from "../../Helper/propertyCSS";
import { RootState } from "../../Redux/Reducers";
import { MainStyle } from "../../Style/main_style";
import OtpModal from "./OtpModal";
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
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [otpModal, setOtpModal] = useState(false);
    const [timeStart, setTimeStart] = useState({});
    const [disableOTP, setDisableOTP] = useState(true);
    const [body, setBody] = useState<any>();
    const getOtp = (values) => {
        const bodyOTP = {
            to: '+84' + values.phone.substring(1),
            username: values.username,
        }
        // setLoading(true);
        apiGetOtpSignup(bodyOTP).then((e) => {
            console.log("GET_OTP", e);
            if (e?.status == 200) {
                if (e.data.code == "200") {
                    setOtpModal(true);
                    setTimeStart({ value: 1 });
                    setDisableOTP(false)
                    return;
                }
                Toast.show({
                    type: "error",
                    text1: e.data.message,
                    position: "top"
                })
            } else {
                Toast.show({
                    type: "error",
                    text1: e.data.message,
                    position: "top"
                })
            }
        })
    }
    return (
        <KeyboardAwareScrollView style={{ backgroundColor: AppColor.BUTTON_MAIN, flex: 1 }} contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center", paddingTop: "5%", paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={{
                    username: "manhhe",
                    phone: "0966048002",
                    password: "password",
                    rePassWord: "password",
                    full_name: "Nguy???n H???u M???nh",
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
                    getOtp(user);
                    setBody(user);
                }
                }
            >
                {({ submitForm, values, errors }) => (
                    <View style={[MainStyle.boxShadow, styles.containLogin]}>
                        {/* <AwesomeLoading indicatorId={16} size={50} isActive={userReducer?.isLoading} text="watting.." /> */}
                        <ContainerField title="Lo???i t??i kho???n">
                            <Field
                                component={AppSelectGroupUser}
                                name="groupsId"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Ch???n lo???i t??i kho???n"
                            />
                        </ContainerField>
                        <ContainerField title="T??n t??i kho???n">
                            <Field
                                component={Input}
                                name="username"
                                placeholder="Nh???p t??n t??i kho???n"
                                horizontal
                                styleTitle={{ width: 90 }}
                                maxLength={16}
                            />
                        </ContainerField>
                        <ContainerField title="H??? v?? t??n">
                            <Field
                                component={Input}
                                name="full_name"
                                placeholder="Nh???p h??? v?? t??n"
                                horizontal
                                styleTitle={{ width: 90 }}
                                maxLength={50}
                            />
                        </ContainerField>
                        <ContainerField title="S??? ??i???n tho???i">
                            <Field
                                component={Input}
                                keyboardType="numeric"
                                name="phone"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Nh???p s??? ??i???n tho???i"
                                maxLength={10}
                            />
                        </ContainerField>
                        <ContainerField title="Ng??y sinh">
                            <Field
                                component={DateTimePicker}
                                horizontal
                                styleTitle={{ width: 90 }}
                                name="dob"
                                placeholder="Nh???p ng??y sinh"
                            />
                        </ContainerField>
                        <ContainerField title="T???nh/Th??nh ph???">
                            <Field
                                component={AppSelectTinh}
                                name="city"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="T???nh/Th??nh ph???"
                                onSelectOption={(item) => { setIdTinh(item?.id) }}
                            />
                        </ContainerField>
                        <ContainerField title="Qu???n/Huy???n">
                            <Field
                                component={AppSelectHuyen}
                                name="district"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Qu???n/Huy???n"
                                idTinh={idTinh}
                                onSelectOption={(item) => { setIdHuyen(item?.id) }}
                            />
                        </ContainerField>
                        <ContainerField title="Qu???n/Huy???n">
                            <Field
                                component={AppSelectXa}
                                name="subDistrict"
                                horizontal
                                styleTitle={{ width: 90 }}
                                placeholder="Qu???n/Huy???n"
                                idHuyen={idHuyen}
                            />
                        </ContainerField>
                        <ContainerField title="M???t kh???u">
                            <Field
                                component={Input}
                                name="password"
                                horizontal
                                styleTitle={{ width: 90 }}
                                secureTextEntry={secureTextEntry}
                                iconRight={secureTextEntry ? faEyeSlash : faEye}
                                leftIconOnpress={() => { setSecureTextEntry(!secureTextEntry) }}
                                placeholder="Nh???p m???t kh???u"
                                iconSize={20}
                            />
                        </ContainerField>
                        <ContainerField title="Nh???p l???i m???t kh???u">
                            <Field
                                component={Input}
                                horizontal
                                styleTitle={{ width: 90 }}
                                secureTextEntry={secureTextEntry1}
                                iconRight={secureTextEntry1 ? faEyeSlash : faEye}
                                leftIconOnpress={() => { setSecureTextEntry1(!secureTextEntry1) }}
                                iconSize={20}
                                name="rePassWord"
                                placeholder="Nh???p l???i m???t kh???u"
                            />
                        </ContainerField>

                        <ButtonCustom
                            styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: "10%" }}
                            styleTitle={{ color: "#FFFF", fontSize: 25 }}
                            title="????ng k??"
                            onPress={() => {
                                submitForm();
                            }}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: "5%" }}>
                            <Text style={{ textDecorationLine: "underline" }} onPress={() => { navigation.goBack() }}>????ng nh???p</Text>
                        </View>
                    </View>
                )
                }
            </Formik >
            <OtpModal
                visible={otpModal}
                setVisible={setOtpModal}
                body={body}
                disableOTP={disableOTP}
                getOtp={getOtp}
                setDisableOTP={setDisableOTP}
                timeStart={timeStart}
            />
        </KeyboardAwareScrollView>

    )
}