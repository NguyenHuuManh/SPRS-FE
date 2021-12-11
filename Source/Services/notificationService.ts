import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { apiUpdateStatusNotification } from '../ApiFunction/Notification';
import { navigate } from '../Helper/RootNavigation';
import { badgeShowActions, UpdateAddressDeviceActions, userActions } from '../Redux/Actions';
import { badgeRequest } from '../Redux/Actions/BadgeShowActions';
import { netWorkChecking } from '../Redux/Actions/NetworkActions';
import Geolocation from 'react-native-geolocation-service';
import { store } from '../Store';
import { apiPlaceDetailByLongLat } from '../ApiFunction/PlaceAPI';
import { findIndex } from 'lodash';
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const notificationListener = async (callBack?: any) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, "remoteMessage")
        Toast.show({
            type: "success",
            text2: remoteMessage.notification.body,
            text1: remoteMessage.notification.title,
            position: "top"
        });
        store.dispatch(badgeRequest());

    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                );
                // callBack(remoteMessage);
                const item = remoteMessage.data;

                if (['rp', 'st', 'sos', 'org'].includes(item.type)) {
                    apiUpdateStatusNotification({ id: item.id, status: "read" }).then((e) => {
                        if (e.status == 200) {
                            if (e.data.code == '200') {
                                store.dispatch(badgeShowActions.badgeRequest());
                            }
                        } else {
                            console.log("err");
                        }
                    });
                    navigate("DetailPoint", { point: { id: item.sender, type: item.type }, from: 'MapCluser' });
                } else {
                    navigate('NotificationDetail', { item, isBack: true });
                }
            }
        });

}

export const networkListener = async () => {
    // Subscribe
    NetInfo.addEventListener(state => {
        store.dispatch(netWorkChecking(state.isConnected));
    });
}

export const getAddressId = async () => {
    const id = await AsyncStorage.getItem("AddressId");
    return id
}

export const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        (response) => {
            const coords = response.coords
            apiPlaceDetailByLongLat(coords.longitude, coords.latitude).then((responsePlace) => {
                if (responsePlace.status == 200) {
                    const place = responsePlace?.data?.results[0]?.address_components;
                    const index = findIndex(place, function (e: any) {
                        return e.long_name + '' == 'Việt Nam';
                    })
                    let indexAddress = index >= 0 ? index : place.length
                    AsyncStorage.getItem("AddressId").then((id) => {
                        const body = {
                            id: id,
                            city: {
                                name: place[indexAddress - 1]?.long_name,
                                id: null,
                                code: null,
                            },
                            district: {
                                name: place[indexAddress - 2]?.long_name,
                                id: null,
                                code: null,
                            },
                            subDistrict: {
                                name: place[indexAddress - 3]?.long_name,
                                id: null,
                                code: null,
                            },
                            addressLine: "",
                            addressLine2: "",
                            GPS_lati: coords.latitude + "",
                            GPS_long: coords.longitude + "",
                            gps_lati: coords.latitude + "",
                            gps_long: coords.longitude + "",
                        }
                        store.dispatch(UpdateAddressDeviceActions.updateRequest(body));
                    })
                }
            });
        },
        (error) => { console.log("errorCurrentLocation", error) },
        {
            distanceFilter: 1000,
            enableHighAccuracy: true
        }
    );
}
// export const resetReducerUser = () => {
//     store.dispatch(userActions.logout());
// }