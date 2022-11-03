import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import Service from '../../components/Service';
import axios from 'axios';
import {useSelector} from 'react-redux';

const InCompleteService = ({navigation}) => {
  const user = useSelector(state => state.Reducer.user);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = () => {
    setLoading(true);

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
      `https://generatorapp.titanbyte.co/api/incomplete-service-call?user_id=${user.user.id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let res = JSON.parse(result);
        console.log(res);
        setData(res.serviceCallHistory);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <Layout back={true} navigation={navigation}>
      {loading ? (
        <View
          style={{
            marginVertical: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={'#000'} size="large" />
        </View>
      ) : (
        <>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{color: '#222222', fontWeight: 'bold', marginVertical: 5}}>
              Incomplete Service Call History{' '}
            </Text>
            {data[0] ? (
              <Text
                style={{
                  color: '#222222',
                  fontWeight: 'bold',
                  marginVertical: 5,
                }}>
                Last Service Call: {data[0].date}
              </Text>
            ) : null}
          </View>

          <FlatList
            style={{marginTop: 10}}
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
        </>
      )}
    </Layout>
  );
};

export default InCompleteService;

const styles = StyleSheet.create({});
