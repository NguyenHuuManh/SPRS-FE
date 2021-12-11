import { StyleSheet } from "react-native";
export const MainStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFF",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    boxShadowItem: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    icon: {
        width: 25,
        height: 25,
    },
    homeBG: {
        // top: -wp('10%'),
        position: 'absolute',
        width: "100%",
        height: "30%",

    },
    flexRow: {
        flexDirection: "row",
    },
    flexColumn: {
        flexDirection: "column"
    },
    texError: {
        color: "red",
        marginLeft: 10,
        fontSize: 10,
    },


});
