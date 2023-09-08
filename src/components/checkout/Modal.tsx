import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import {successStarImage} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';

export default function SuccessModal({isVisible}: {isVisible: boolean}) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Pressable style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.successMessage}>
            <ImageBackground source={successStarImage} style={styles.image} />
            <Icon name="check" size={42} color={COLORS.white} />
          </View>
          <Text style={styles.text}>Payment done successfully!</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    position: 'absolute',
    top: '30%',
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    gap: 10,
  },
  successMessage: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  text: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 14,
  },
});
