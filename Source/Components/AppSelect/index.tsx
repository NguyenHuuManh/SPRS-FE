import { faChevronDown, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { findIndex, isEmpty } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { FlatList, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { AppColor } from "../../Helper/propertyCSS";
import { MainStyle } from "../../Style/main_style";
import styles from "./styles";
interface Props {
    // name: any;
    onChangeCustom?: any;
    placeholder?: any;
    // memo?: boolean;
    customInputStyle?: ViewStyle;
    title?: string;
    iconLeft?: any;
    iconRight?: any;
    iconColor?: string;
    iconSize?: number;
    horizontal?: boolean;
    styleTitle?: any;
    data?: any;
    value?: any;
    keyValue: any;
    labelValue: any;
    inputValue: any;
    onItemSelect?: any
    disableClear?: boolean
    underLine?: any;
    disabled?: boolean
    header?: string

}

export default (props: Props) => {
    const {
        onChangeCustom,
        placeholder,
        customInputStyle,
        title, iconSize,
        iconLeft, iconColor,
        iconRight, horizontal,
        styleTitle,
        data,
        value,
        keyValue,
        labelValue,
        inputValue,
        onItemSelect,
        disableClear = true,
        underLine,
        disabled,
        header,
        ...remainProps
    } = props
    const [show, setShow] = useState(false)
    const [itemSelect, setItemSelect] = useState<any>({});

    useEffect(() => {
        if (data && data.length > 0) {
            const index = findIndex(data, function (e) {
                return keyValue(e) + "" == value + "";
            })
            if (index >= 0) {
                onSelect(data[index]);
                return;
            }
            ClearOption();
        }
        if (disableClear) return
        ClearOption();
    }, [data])

    useEffect(() => {
        const index = findIndex(data, function (e) {
            return keyValue(e) + "" == value + "";
        })
        if (index >= 0) {
            onSelect(data[index]);
            return;
        }
        // if (disableClear) return
        // ClearOption();
    }, [value])

    const onSelect = (item) => {
        onItemSelect && onItemSelect(item);
        setItemSelect(item);
        setShow(false)
    }

    const ClearOption = () => {
        setItemSelect({});
        onItemSelect && onItemSelect({});
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={keyValue(item)}
                style={{ minHeight: 50, borderBottomWidth: 0.5, justifyContent: "center", backgroundColor: `${item.id + "" == value + "" ? AppColor.BUTTON_MAIN : "#FFF"}`, paddingLeft: 10, paddingRight: 10 }}
                onPress={() => { onSelect(item) }}>
                <Text style={{ color: `${item.id + "" == value + "" ? '#FFFF' : AppColor.CORLOR_TEXT}` }}>{labelValue(item)}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.containerInput}>
            {(!horizontal && title) && (<Text style={styles.text}>{title}</Text>)}
            <View style={{ flexDirection: "row" }}>
                {(horizontal && title) && (<View style={[styles.containText, styleTitle]}><Text style={styles.textHorizontal}>{title}</Text></View>)}
                {
                    iconLeft && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 17} color={iconColor || "#222"} icon={iconLeft} /></View>)
                }
                <TouchableOpacity
                    onPress={() => {
                        if (disabled) return;
                        setShow(true)
                    }}
                    style={[styles.input, underLine ? styles.underLine : {}]}>
                    <View style={{ width: "80%" }} pointerEvents="none" >
                        <TextInput
                            // {...field}
                            {...remainProps}
                            value={inputValue(itemSelect)}
                            placeholder={placeholder}
                            style={{ color: AppColor.CORLOR_TEXT }}
                        />
                    </View>
                    <View style={{ width: "20%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                        {
                            (!isEmpty(itemSelect) && !disabled)
                                ? (<TouchableWithoutFeedback
                                    onPress={(e) => {
                                        e.preventDefault();
                                        ClearOption();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTimesCircle} size={iconSize || 15} color={iconColor || "black"} style={{ marginRight: 10 }} />
                                </TouchableWithoutFeedback>)
                                : (<View ></View>)
                        }

                        <FontAwesomeIcon icon={faChevronDown} size={iconSize || 15} color={disabled ? 'gray' : (iconColor || "black")} />
                    </View>
                </TouchableOpacity>
                {show && <Modal
                    visible={true}
                    animationType="fade"
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => { setShow(false) }}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(60, 60, 60,0.2)' }}>
                        <TouchableWithoutFeedback
                            onPress={(e) => { e.preventDefault() }}
                            style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, MainStyle.boxShadow]}>
                            <View style={{ maxHeight: "50%", width: "80%", minHeight: "20%", backgroundColor: AppColor.MAIN_COLOR, borderRadius: 10, paddingTop: 10, paddingBottom: 20 }}>
                                <View style={{ backgroundColor: AppColor.MAIN_COLOR, paddingLeft: 10, paddingBottom: 10 }}>
                                    <Text style={{ color: "#FFFF", fontWeight: "bold" }}>{header || "Chọn"}</Text>
                                </View>
                                <FlatList
                                    data={data}
                                    keyExtractor={(item) => item?.id + ''}
                                    renderItem={renderItem}
                                    contentContainerStyle={{ backgroundColor: "#FFFF" }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                }
                {
                    iconRight && (<View style={[styles.icon]}><FontAwesomeIcon size={iconSize || 26} color={iconColor || "#222"} icon={iconRight} /></View>)
                }
            </View>
        </View >
    )
}