import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/core";
import { Field, Formik } from "formik";
import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import AwesomeLoading from 'react-native-awesome-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiOtpChecking, apiResetPass } from '../../../ApiFunction/Auth';
import ButtonCustom from '../../../Components/ButtonCustom';
import Input from '../../../Components/Input';
import { MainStyle } from '../../../Style/main_style';
import styles from '../styles';
import { SubmitOTP } from '../validate';
export default ({ route, navigation }) => {
    const { to } = route.params;
    const checkOTP = (values) => {
        console.log("valuesOTP", values);
        apiResetPass(values).then((res) => {
            if (res.status == 200) {
                navigation.navigate('ChangePassword');
                if (res.data.code == "200") {
                    Toast.show({
                        type: "success",
                        text1: "Khôi phục mật khẩu thành",
                        position: "top"
                    })
                    navigation.navigate("Signin");
                } else {
                    Toast.show({
                        type: "error",
                        text1: res?.data?.descreptions,
                        position: "top"
                    })
                }
            }
        })
    }

    return (
        <Formik
            initialValues={{
                otp: ""
            }}
            validationSchema={SubmitOTP}
            onSubmit={(values) => {
                checkOTP({ otp: values.otp, to: to })
            }}
        >
            {({ submitForm }) => (
                <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "red", }} contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <ImageBackground source={require('../../../Assets/Images/backdgroundpng.png')}
                        resizeMode="stretch"
                        style={[styles.BG]}
                    >
                        <View style={{ width: 30, height: 30, position: "absolute", top: 10, left: 10 }}>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <FontAwesomeIcon size={26} color={"#FFF"} icon={faChevronLeft} />
                            </TouchableOpacity>
                        </View>
                        <View style={[MainStyle.boxShadow, styles.containLogin]}>
                            <Field
                                component={Input}
                                name="otp"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập mã otp"
                                keyboardType="numeric"
                                underLine
                            />
                            <ButtonCustom
                                styleContain={{ backgroundColor: "#F6BB57", width: "80%", marginTop: "10%" }}
                                styleTitle={{ color: "#FFFF", fontSize: 25 }}
                                title="Tiếp tục"
                                onPress={submitForm}
                            />
                        </View>

                    </ImageBackground>
                </KeyboardAwareScrollView>

            )}
        </Formik>
    )
}