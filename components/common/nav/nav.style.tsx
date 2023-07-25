import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create<any>({
  container: {
    height: '100px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  navBtn: {
    alignItems: 'center',
  },
  navIcon: {
    width: '30px',
    height: '30px',
  },
});

export default styles;
