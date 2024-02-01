import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  window: {
    width: screenWidth,
    height: screenHeight,
  },
  isSmallDevice: screenWidth < 375,
};
