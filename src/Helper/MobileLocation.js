import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Linking, Alert, Platform, NativeModules} from 'react-native';

import Permission from './Permissions';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// 40.7475-73.940885

let call = 0;
let callPermission = 0;
let isShowed = false;
let watchID = null;

export default {
  getCurrentLocation() {
    return new Promise(async resolve => {
      if (Platform.OS === 'android') {
        await Permission.LOCATION();
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            Geolocation.getCurrentPosition(
              position => {
                resolve(position);
              },
              error => {
                if (error.message.includes('Location request timed out')) {
                  if (call < 5) {
                    this.getCurrentLocation();
                    call++;
                  }
                }
                if (
                  error.message.includes('Location permission was not granted')
                ) {
                  Permission.LOCATION();
                  if (callPermission < 5) {
                    this.getCurrentLocation();
                    callPermission++;
                  }
                }
                resolve(undefined);
              },
            );

            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then(result => {
                switch (result) {
                  case RESULTS.UNAVAILABLE:
                    resolve(undefined);
                    if (isShowed) return;

                    const title0 = `Location services is off!`;
                    const message0 = `Please, enable location from mobile setting.`;
                    customAlert(title0, message0);
                    isShowed = true;

                    break;
                  case RESULTS.DENIED:
                    if (isShowed) return;
                    const title1 =
                      'The permission has not been requested / is denied but requestable';
                    customAlert(
                      title1,
                      '',
                      () => {
                        Geolocation.requestAuthorization();
                      },
                      true,
                    );
                    isShowed = true;
                    this.getCurrentLocation();
                    break;
                  case RESULTS.LIMITED:
                    if (isShowed) return;
                    const title2 =
                      'The permission is limited: some actions are possible';

                    customAlert(title2, '', () => {}, true);
                    isShowed = true;
                    break;
                  case RESULTS.GRANTED:
                    Geolocation.getCurrentPosition(
                      position => {
                        resolve(position);
                      },
                      error => {
                        resolve(undefined);
                      },
                      {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 15000,
                      },
                    );
                    break;
                  case RESULTS.BLOCKED:
                    resolve(undefined);
                    if (isShowed) return;
                    const title3 =
                      'The permission is denied and not requestable anymore';
                    customAlert(title3, '', () => {}, true);
                    isShowed = true;

                    break;
                }
              })
              .catch(error => {
                // …

                resolve(undefined);
              });
          })
          .catch(err => {
            if (err.message.includes('denied')) {
              this.getCurrentLocation();
            }
            resolve(undefined);
          });
      } else {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            resolve(undefined);
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 15000,
          },
        );
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                resolve(undefined);
                if (isShowed) return;

                const title0 = `Location services is off!`;
                const message0 = `Please, enable location from mobile setting.`;

                customAlert(title0, message0);
                isShowed = true;

                break;
              case RESULTS.DENIED:
                if (isShowed) return;
                const title1 =
                  'The permission has not been requested / is denied but requestable';

                customAlert(
                  title1,
                  '',
                  () => {
                    Geolocation.requestAuthorization();
                  },
                  true,
                );
                isShowed = true;
                this.getCurrentLocation();
                break;
              case RESULTS.LIMITED:
                if (isShowed) return;
                const title2 =
                  'The permission is limited: some actions are possible';

                customAlert(title2, '', () => {}, true);
                isShowed = true;
                break;
              case RESULTS.GRANTED:
                Geolocation.getCurrentPosition(
                  position => {
                    resolve(position);
                  },
                  error => {
                    resolve(undefined);
                  },
                  {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0,
                  },
                );
                Geolocation.getCurrentPosition(
                  position => {
                    resolve(position);
                  },
                  error => {
                    // See error code charts below.
                    resolve(undefined);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 3000,
                    maximumAge: 0,
                    forceRequestLocation: true,
                    forceLocationManager: true,
                    showLocationDialog: true,
                  },
                );

                break;
              case RESULTS.BLOCKED:
                resolve(undefined);
                if (isShowed) return;
                const title3 =
                  'The permission is denied and not requestable anymore';

                customAlert(title3, '', () => {}, true);
                isShowed = true;

                break;
            }
          })
          .catch(error => {
            // …

            resolve(undefined);
          });
      }
    }); //end of PROMISE
  }, //end of getCurrentLocation

  watchPositon() {
    watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
    });
  },
}; //end of EXPORT DEFAULT

function customAlert(
  title,
  description,
  onPress = () => {
    Linking.openSettings();
  },
  singleButton = false,
) {
  if (singleButton) {
    Alert.alert(
      title,
      description,
      [
        {
          text: `OK`,
          style: 'cancel',
          onPress() {
            onPress();
          },
        },
      ],
      {cancelable: true},
    );

    return;
  }
  Alert.alert(
    title,
    description,
    [
      {
        text: `Cancel`,
        style: 'cancel',
      },
      {
        text: `Settings`,
        style: 'destructive',
        onPress() {
          Linking.openURL('app-settings');
          onPress();
        },
      },
    ],
    {cancelable: true},
  );
}
