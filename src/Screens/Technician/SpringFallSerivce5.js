import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import Camera from 'react-native-vector-icons/Feather';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';
import SimpleToast from 'react-native-simple-toast';

const SpringFallSerivce5 = ({navigation, route}) => {
  const {fromFifthScreen} = route.params;

  const [image, setImage] = useState(null);

  const getImage = () => {
    launchCamera({noData: true, quality: 1}, response => {
      console.log(response, 'HHHHHH');

      if (response.assets) {
        setImage(response.assets[0]);
      }
    });
  };
  return (
    <Layout back navigation={navigation}>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View>
          <Text
            style={{
              color: '#222222',
              fontWeight: 'bold',
              marginVertical: 10,
              alignSelf: 'center',
              marginHorizontal: 30,
              textAlign: 'center',
            }}>
            Image of Outside of generator
          </Text>
          {!image ? (
            <TouchableOpacity
              onPress={getImage}
              style={{
                backgroundColor: 'white',
                marginVertical: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#0048908F',
                height: 300,

                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Camera color={'#004890'} name="camera" size={100} />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                marginVertical: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#0048908F',
                height: 300,
              }}>
              <Image
                source={{uri: image.uri}}
                style={{height: '100%', width: '100%'}}
              />
            </View>
          )}
        </View>
        <View style={{marginVertical: 200}}>
          <Button
            title={'Next'}
            width={160}
            onPress={() => {
              if (image) {
                let newData = {
                  ...fromFifthScreen,
                  outside_generator: image,
                };
                navigation.replace('SpringFallSerivce6', {
                  fromSixthScreen: newData,
                });
              } else {
                SimpleToast.show('Image is required.');
              }
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default SpringFallSerivce5;

const styles = StyleSheet.create({});
