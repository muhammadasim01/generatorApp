import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Layout from '../components/Layout';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Button from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/Actions/actions';
import Toast from 'react-native-simple-toast';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [techloading, setTechloading] = useState(false);
  const [secure, setSecure] = useState(false);

  const customerLogin = () => {
    if (email.length && password.length) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      fetch(
        'https://generator.thecodelogy.com/api/login?email&password',
        requestOptions,
      )
        .then(response => response.text())
        .then(function (res) {
          let response = JSON.parse(res);

          if (response) {
            if (response.access_token) {
              console.log(response);

              AsyncStorage.setItem('User', JSON.stringify(res));
              setLoading(false);
              dispatch(loginUser(response));
            } else {
              setLoading(false);
              Toast.show('Email or Password is incorrect.');
            }
          }
        })
        .catch(error => {
          setLoading(false);
          Toast.show('Email or Password is incorrect.');
        });
    } else {
      Toast.show('Both fields are required.');
    }
  };

  const technicianLogin = () => {
    if (email.length && password.length) {
      setTechloading(true);

      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      fetch(
        'https://generator.thecodelogy.com/api/login?email&password',
        requestOptions,
      )
        .then(response => response.text())
        .then(function (res) {
          let response = JSON.parse(res);

          if (response) {
            if (response.access_token) {
              console.log(response);
              AsyncStorage.setItem('User', JSON.stringify(res));

              setTechloading(false);
              dispatch(loginUser(response));
            } else {
              setTechloading(false);
              Toast.show('Email or Password is incorrect.');
            }
          }
        })
        .catch(error => {
          console.log(error, 'Login Error');
          setTechloading(false);
          Toast.show('Email or Password is incorrect.');
        });
    } else {
      Toast.show('Both fields are required.');
    }
  };
  return (
    <Layout>
      <Image
        source={require('../Assets/Images/loginimage.png')}
        style={{height: 200, width: 200, alignSelf: 'center'}}
      />
      <Text
        style={{
          color: '#4B6D9B',
          fontWeight: '600',
          marginVertical: 5,
          fontSize: 10,
        }}>
        Welcome Back
      </Text>
      <Text
        style={{
          color: '#222222',
          fontWeight: 'bold',
          marginVertical: 5,
          fontSize: 20,
        }}>
        Login with
      </Text>

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Email
      </Text>
      <TextInput
        //   label="Email"

        value={email}
        onChangeText={text => setEmail(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#000"
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
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Password
      </Text>

      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={secure}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => {
              setSecure(!secure);
            }}
          />
        }
      />
      <Text
        style={{
          color: '#242424',
          fontWeight: '500',
          marginVertical: 10,
          alignSelf: 'flex-end',
        }}
        onPress={() => {
          navigation.navigate('Forget');
        }}>
        Forget Your Password?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title={'Login'}
          width={160}
          onPress={() => technicianLogin()}
          loading={techloading}
        />
        {/* <Button
          title={'Customer Log In'}
          width={160}
          onPress={() => customerLogin()}
          loading={loading}
        /> */}
      </View>
    </Layout>
  );
};

export default Login;
