import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../store/Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TechnicalMain = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Layout
      logout
      logoutHandler={() => {
        AsyncStorage.clear().then(() => {
          dispatch(loginUser(null));
        });
      }}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CustomerSearch')}>
        <View style={{marginHorizontal: 10, marginTop: 20}}>
          <Text
            style={{
              color: '#222222',
              fontWeight: '600',
              marginVertical: 5,
              fontSize: 20,
            }}>
            Customer Search
          </Text>
          <Text
            style={{
              color: '#222222',
              fontWeight: '400',
              marginVertical: 5,
              fontSize: 14,
              width: 150,
            }}>
            Search the customer using this app.
          </Text>
        </View>
        <View style={styles.ovalBgH}>
          <Image
            source={require('../../Assets/Images/card1.png')}
            style={{
              height: 250,
              width: 200,
              position: 'absolute',
              resizeMode: 'contain',
              right: 10,
            }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card1}
        onPress={() => navigation.navigate('Map')}>
        <View style={{marginHorizontal: 10, marginTop: 20}}>
          <Text
            style={{
              color: '#222222',
              fontWeight: '600',
              marginVertical: 5,
              fontSize: 20,
            }}>
            Route
          </Text>
          <Text
            style={{
              color: '#222222',
              fontWeight: '400',
              marginVertical: 5,
              fontSize: 14,
              width: 150,
            }}>
            Get the user location from the map.
          </Text>
        </View>

        <Image
          source={require('../../Assets/Images/card2.png')}
          style={{
            height: 180,
            width: 200,
            position: 'absolute',
            resizeMode: 'contain',
            right: -10,
            marginTop: 20,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card3}
        onPress={() => navigation.navigate('InCompleteServiceCalls')}>
        <View style={{marginHorizontal: 10, marginTop: 20}}>
          <Text
            style={{
              color: '#222222',
              fontWeight: '600',
              marginVertical: 5,
              fontSize: 20,
            }}>
            In Complete Service Calls
          </Text>
          <Text
            style={{
              color: '#222222',
              fontWeight: '400',
              marginVertical: 5,
              fontSize: 14,
              width: 150,
            }}>
            Incomplete call section.
          </Text>
        </View>

        <Image
          source={require('../../Assets/Images/puzzle.png')}
          style={{
            height: 180,
            width: 200,
            position: 'absolute',
            resizeMode: 'contain',
            right: -10,
            marginTop: 20,
          }}
        />
      </TouchableOpacity>
    </Layout>
  );
};

export default TechnicalMain;

const styles = StyleSheet.create({
  card: {
    height: 230,
    backgroundColor: '#F4E0D1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#0048908F',
    marginVertical: 20,
  },
  card1: {
    height: 230,
    backgroundColor: '#CDE1F1',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#0048908F',
    marginVertical: 20,
  },
  card3: {
    height: 230,
    backgroundColor: '#ACDDDE',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#0048908F',
    marginVertical: 20,
  },
  ovalBgH: {
    backgroundColor: '#EEC7A2',
    width: 140,
    //  right:1,
    height: '100%',

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 150,
    borderBottomLeftRadius: 150,
    transform: [{scaleY: 1}],
  },
  ovalBg: {
    backgroundColor: '#a0c580',
    width: 50,
    height: 50,
    transform: [{scaleX: 7}],
  },
});
