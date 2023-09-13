import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from '../constants/colors';
import {StyleSheet} from 'react-native';
import Profile from '../screens/Profile';
import Homepage from '../screens/Homepage';
import Wishlist from '../screens/Wishlist';
import ItemScreen from '../screens/ItemScreen';
import PlaceOrder from '../screens/PlaceOrder';
import Checkout from '../screens/Checkout';
import {View} from 'react-native';
import CategoryScreen from '../screens/CategoryScreen';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="StackProfile"
          component={Profile}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={() => ({headerShown: false})}
        />
        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
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
      initialRouteName={'Homepage'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.red,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'heart'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Checkout}
        options={{
          tabBarIcon: ({size, color}) => (
            <View style={styles.shoppingIcon}>
              <Icon name={'shopping-cart'} color={color} size={size} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'search'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('StackProfile', {});
          },
        })}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'user'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarButton: () => null,
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
  tabBarStyle: {},
  shoppingIcon: {
    backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    borderRadius: 50,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    marginBottom: 10,
  },
});
