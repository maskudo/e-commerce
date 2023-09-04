import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from '../constants/colors';
import Swipe from '../screens/Swipe';
import {StyleSheet} from 'react-native';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Swipe"
          component={Swipe}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="Home"
          component={TabScreen}
          options={() => ({headerShown: false})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Profile', {});
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size, color}) => (
            <Icon name={'user'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addPostButton: {
    marginBottom: 10,
  },
  addPostIcon: {
    transform: [{rotate: '-45deg'}],
  },
  tabBarStyle: {
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
