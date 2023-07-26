import { StyleSheet } from 'react-native';

import { COLORS } from '../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryList: {
    backgroundColor: COLORS.secondary,
    flex: 1,
  },
});

export default styles;
