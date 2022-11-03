import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Layout from '../components/Layout';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const forgetPassword = () => {
    var data = JSON.stringify({
      email: email,
    });

    var config = {
      method: 'post',
      url: 'https://generatorapp.titanbyte.co/api/password-reset',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout navigation={navigation} back>
      <Image
        source={require('../Assets/Images/forget.png')}
        style={{height: 250, width: 250, alignSelf: 'center', marginBottom: 40}}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Email
      </Text>
      <TextInput
        //   label="Email"

        value={email}
        onChangeText={text => setEmail(text)}
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
        }}
        right={<TextInput.Icon name="check" />}
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button title={'Send password Reset Email'} width={300} />
      </View>
      <Text
        style={{
          color: '#222222',
          fontWeight: '400',
          marginVertical: 15,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        Back to login
      </Text>
    </Layout>
  );
};

export default ForgetPassword;
