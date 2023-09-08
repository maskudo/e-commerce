import {Dropdown as DDown} from 'react-native-element-dropdown';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

type DropdownProps = {
  setValue: () => void;
  items: [
    {
      label: string;
      value: any;
    },
  ];
};
export default function Dropdown({setValue, items}: DropdownProps) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <DDown
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={'Size'}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontSize: 16,
  },
});
