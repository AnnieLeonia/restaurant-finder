import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '@/client/constants';

const styles = StyleSheet.create<any>({
  container: {
    backgroundColor: COLORS.primary,
    flex: 1,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium,
  },
  cardImageWrapper: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cardImage: {
    width: '60%',
    height: '60%',
  },
  cardText: {
    fontSize: SIZES.large,
  },
});

export default styles;
