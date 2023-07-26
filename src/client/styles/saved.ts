import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: SIZES.large,
  },
  scrollContainer: {
    backgroundColor: COLORS.secondary,
  },
});

export default styles;
