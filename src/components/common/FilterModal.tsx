import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
import {CATEGORIES} from './Categories';

const SORT_BY = [
  // {name: 'Low Review', id: 1},
  // {name: 'High Review', id: 2},
  {name: 'Low Price', id: 3},
  {name: 'High Price', id: 4},
  {name: 'Low Rating', id: 5},
  {name: 'High Rating', id: 6},
  // {name: 'Name Asc', id: 7},
  // {name: 'Name Desc', id: 8},
];
export default function FilterModal({
  isVisible,
  setIsVisible,
  sortBy,
  filterBy,
  setSortBy,
  setFilterBy,
}: {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  sortBy: string | null;
  setSortBy: (val: string) => void;
  filterBy: string | null;
  setFilterBy: (val: string) => void;
}) {
  const setInvisible = () => setIsVisible(false);
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Pressable style={styles.bottomView} onPress={() => setIsVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Filter</Text>
            <TouchableOpacity onPress={setInvisible}>
              <Icon name="x" size={32} color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Filter By</Text>
            <View style={styles.sectionItems}>
              {CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.sectionItem,
                    {
                      backgroundColor:
                        category.name === filterBy
                          ? COLORS.pink
                          : COLORS.lightergray,
                    },
                  ]}
                  onPress={() =>
                    filterBy === category.name
                      ? setFilterBy(null)
                      : setFilterBy(category.name)
                  }>
                  <Text
                    style={[
                      styles.sectionText,
                      {
                        color:
                          category.name === filterBy
                            ? COLORS.white
                            : COLORS.black,
                      },
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.sectionItems}>
              {SORT_BY.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.sectionItem,
                    {
                      backgroundColor:
                        category.name === sortBy
                          ? COLORS.pink
                          : COLORS.lightergray,
                    },
                  ]}
                  onPress={() =>
                    sortBy === category.name
                      ? setSortBy(null)
                      : setSortBy(category.name)
                  }>
                  <Text
                    style={[
                      styles.sectionText,
                      {
                        color:
                          category.name === sortBy
                            ? COLORS.white
                            : COLORS.black,
                      },
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* <TouchableOpacity style={styles.button} onPress={setInvisible}> */}
          {/*   <Text style={styles.buttonText}>Apply Filter</Text> */}
          {/* </TouchableOpacity> */}
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
    top: '25%',
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 10,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
    gap: 20,
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
  titleText: {
    ...TYPOGRAPHY.h2Bold,
  },
  sectionContainer: {
    gap: 10,
  },

  sectionItems: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionItem: {
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: COLORS.lightergray,
  },
  sectionText: {
    ...TYPOGRAPHY.captions,
    color: COLORS.black,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
  },
  buttonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 15,
  },
  button: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 5,
    backgroundColor: COLORS.red,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCategory: {
    color: COLORS.white,
    backgroundColor: COLORS.red,
  },
});
