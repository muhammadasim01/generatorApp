import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useSelector} from 'react-redux';
const ServiceImages = ({navigation, route}) => {
  const {id} = route.params;
  const user = useSelector(state => state.Reducer.user);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append('sdate', '05-12-2022');
    formdata.append('edate', '12-12-2022');

    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',

        Authorization: `Bearer ${user.access_token}`,
      },
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `http://generatorapp.titanbyte.co/api/all-images?id=${id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        setData(JSON.parse(result).images);
        console.log(JSON.parse(result), 'AAAAAAA');
      })
      .catch(error => console.log('error', error));
  }, []);
  return (
    <Layout back={true} navigation={navigation}>
      <View
        style={{
          height: 350,
          marginBottom: 100,
        }}>
        {data.map((item, i) => {
          console.log(`http://generatorapp.titanbyte.co/api/storage/${item}`);
          if (i === index) {
            return (
              <Image
                source={{
                  uri: `http://generatorapp.titanbyte.co/api/storage/${item}`,
                }}
                style={{height: '100%', width: '100%'}}
              />
            );
          }
        })}
      </View>
      {data.length ? (
        <Text
          style={{
            color: '#222222',
            fontWeight: '400',
            marginVertical: 5,
            alignSelf: 'center',
            marginHorizontal: 30,
            textAlign: 'center',
            bottom: 70,
            fontSize: 16,
          }}>
          {index + 1}/{data.length}
        </Text>
      ) : null}
      {data.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (index != 0) {
                setIndex(index - 1);
              }
            }}
            style={{
              height: 50,
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#004890',
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="arrowleft" size={25} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (index != data.length - 1) setIndex(index + 1);
            }}
            style={{
              height: 50,
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#004890',
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="arrowright" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : null}
    </Layout>
  );
};

export default ServiceImages;

const styles = StyleSheet.create({});
