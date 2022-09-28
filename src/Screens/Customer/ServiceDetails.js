import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {TextInput} from 'react-native-paper';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import axios from 'axios';
const ServiceDetail = ({navigation, route}) => {
  const user = useSelector(state => state.Reducer.user);

  const {id} = route.params;

  const [note, setNote] = useState('');
  const [data, setData] = useState([]);
  const [call, setCall] = useState({});

  useEffect(() => {
    if (id) {
      var data = new FormData();

      var config = {
        method: 'get',
        url: `https://generator.thecodelogy.com/api/customer-call-history-detail/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data.service_call_history, 'TTTTTT');
          setData(response.data.materials);
          setNote(response.data.service_call_history.notes);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return (
    <Layout back={true} navigation={navigation}>
      <Text
        style={{
          color: '#222222',
          fontWeight: 'bold',
          marginVertical: 10,
          alignSelf: 'center',
          marginHorizontal: 30,
          textAlign: 'center',
        }}>
        {user.user.fname}
        {user.user.lname} - General Service Call
      </Text>
      <Text
        style={{
          color: '#222222',
          fontWeight: 'bold',
          marginVertical: 5,
          alignSelf: 'center',
          marginHorizontal: 30,
          textAlign: 'center',
        }}>
        {call.date}
      </Text>

      <View
        style={{
          height: 250,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
          padding: 10,
          backgroundColor: '#FFFFFF',
          marginBottom: 50,
        }}>
        <TextInput
          activeUnderlineColor="transparent"
          numberOfLines={4}
          multiline={true}
          editable={false}
          value={note}
          onChangeText={text => setNote(text)}
          underlineColor="tranparent" // add this
          outlineColor="tranparent"
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            color: '#222222',
          }}
        />
      </View>
      {data.length ? (
        <View
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderWidth: 1,
            borderColor: '#0048908F',
            padding: 10,
            backgroundColor: '#FFFFFF',
            marginBottom: 30,
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={{padding: 4}}>
                <Text style={{color: '#000'}}>{item.material}</Text>
              </View>
            )}
          />
        </View>
      ) : null}
      <Text
        style={{
          color: '#222222',
          fontWeight: '400',
          marginVertical: 5,
          alignSelf: 'flex-end',
          textAlign: 'center',
        }}
        onPress={() => {
          navigation.navigate('ServiceImages', {
            id: id,
          });
        }}>
        View Images
      </Text>
    </Layout>
  );
};

export default ServiceDetail;

const styles = StyleSheet.create({});
