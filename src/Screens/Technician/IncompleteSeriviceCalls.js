import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import Service from '../../components/Service';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const InCompleteServiceCalls = ({navigation}) => {
  const user = useSelector(state => state.Reducer.user);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getServices();
    }, []),
  );

  const getServices = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('sdate', '15-05-2022');
    data.append('edate', '15-12-2022');
    var requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        Authorization: `Bearer ${user.access_token}`,
      },
      // body: data,
    };

    fetch(
      `https://generator.thecodelogy.com/api/incomplete-service-call?tech_id=${user.user.id}`,

      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let res = JSON.parse(result);
        console.log(res);
        setData(res.serviceCallHistory);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Layout back={true} navigation={navigation}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 5}}>
          Incomplete Service Calls
        </Text>
      </View>

      <FlatList
        style={{marginTop: 10}}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log(item);
              navigation.navigate('UpdateService', {
                item: item,
              });
            }}>
            <View>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Name : {item.customer.fname}
                {item.customer.lname}
              </Text>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                Address : {item.customer.address}
              </Text>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                Type : {item.service_type}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: '#222222', marginHorizontal: 10}}>
                  {item.date}
                </Text>
                <Text style={{color: '#222222', marginHorizontal: 10}}>
                  {item.time}
                </Text>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Icon
                name="file-document"
                color={'#004890'}
                size={25}
                style={{
                  // marginVertical:5,
                  alignSelf: 'center',
                }}
              />

              <Text
                style={{
                  color: '#222222',
                  marginHorizontal: 10,
                  textAlign: 'center',
                  marginVertical: 2,
                }}>
                Edit
              </Text>
              <Text
                style={{
                  color: item.status === 'Incomplete' ? 'red' : '#222222',
                  marginHorizontal: 10,
                  marginVertical: 2,
                }}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
};

export default InCompleteServiceCalls;

const styles = StyleSheet.create({
  card: {
    // height: 100,
    backgroundColor: '#F6F6F6',
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0048908F',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
});
