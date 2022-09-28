
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-simple-toast'

export const InternetCheck = () => {
    return new Promise(async resolve => {
        NetInfo.fetch().then(state => {
            if (
                (state.isConnected && state.isInternetReachable) ||
                state.isInternetReachable === null
            ) {
                resolve(true);
                return;
            } else {
                if (!state.isConnected) {
                    Toast.show("Internet is not connected!")

                    resolve(false);
                    return;
                } else if (!state.isInternetReachable) {
                    Toast.show("Internet is not reachable!")


                    resolve(false);
                    return;
                } else {
                    Toast.show("Something went wrong with your Internet Connection!")
                        ;
                    resolve(false);
                    return;
                }
            }
        });
    })//end of PROMISE
}//end 