import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
// import {TextInput} from 'react-native-paper'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
const ServiceCall1 = ({navigation, route}) => {
  const {item} = route.params;
  console.log('we got these resuls', item);
  const user = useSelector(state => state.Reducer.user);

  const [isVisible, setIsVisible] = useState(false);
  const [customStep, setCustomStep] = useState('');
  const [po, setPo] = useState(Math.floor(Math.random() * 90000) + 10000);
  const [note, setNote] = useState(item.notes);
  const [data, setData] = useState([]);
  return (
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

      {/* <Text style = {{color:"#222222",fontWeight:"bold",marginVertical:10}}>PO #</Text> */}
      {/* <View style={{flexDirection: 'row'}}>
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          PO #
        </Text>
        <TextInput
          activeUnderlineColor="transparent"
          value={`${po}`}
          underlineColor="tranparent" // add this
          outlineColor="tranparent"
          style={{
            height: 40,

            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            backgroundColor: 'white',
            width: 80,
            marginHorizontal: 10,
            color: '#000',
            paddingLeft: 10,
          }}
        />
      </View> */}
      <View style={{}}>
        <TextInput
          activeUnderlineColor="transparent"
          numberOfLines={3}
          multiline={true}
          value={note}
          onChangeText={text => setNote(text)}
          style={{
            backgroundColor: 'white',
            textAlignVertical: 'top',
            color: '#000',
            height: 200,
            marginVertical: 20,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            backgroundColor: '#FFFFFF',
            marginBottom: 10,
          }}
        />
      </View>

      {data.length ? (
        <View
          style={{
            marginVertical: 20,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            padding: 10,
            backgroundColor: '#FFFFFF',
            marginBottom: 10,
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={{padding: 10, borderBottomWidth: 1}}>
                <Text style={{color: '#000'}}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
            Date#
          </Text>
          <TextInput
            activeUnderlineColor="transparent"
            editable={false}
            value={`${new Date().toLocaleDateString()}`}
            //  onChangeText = {(text)=>setPo(text)}

            underlineColor="tranparent" // add this
            outlineColor="tranparent"
            style={{
              height: 40,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingLeft: 10,

              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: '#0048908F',
              backgroundColor: 'white',
              width: 100,
              marginHorizontal: 10,
              fontSize: 12,
              textAlign: 'left',
              color: '#000',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000', fontWeight: 'bold', marginVertical: 10}}>
            Time#
          </Text>
          <TextInput
            activeUnderlineColor="transparent"
            value={`${new Date().toLocaleTimeString()}`}
            editable={false}
            underlineColor="tranparent" // add this
            outlineColor="tranparent"
            style={{
              height: 40,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: '#0048908F',
              backgroundColor: 'white',
              width: 80,
              marginHorizontal: 10,
              fontSize: 12,
              color: '#000',
              paddingLeft: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <Button
          title={'Add Part'}
          width={150}
          onPress={() => {
            setIsVisible(true);
          }}
        />
        <Button
          title={'Update'}
          width={150}
          onPress={() => {
            let newArray = [];
            data.map(item => {
              newArray.push(item.name);
            });
            console.log(newArray);
            var formData = new FormData();
            formData.append('id', item.id);
            formData.append('tech_id', item.tech_id);
            formData.append(
              'date',
              new Date()
                .toISOString()
                .replace(/T.*/, '')
                .split('-')
                .reverse()
                .join('-'),
            );
            formData.append('time', new Date().toLocaleTimeString());
            formData.append('notes', note);
            newArray.map(item => {
              formData.append('materials[]', item);
            });

            var requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data;',

                Authorization: `Bearer ${user.access_token}`,
              },
              body: formData,
            };

            fetch(
              'https://generatorapp.titanbyte.co/api/callhistory-update',
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                console.log(result, 'AAARRRREREREREERER');
                SimpleToast.show(result);
                navigation.goBack();
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        />
      </View>
      <Modal isVisible={isVisible}>
        <View style={styles.viewModal}>
          <View style={styles.textModal1}>
            <View />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
              }}>
              Add Part
            </Text>
            <Entypo
              name="circle-with-cross"
              color={'#FFFFFF'}
              size={30}
              style={{marginHorizontal: 5}}
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 25}}>
            <TextInput
              //   label="Email"
              value={customStep}
              onChangeText={text => setCustomStep(text)}
              activeUnderlineColor="transparent"
              underlineColor="tranparent" // add this
              outlineColor="tranparent"
              style={{
                height: 50,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderWidth: 1,
                borderColor: '#0048908F',
                marginVertical: 10,
                backgroundColor: '#FFFFFF',
                color: '#000',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',

              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                width: '50%',
                alignSelf: 'center',

                borderRadius: 5,
              }}>
              <TouchableOpacity
                style={styles.otCancel}
                onPress={() => {
                  let newArray = [...data];
                  newArray.push({
                    id: data.length,
                    name: customStep,
                    custom: true,
                  });
                  setData(newArray);
                  setIsVisible(false);
                  setCustomStep('');
                }}>
                <Text style={styles.textCancel1}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default ServiceCall1;

const styles = StyleSheet.create({
  viewModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // paddingHorizontal: wp(6),
    // marginTop: hp(10),
    // paddingVertical: hp(3),
  },
  textModal2: {
    fontSize: hp(2.2),
    color: '#000',
    marginVertical: hp(0.5),
  },
  textModal3: {
    fontSize: hp(2.4),
    color: '#004890',
  },
  textModal1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#004890',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    borderColor: '#1A98D5',
  },
  textCancel: {
    fontSize: hp(2),

    textAlign: 'center',
    color: '#FFFFFF',
  },
  textCancel1: {
    fontSize: hp(2),

    textAlign: 'center',
    color: '#fff',
  },
  otCancel: {
    backgroundColor: '#004890',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
