import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import Service from '../../components/Service';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../store/Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Reducer.user);
  const [loading, setLoading] = useState(false);
  const [pickDate, setPickDate] = useState(new Date());
  const [date2, setDate2] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState([]);

  const getServices = () => {
    var formdata = new FormData();
    formdata.append('sdate', date);
    formdata.append('edate', date2);

    var requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        Authorization: `Bearer ${user.access_token}`,
      },
      // body: formdata,
    };

    fetch(
      `https://generator.thecodelogy.com/api/complete-service-call?user_id=${user.user.id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let res = JSON.parse(result);
        console.log(res, 'GGGGG');
        setData(res.serviceCallHistory);
      })
      .catch(error => console.log('error', error));

    // var config = {
    //   method: 'post',
    //   url: 'https://generator.thecodelogy.com/api/customer-call-service',
    //   headers: {
    //     'content-type': 'application/json',
    //     Authorization: `Bearer ${user.access_token}`,
    //   },
    //   data: data,
    // };
  };

  useEffect(() => {
    console.log(
      new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-'),
    );
    getServices();
  }, []);

  const requestService = () => {
    setLoading(true);
    var data = new FormData();

    var config = {
      method: 'get',
      url: `https://generator.thecodelogy.com/api/service-call-request/${user.user.id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user.access_token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);

        Toast.show('Requested Successfully!');
      })
      .catch(function (error) {
        setLoading(false);
        Toast.show('Something went wrong!');

        console.log(error);
      });
  };

  const getParsedDate = strDate => {
    var strSplitDate = String(strDate).split('/');

    // alert(date);
    var dd = strSplitDate[0];
    var mm = strSplitDate[1];
    var yyyy = strSplitDate[2]; //January is 0!
    //January is 0!

    let date = dd + '-' + mm + '-' + yyyy;
    return date.toString();
  };

  return (
    <Layout
      logout
      logoutHandler={() => {
        AsyncStorage.clear().then(() => {
          dispatch(loginUser(null));
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
          Service Agreement Infomation
        </Text>
        <Entypo
          name="bell"
          color="#222222"
          size={30}
          onPress={() => {
            navigation.navigate('UserNotifications');
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              setOpen(true);
            }}>
            <Text
              style={{color: '#222222', fontWeight: '400', marginVertical: 10}}>
              Start Date
            </Text>
            <TextInput
              activeUnderlineColor="transparent"
              editable={false}
              value={`${date}`}
              //  onChangeText = {(text)=>setPo(text)}

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
                width: 100,
                marginHorizontal: 10,
                fontSize: 13,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              setOpen2(true);
            }}>
            <Text
              style={{color: '#222222', fontWeight: '400', marginVertical: 10}}>
              End Date
            </Text>
            <TextInput
              activeUnderlineColor="transparent"
              editable={false}
              value={`${date2}`}
              //  value={`${po}`}
              //  onChangeText = {(text)=>setPo(text)}

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
                width: 100,
                marginHorizontal: 10,
                fontSize: 13,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
            Incomplete Service
          </Text>
          <Text
            style={{color: '#222222', fontWeight: '400', marginVertical: 10}}
            onPress={() => {
              navigation.navigate('Incomplete');
            }}>
            View All
          </Text>
        </View>
      </View>

      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Service
              item={item}
              onPress={() => {
                navigation.navigate('ServiceDetial', {
                  id: item.id,
                });
              }}
            />
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 40}}>
            No service found.
          </Text>
        </View>
      )}
      <View style={{marginTop: 60}}>
        <Button
          title={'Request Service'}
          width={200}
          onPress={requestService}
          loading={loading}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={pickDate}
        onConfirm={date => {
          let newDAta = date.toLocaleDateString();
          setDate(getParsedDate(newDAta));

          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <DatePicker
        modal
        open={open2}
        date={pickDate}
        onConfirm={date => {
          let newDAta = date.toLocaleDateString();
          console.log(getParsedDate(newDAta));
          setDate2(getParsedDate(newDAta));

          setOpen2(false);
          getServices();
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
    </Layout>
  );
};

export default CustomerDashboard;

const styles = StyleSheet.create({});
