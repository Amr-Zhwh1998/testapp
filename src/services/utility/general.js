import moment from "moment";
import { useContext } from "react";
import { TranslationContext } from "../context/TranslationContext";
import { Alert, Platform, ToastAndroid } from "react-native";


export function notifyMessage(title, msg=undefined)
{
    if (Platform.OS === 'android')
    {
        msg?ToastAndroid.show(`${title}: ${msg}`, ToastAndroid.SHORT):ToastAndroid.show(`${title}`, ToastAndroid.SHORT)
        
    } else
    {
        Alert.alert(title, msg, [{}], { cancelable: true });
    }
}