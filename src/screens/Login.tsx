import {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleEndEditing = () => {
    Keyboard.dismiss();
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Logging in');
        })
        .catch(err => {
          setError(err.code.split('/')[1]);
          return;
        });
    }
    setPassword('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.eCommerce}>
        <Text style={styles.name}>Welcome Back</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.textInputContainer}>
          <Text>
            <Icon name={'mail'} color={COLORS.gray} size={20} />
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Email'}
            onChangeText={text => {
              setEmail(text);

              setError('');
            }}
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
            secureTextEntry={true}
            placeholder={'Password'}
            onChangeText={text => {
              setPassword(text);
              setError('');
            }}
            value={password}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={true}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={handleEndEditing} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.signIn}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signInText}>Sign up here.</Text>
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
