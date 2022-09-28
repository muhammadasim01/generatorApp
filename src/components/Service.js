import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
const Service = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text
          style={{
            color: '#222222',
            fontWeight: '400',
            marginVertical: 5,
            textAlign: 'center',
            fontSize: 16,
          }}>
          {item.service_type}
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
          style={{color: '#222222', marginHorizontal: 10, marginVertical: 2}}>
          View Details
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
  );
};

export default Service;

const styles = StyleSheet.create({
  card: {
    height: 100,
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
