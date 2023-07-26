import { StyleSheet } from 'react-native';

import { COLORS } from '@/client/constants';

const styles = StyleSheet.create<any>({
  container: {
    height: '100px',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default styles;
