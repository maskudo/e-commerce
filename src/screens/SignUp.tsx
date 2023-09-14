import {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (password !== repassword) {
      setError('Passwords do not match!');
      return;
    } else {
      setError('');
    }
    if (email && password) {
      console.log({email, password});
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          const collection = firestore().collection('Users');
          collection.add({
            displayName: email.split('@')[0],
            username: email.split('@')[0],
            wishlist: [],
            cart: [],
            email: email,
          });
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          } else if (err.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          } else {
            console.log(err.code);
          }
        });
    }
    setPassword('');
    setEmail('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.eCommerce}>
        <Text style={styles.name}>Create an Account</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.textInputContainer}>
          <Text>
            <Icon name={'mail'} color={COLORS.gray} size={20} />
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Email'}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text>
            <Icon name={'lock'} color={COLORS.gray} size={20} />
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text>
            <Icon name={'lock'} color={COLORS.gray} size={20} />
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            onChangeText={text => setRePassword(text)}
            value={repassword}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={true}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={handleEndEditing} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signIn}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign in here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  eCommerce: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...TYPOGRAPHY.title,
    color: COLORS.black,
  },
  slogan: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
  },
  textInputContainer: {
    borderWidth: 1,
    margin: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  textInput: {
    color: COLORS.gray,
    flex: 1,
  },
  error: {
    color: COLORS.red,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    margin: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 5,
    backgroundColor: COLORS.green,
  },
  buttonText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  signInContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  signIn: {
    color: COLORS.black,
  },
  signInText: {
    color: COLORS.green,
    textDecorationLine: 'underline',
  },
});
