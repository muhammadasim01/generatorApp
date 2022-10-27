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

const UserNotifications = ({navigation}) => {
  const user = useSelector(state => state.Reducer.user);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

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
      `http://generatorapp.titanbyte.co/api/customer-notifications/${2}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let res = JSON.parse(result);
        console.log(res, 'AAAA');
        setData(res);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Layout back={true} navigation={navigation}>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 5}}>
          Notifications
        </Text>
      </View>

      <FlatList
        style={{marginTop: 10}}
        data={data}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View>
              <Text
                style={{
                  color: '#222222',
                  fontWeight: '400',
                  marginVertical: 5,
                  // textAlign: 'center',
                  fontSize: 16,
                  width: 250,
                }}>
                {item.message}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{color: '#222222', marginHorizontal: 10}}>
                  Start Date :{item.sdate}
                </Text>
              </View>
              <Text style={{color: '#222222', marginHorizontal: 10}}>
                End Date : {item.edate}
              </Text>
            </View>
            <View>
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
                  marginVertical: 2,
                }}
                onPress={() => {}}>
                Edit Service
              </Text>
            </View>
          </View>
        )}
      />
    </Layout>
  );
};

export default UserNotifications;

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
