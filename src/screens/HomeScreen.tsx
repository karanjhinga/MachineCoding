import {Button, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useToast} from '../ToastProvider';

const HomeScreen = () => {
  const {showToast} = useToast();

  const createNewToast = useCallback(() => {
    // ToastActions.showToast({
    //   title: 'Hello',
    //   subtitle: 'This is a toast',
    //   type: 'success',
    // });

    showToast({
      title: 'Hello',
      subtitle: 'This is a toast',
      type: 'success',
    });
  }, [showToast]);

  return (
    <View style={styles.root}>
      <Button title="Create new Toast" onPress={createNewToast} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
