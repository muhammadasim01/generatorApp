import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import mime from 'mime';

import React, {useState} from 'react';
import Layout from '../../components/Layout';
import Camera from 'react-native-vector-icons/Feather';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import axios from 'axios';
let width = Dimensions.get('screen').width / 2.6;
let height = Dimensions.get('screen').height / 7;
const SpringFallSerivce6 = ({navigation, route}) => {
  const {fromSixthScreen} = route.params;
  const [selectedIndex, setSelectedIndex] = useState('');
  const user = useSelector(state => state.Reducer.user);

  const [image, setImage] = useState([
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
    {
      id: 5,
      image: null,
    },
    {
      id: 6,
      image: null,
    },
    {
      id: 7,
      image: null,
    },
    {
      id: 8,
      image: null,
    },
  ]);

  const getImage = index => {
    launchCamera({noData: true, quality: 0.6}, response => {
      console.log(response, 'HHHHHH');

      if (response.assets) {
        setSelectedIndex(index);
        var newImage = {
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
          type: mime.getType(response.assets[0].uri),
          name: response.assets[0].fileName,
        };
      } else {
        setSelectedIndex('index');
      }

      var data = new FormData();

      data.append('photo', newImage);

      var config = {
        method: 'post',
        url: 'http://generatorapp.titanbyte.co/api/service-call-photo',
        headers: {
          'Content-Type': 'multipart/form-data',

          Authorization: `Bearer ${user.access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (res) {
          let newArray = [...image];
          newArray[index].image = response.assets[0];
          newArray[index].photo_id = res.data.photo_id;
          setSelectedIndex('');
          console.log(newArray, 'FJAJFAJFAJF');
          setImage(newArray);
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
          setSelectedIndex('');
        });
    });
  };
  return (
    <Layout back navigation={navigation}>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 10,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          If Needed take extra pictures
        </Text>

        <FlatList
          data={image}
          numColumns={2}
          renderItem={({item, index}) => (
            <View>
              {!item.image ? (
                <TouchableOpacity
                  onPress={() => getImage(index)}
                  style={{
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#0048908F',
                    height: height,
                    width: width,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    padding: 20,

                    alignItems: 'center',
                  }}>
                  {selectedIndex === index ? (
                    <ActivityIndicator color={'#0048908F'} size={'large'} />
                  ) : (
                    <Camera color={'#004890'} name="camera" size={40} />
                  )}
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#0048908F',
                    height: height,
                    width: width,
                    marginHorizontal: 10,
                  }}>
                  <Image
                    source={{uri: item.image.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                </View>
              )}
            </View>
          )}
        />
        <View style={{marginVertical: 30}}>
          <Button
            title={'Next'}
            width={160}
            onPress={() => {
              if (image.some(e => e.image != null)) {
                let newData = {
                  ...fromSixthScreen,
                  extraImages: image,
                };
                console.log(newData);
                navigation.navigate('SpringFallSerivce7', {
                  fromSeventhScreen: newData,
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

export default SpringFallSerivce6;

const styles = StyleSheet.create({});
