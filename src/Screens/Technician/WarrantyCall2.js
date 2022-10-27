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
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import Camera from 'react-native-vector-icons/Feather';
import {launchCamera} from 'react-native-image-picker';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import mime from 'mime';
import SimpleToast from 'react-native-simple-toast';
import IconC from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useEffect} from 'react';
let width = Dimensions.get('screen').width / 2.6;
let height = Dimensions.get('screen').height / 7;

const SpringFallSerivce6 = ({navigation, route}) => {
  var {fromSecondScreen} = route.params;
  const user = useSelector(state => state.Reducer.user);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
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
  useEffect(() => {
    console.log('TOKEN',`Bearer ${user.access_token}`);
  }, []);
  const submitService = () => {
    // console.log(fromSecondScreen);
    let data = new FormData();
    let newImages = [];

    if (fromSecondScreen) {
      setLoading(true);
      console.log(image[0], 'FFFFAFAFAFAFAFAAFAFRFRFR');
      if (image.some(e => e.photo_id != null)) {
        image.map(item => {
          // console.log(item);
          newImages.push(item.photo_id);
        });
        console.log(newImages, 'AAAAAAAAA');
        console.log('fromSecondScreen', fromSecondScreen);
        var newArray = [];
        fromSecondScreen.customData.map(item => {
          newArray.push(item.name);
        });
        console.log(newArray, 'Material Test 123');
        data.append('user_id', fromSecondScreen.user_id);
        data.append('condition', fromSecondScreen.condition);
        data.append('generator_id', fromSecondScreen.generator_id);
        data.append('hours', fromSecondScreen.hours);
        data.append('model', fromSecondScreen.model);
        data.append('description', fromSecondScreen.ownerDescriptionOfProblem);
        data.append('po', fromSecondScreen.po);
        data.append('serial', fromSecondScreen.serial);
        data.append('service_type', 'Warranty Call');
        data.append('worked_perform', fromSecondScreen.workedPerformed);
        data.append('date', fromSecondScreen.date);
        data.append('time', fromSecondScreen.time);
        data.append('status', selected ? 'incomplete' : 'complete');
        // data.append('custom_field', newArray);
        newArray.map(item => {
          data.append('custom_field[]', item);
        });
        newImages.map(item => {
          if (item) {
            data.append('photo[]', item);
          }
        });
        setLoading(false);
        console.log('DATA', data);
        console.log('IS THIS AN ARRAY', newArray);
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: `Bearer ${user.access_token}`,
          },
          body: data,
        };

        fetch(
          'http://generatorapp.titanbyte.co/api/warranty-call',
          requestOptions,
        )
          .then(response => response.text())
          .then(result => {
            console.log(result, 'FFFFFFFFF');
            setLoading(false);

            Toast.show(result);
            navigation.replace('TechnicalMain');
          })
          .catch(error => {
            setLoading(false);
            console.log(error);

            Toast.show('Something Went Wrong');
          });
      } else {
        setLoading(false);

        SimpleToast.show('Image is required.');
      }
    }
  };

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
        url: 'http://generatorapp.titanbyte.co/api/warranty-call-photo',
        headers: {
          'Content-Type': 'multipart/form-data',

          'Authorization': `Bearer ${user.access_token}`,
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
          console.log(res.data, 'CCCAHGAJFJAFJAFJAJFFAJ');
        })
        .catch(function (error) {
          console.log(error);
          setSelectedIndex('');
        });
    });
  };
  return (
    <>
      <Layout back navigation={navigation}>
        <Text
          style={{
            color: '#222222',
            fontWeight: 'bold',
            marginVertical: 10,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
          }}>
          Please take all applicable pictures for this job here
        </Text>
        <View
          style={{
            flex: 1,

            // alignItems: 'center',

            padding: 10,
            marginBottom: 10,
          }}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={image}
            numColumns={2}
            renderItem={({item, index}) => (
              <View style={{}}>
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
                      // flex:0.5,

                      marginHorizontal: 5,
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

                      marginHorizontal: 5,
                      height: height,
                      width: width,

                      // flex: 0.5,
                      // width:160
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
        </View>
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setSelected(!selected);
            }}>
            <View
              style={{
                backgroundColor: selected ? '#004890' : '#FFFFFF',
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#004890',
              }}>
              <IconC name="check" color={'#FFFFFF'} size={20} />
            </View>
            <Text
              style={{
                fontSize: 17,
                color: '#222222',
                marginHorizontal: 10,
                fontWeight: '500',
              }}>
              Incomplete Job
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          <Button
            title={'Finish'}
            width={160}
            onPress={() => {
              submitService();
              // navigation.navigate("SpringFallSerivce7",{
              //   fromSeventhScreen : newData
              // })
            }}
          />
        </View>
      </Layout>
      {loading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: '#000',
            opacity: 0.8,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: '30%',
              width: '80%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#000'} size="large" />
            <Text style={{color: '#000', marginVertical: 10, fontSize: 18}}>
              Please wait images uploading...
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default SpringFallSerivce6;

const styles = StyleSheet.create({});

// returns array("foo" => "bar")
