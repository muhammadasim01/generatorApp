import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Button = ({ onPress, title, disabled, loading, color, width }) => {
    return (
        <TouchableOpacity onPress={onPress}

            style={{height:50, marginTop: hp(2), borderRadius:25,  alignSelf: 'center', backgroundColor: color ? color : '#004890',width:width,justifyContent:"center",alignItems:"center"}}
        >


            {loading ?
                <ActivityIndicator color={"white"} /> :
                <Text style={{ fontSize: 15, color: '#FFFFFF', elevation: 2,  textAlign: 'center' }}>{title}</Text>

            }

        </TouchableOpacity>

    );
}
export default Button;