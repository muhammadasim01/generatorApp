import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import ForgetPassword from './src/Screens/Forget';
import TechnicalMain from './src/Screens/Technician/TechnicalMain';
import CustomerDashboard from './src/Screens/Customer/CustomerDashboard';
import IncompleteService from './src/Screens/Customer/IncompleteService';
import ServiceDetails from './src/Screens/Customer/ServiceDetails';
import ServiceImages from './src/Screens/Customer/ServiceImages';
import CustomerSearch from './src/Screens/Technician/CustomerSearch';
import CustomerDetails from './src/Screens/Technician/CustomerDetails';
import CustomerDetails2 from './src/Screens/Technician/CustomerDetails2';

import Map from './src/Screens/Technician/Map';
import SpringFallSerivce1 from './src/Screens/Technician/SpringFallSerivce1';
import SpringFallSerivce2 from './src/Screens/Technician/SpringFallSerivce2';
import SpringFallSerivce3 from './src/Screens/Technician/SpringFallSerivce3';
import SpringFallSerivce4 from './src/Screens/Technician/SpringFallSerivce4';
import SpringFallSerivce5 from './src/Screens/Technician/SpringFallSerivce5';
import SpringFallSerivce6 from './src/Screens/Technician/SpringFallSerivce6';
import SpringFallSerivce7 from './src/Screens/Technician/SpringFallSerivce7';
import UpdateService from './src/Screens/Technician/UpdateService';

import ServiceCall1 from './src/Screens/Technician/ServiceCall1';
import ServiceCall2 from './src/Screens/Technician/ServiceCall2';
import WarrantyCall1 from './src/Screens/Technician/WarrantyCall1';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from './src/store/Actions/actions';
import Splash from './src/Screens/Splash';
import InCompleteServiceCalls from './src/Screens/Technician/IncompleteSeriviceCalls';
import UserNotifications from './src/Screens/Customer/UsersNotifications';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      {Platform.OS === 'android' && (
        <Stack.Screen
          options={{headerShown: null}}
          name="Splash"
          component={Splash}
        />
      )}
      <Stack.Screen
        options={{headerShown: null}}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        options={{headerShown: null}}
        name="Forget"
        component={ForgetPassword}
      />
    </Stack.Navigator>
  );
};
const CustomerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: null}}
        name="CustomerDashboard"
        component={CustomerDashboard}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="UserNotifications"
        component={UserNotifications}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="Incomplete"
        component={IncompleteService}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="ServiceDetial"
        component={ServiceDetails}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="ServiceImages"
        component={ServiceImages}
      />
    </Stack.Navigator>
  );
};
const TechnicianStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: null}}
        name="TechnicalMain"
        component={TechnicalMain}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="CustomerSearch"
        component={CustomerSearch}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="InCompleteServiceCalls"
        component={InCompleteServiceCalls}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="CustomerDetial"
        component={CustomerDetails}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="CustomerDetial2"
        component={CustomerDetails2}
      />
      <Stack.Screen options={{headerShown: null}} name="Map" component={Map} />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce1"
        component={SpringFallSerivce1}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce2"
        component={SpringFallSerivce2}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce3"
        component={SpringFallSerivce3}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce4"
        component={SpringFallSerivce4}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce5"
        component={SpringFallSerivce5}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce6"
        component={SpringFallSerivce6}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="SpringFallSerivce7"
        component={SpringFallSerivce7}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="WarrantyCall1"
        component={WarrantyCall1}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="ServiceCall1"
        component={ServiceCall1}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="ServiceCall2"
        component={ServiceCall2}
      />
      <Stack.Screen
        options={{headerShown: null}}
        name="UpdateService"
        component={UpdateService}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const user = useSelector(state => state.Reducer.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    let usersString = await AsyncStorage.getItem('User');

    if (usersString) {
      let user = JSON.parse(usersString);

      dispatch(loginUser(JSON.parse(user)));
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          {user != undefined ? (
            user.user.user_role === 'customer' ? (
              <CustomerStack />
            ) : (
              <TechnicianStack />
            )
          ) : (
            <AuthStack />
          )}
        </PaperProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
