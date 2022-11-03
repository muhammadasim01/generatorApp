import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Location from '../../Helper/MobileLocation';
import Geolocation from '@react-native-community/geolocation';
import {calculateDistance} from '../../Helper/DistanceCalculator';
import MobileLocation from '../../Helper/MobileLocation';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const Map = ({navigation}) => {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const user = useSelector(state => state.Reducer.user);
  const [loading, setLoading] = useState(false);
  const [location, setLocaton] = useState({});
  const [itemDirection, setItemDirection] = useState(false);

  const onMapReady = e => {};

  const onRegionChange = region => {
    console.log('onRegionChange', region);
  };

  const onRegionChangeComplete = region => {
    console.log('onRegionChangeComplete', region);
  };

  const getDirection = () => {};

  const getUsersLocation = async () => {
    let res = await MobileLocation.getCurrentLocation();
    console.log(res, 'IOS LOCATION');

    if (res === undefined) {
      setTimeout(async () => {
        res = await MobileLocation.getCurrentLocation();
        if (res) {
          setLat(location.coords.latitude);
          setLong(location.coords.longitude);
        }
      }, 1000);
    } else {
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
    }
  };
  useEffect(() => {
    getUsersLocation();
    console.log(lat, long, 'Fazzy');
    setLoading(true);

    Geolocation.getCurrentPosition(
      async position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        var config = {
          method: 'get',
          url: 'https://generatorapp.titanbyte.co/api/my-customers',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.access_token}`,
          },
          data: {
            tech_id: user.user.id,
          },
        };

        axios(config)
          .then(function (response) {
            console.log(response.data);
            if (response.data) {
              setData(response.data);
            }
             setCustomers(response.data.data)
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
          });
      },
      async error => {
        console.log(error.message);
        if (Platform.OS === 'android') {
          await _enableGPS();
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 15000,
      },
    );
  }, []);
  return (
    <Layout back={true} navigation={navigation}>
      <View style={{flex: 1, height: 600}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            onMapReady={onMapReady}
            showsMyLocationButton={false}
            onRegionChange={onRegionChange}
            onRegionChangeComplete={onRegionChangeComplete}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {data.map(item => {
              console.log(item, 'KKKKKKK');
              return (
                <Marker
                  onPress={() => {
                    navigation.navigate('CustomerDetial2', {
                      item: item.customer,
                    });
                    console.log(item, 'Hello');
                    let lat = parseFloat(item.latitude);
                    let lon = parseFloat(item.longitude);

                    if (Platform === 'android' || 'ios') {
                      Linking.openURL(
                        `https://www.google.com/maps/dir/?api=1&origin=` +
                          lat +
                          `,` +
                          long +
                          `&destination=` +
                          lat +
                          `,` +
                          lon +
                          `&travelmode=driving`,
                      );
                    } else {
                      console.log('Something Went Wrong?');
                    }
                  }}
                  title={item.customer.fname}
                  draggable
                  pinColor="#1A98D5"
                  coordinate={{
                    latitude: parseFloat(item.customer.latitude),
                    longitude: parseFloat(item.customer.longitude),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  onCalloutPress={e => {
                    console.log('Marker was clicked', e);
                  }}></Marker>
              );
            })}
          </MapView>
        )}
      </View>
    </Layout>
  );
};

export default Map;

const styles = StyleSheet.create({});
