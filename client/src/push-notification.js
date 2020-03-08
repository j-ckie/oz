import firebase from "firebase";
import config from "./util/config";


export const initializeFirebase = () => {
    firebase.initializeApp(config);
};

const askForPermToRecieveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log("Given token:", token);

        return token;
    } catch (error) {
        console.error(error);
    };
};

export default askForPermToRecieveNotifications;