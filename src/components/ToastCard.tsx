import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useMemo} from 'react';
import {Toast, ToastType} from '../models/toast';
import Icon from './Icon';
import {useToast} from '../ToastProvider';

type Props = {
  data: Toast;
};

const getToastColor = (type: ToastType) => {
  switch (type) {
    case 'success':
      return 'green';
    case 'error':
      return 'red';
    case 'warning':
      return 'yellow';
    case 'info':
      return 'blue';
  }
};

const ToastCard: FC<Props> = ({data}) => {
  const {hideToast} = useToast();

  const toastStyle = useMemo(
    () => ({backgroundColor: getToastColor(data.type)}),
    [data.type],
  );

  const onPressClose = useCallback(() => {
    hideToast(data.id);
  }, [hideToast, data.id]);

  return (
    <View style={[styles.root, toastStyle]}>
      <Icon type={data.icon} />
      <View>
        <Text>{data.title + ` ${data.id}`}</Text>
        <Text>{data.subtitle}</Text>
      </View>
      <Pressable style={styles.cross} onPress={onPressClose} />
    </View>
  );
};

export default ToastCard;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    color: 'white',
    fontSize: 12,
  },
  cross: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    alignSelf: 'flex-start',
  },
});
