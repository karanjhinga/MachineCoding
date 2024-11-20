import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';

type Props = {
  type?: string;
};

const Icon: FC<Props> = ({type}) => {
  //console.log('render icon of type', type);
  return <View style={styles.root} />;
};

export default Icon;

const styles = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    backgroundColor: 'teal',
  },
});
