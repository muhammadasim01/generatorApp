import {Platform, PermissionsAndroid} from 'react-native';

export default {
  STORAGE() {
    return new Promise(async resolve => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Your Save flow
            resolve(true);
          }
        } else {
          // iOS here, so you can go to your Save flow directly
          resolve(true);
        }
      } catch (e) {
        resolve(false);
      }
    }); //end of PROMISE
  }, //end of STORAGE

  LOCATION() {
    return new Promise(async resolve => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Your Save flow
            resolve(true);
          }
        } else {
          // iOS here, so you can go to your Save flow directly
          resolve(true);
        }
      } catch (e) {
        resolve(false);
      }
    }); //end of PROMISE
  }, //end of LOCATION

  CAMERA() {
    return new Promise(async resolve => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Your Save flow
            resolve(true);
          }
        } else {
          // iOS here, so you can go to your Save flow directly
          resolve(true);
        }
      } catch (e) {
        resolve(false);
      }
    }); //end of PROMISE
  }, //end of CAMERA
};
