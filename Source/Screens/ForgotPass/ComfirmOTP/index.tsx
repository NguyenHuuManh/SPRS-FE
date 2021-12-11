import { faChevronLeft, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CountDown from 'react-native-countdown-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { apiResetPass } from '../../../ApiFunction/Auth';
import ButtonCustom from '../../../Components/ButtonCustom';
import Input from '../../../Components/Input';
import { AppColor } from '../../../Helper/propertyCSS';
import { MainStyle } from '../../../Style/main_style';
import styles from '../styles';
import { SubmitOTP } from '../validate';

export default ({ route, navigation }) => {
    const { to } = route.params;
    const [count, setCount] = useState(10);

    const checkOTP = (values) => {
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
                            {count == 0 ? (
                                <TouchableOpacity onPress={() => { setCount(5) }}>
                                    <Text>Gửi lại: 0s</Text>
                                </TouchableOpacity>
                            ) : (
                                <CountDown
                                    until={count}
                                    onFinish={() => setCount(0)}
                                    timeToShow={['S']}
                                    size={20}
                                    timeLabels={{ s: null }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    digitStyle={{ backgroundColor: '#FFF' }}
                                />
                            )}
                            <Field
                                component={Input}
                                name="otp"
                                iconLeft={faMobileAlt}
                                placeholder="Nhập mã otp"
                                keyboardType="numeric"
                                underLine
                            />

                            <ButtonCustom
                                styleContain={{ backgroundColor: AppColor.BUTTON_MAIN, marginTop: "10%" }}
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