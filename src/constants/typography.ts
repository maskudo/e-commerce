const {StyleSheet} = require('react-native');
const {default: COLORS} = require('./colors');
const {default: FONTS} = require('./fonts');

const TYPOGRAPHY = StyleSheet.create({
  title: {
    fontSize: 39,
    fontFamily: FONTS.fontBold,
    color: COLORS.black,
  },
  h1: {
    fontSize: 32,
    fontFamily: FONTS.fontBold,
    color: COLORS.black,
  },
  h2Bold: {
    fontSize: 25,
    fontFamily: FONTS.fontBold,
    color: COLORS.black,
  },
  h2Regular: {
    fontSize: 25,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
  h3: {
    fontSize: 20,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
  bodyRegular: {
    fontSize: 16,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
  captions: {
    fontSize: 13,
    fontFamily: FONTS.fontRegular,
    color: COLORS.gray,
  },
  buttonRegular: {
    fontSize: 16,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
  buttonLarge: {
    fontSize: 24,
    fontFamily: FONTS.fontRegular,
    color: COLORS.black,
  },
});

export default TYPOGRAPHY;
