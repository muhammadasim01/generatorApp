import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';

import Button from '../../components/Button';
import axios from 'axios';
import mime from 'mime';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import IconC from 'react-native-vector-icons/AntDesign';

const SpringFallSerivce7 = ({navigation, route}) => {
  const user = useSelector(state => state.Reducer.user);
  const {fromSeventhScreen} = route.params;
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [warranty, setWarranty] = useState(false);
  const [service, setService] = useState(false);

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    console.log(fromSeventhScreen, 'Hey there');
  }, []);

  const submitService = () => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      let newImages = [];

      if (fromSeventhScreen) {
        console.log(user.user.id);
        if (fromSeventhScreen.extraImages) {
          fromSeventhScreen.extraImages.map(item => {
            newImages.push(item.photo_id);
          });
        }
        console.log(newImages);
        let newArray = [];
        fromSeventhScreen.checked.map(item => {
          newArray.push(item.name);
        });
        console.log(newArray);
        data.append('user_id', fromSeventhScreen.fromfirstScreen.user_id);
        data.append('tech_id', user.user.id);
        data.append('notes', note);
        newArray.map(item => {
          data.append('materials[]', item);
        });

        data.append(
          'date',
          new Date()
            .toISOString()
            .replace(/T.*/, '')
            .split('-')
            .reverse()
            .join('-'),
        );
        data.append('time', new Date().toLocaleTimeString());

        data.append('inside_transfer_switch', {
          uri:
            Platform.OS === 'android'
              ? fromSeventhScreen.inside_transfer_switch.uri
              : fromSeventhScreen.inside_transfer_switch.uri.replace(
                  'file://',
                  '',
                ),
          type: mime.getType(fromSeventhScreen.inside_transfer_switch.uri),
          name: fromSeventhScreen.inside_transfer_switch.fileName,
        });
        data.append('outside_transfer_switch', {
          uri:
            Platform.OS === 'android'
              ? fromSeventhScreen.outside_transfer_switch.uri
              : fromSeventhScreen.outside_transfer_switch.uri.replace(
                  'file://',
                  '',
                ),
          type: mime.getType(fromSeventhScreen.outside_transfer_switch.uri),
          name: fromSeventhScreen.outside_transfer_switch.fileName,
        });
        data.append('inside_generator', {
          uri:
            Platform.OS === 'android'
              ? fromSeventhScreen.inside_generator.uri
              : fromSeventhScreen.inside_generator.uri.replace('file://', ''),
          type: mime.getType(fromSeventhScreen.inside_generator.uri),
          name: fromSeventhScreen.inside_generator.fileName,
        });

        data.append('outside_generator', {
          uri:
            Platform.OS === 'android'
              ? fromSeventhScreen.outside_generator.uri
              : fromSeventhScreen.outside_generator.uri.replace('file://', ''),
          type: mime.getType(fromSeventhScreen.outside_generator.uri),
          name: fromSeventhScreen.outside_generator.fileName,
        });
        data.append(
          'service_type',
          fromSeventhScreen.fromfirstScreen.service_type,
        );
        data.append('status', selected ? 'incomplete' : 'complete');
        data.append('po', fromSeventhScreen.po);
        data.append(
          'generator_id',
          fromSeventhScreen.fromfirstScreen.generator_id,
        );

        newImages.map(item => {
          if (item) {
            data.append('photo[]', item);
          }
        });
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: `Bearer ${user.access_token}`,
          },
          body: data,
        };

        fetch(
          'https://generator.thecodelogy.com/api/service-call',
          requestOptions,
        )
          .then(response => response.text())
          .then(result => {
            console.log(result);

            resolve(result);
          })
          .catch(error => {
            resolve('Something went wrong');
          });
      }
    });
  };
  // return new Promise ()

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
          Please add all job related notes here
        </Text>
        <View style={{}}>
          <TextInput
            activeUnderlineColor="transparent"
            numberOfLines={4}
            multiline={true}
            value={note}
            onChangeText={text => setNote(text)}
            underlineColor="tranparent" // add this
            outlineColor="tranparent"
            style={{
              backgroundColor: 'white',
              textAlignVertical: 'top',
              color: '#202020',
              height: 300,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: '#0048908F',
              padding: 10,
              backgroundColor: '#FFFFFF',
              marginBottom: 50,
            }}
          />
        </View>
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

        <Button
          title={'Finish'}
          onPress={() => {
            setLoading(true);
            submitService()
              .then(() => {
                Toast.show('Uploading Done');

                setLoading(false);
                navigation.replace('TechnicalMain');
              })
              .catch(() => {
                Toast.show('Something Went Wrong');

                setLoading(false);
              });
          }}
          width={250}
        />
        <Button
          title={'Finish & Start service call'}
          onPress={() => {
            setService(true);
            submitService()
              .then(() => {
                Toast.show('Uploading Done');

                setService(false);

                navigation.replace('ServiceCall1', {
                  fromfirstScreen: {
                    service_type: 'Service Call',
                    user_id: fromSeventhScreen.fromfirstScreen.user_id,
                    generator_id:
                      fromSeventhScreen.fromfirstScreen.generator_id,
                  },
                });
              })
              .catch(() => {
                Toast.show('Something Went Wrong');

                setService(false);
              });
          }}
          width={250}
        />
        <Button
          title={'Finish & Start Warranty call'}
          onPress={() => {
            setWarranty(true);
            submitService()
              .then(() => {
                Toast.show('Uploading Done');

                setWarranty(false);
                navigation.replace('SpringFallSerivce1', {
                  fromfirstScreen: {
                    service_type: 'Warranty Service',
                    user_id: fromSeventhScreen.fromfirstScreen.user_id,
                    generator_id:
                      fromSeventhScreen.fromfirstScreen.generator_id,
                  },
                });
              })
              .catch(() => {
                Toast.show('Something Went Wrong');

                console.log('EEEE');
                setWarranty(false);
              });
          }}
          width={250}
        />
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
      {service && (
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
      {warranty && (
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

export default SpringFallSerivce7;

const styles = StyleSheet.create({});
