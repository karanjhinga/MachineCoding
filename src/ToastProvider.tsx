import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Toast, ToastBody} from './models/toast';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import ToastCard from './components/ToastCard';

const ToastContext = createContext<{
  toasts: Toast[];
  showToast: (toast: ToastBody) => void;
  hideToast: (id: number) => void;
}>({
  toasts: [],
  showToast: () => {},
  hideToast: () => {},
});

export class ToastActions {
  static showToast = (_: ToastBody) => {};
}

export const useToast = () => React.useContext(ToastContext);

export const MAX_TOASTS = 5;
export const DEFAULT_TOAST_TIMER = 3000;

let count = 0;

export const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const toasts = useRef<Toast[]>([]);
  const [visibleToasts, setVisibleToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (data: ToastBody) => {
      const id = count++;
      toasts.current = [...toasts.current, {id, ...data}];

      if (visibleToasts.length < MAX_TOASTS) {
        setVisibleToasts(prev => [...prev, {id, ...data}]);
      }

      setTimeout(() => {
        //
        toasts.current = toasts.current.filter(t => t.id !== id);
        //
        setVisibleToasts(prev => prev.filter(t => t.id !== id));
      }, DEFAULT_TOAST_TIMER);
    },
    [visibleToasts],
  );

  const hideToast = useCallback((id: number) => {
    toasts.current = toasts.current.filter(t => t.id !== id);
    setVisibleToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const keyExtractor = useCallback((item: Toast) => item.id.toString(), []);

  const renderItem: ListRenderItem<Toast> = useCallback(({item}) => {
    return <ToastCard data={item} />;
  }, []);

  const value = useMemo(
    () => ({showToast, hideToast, toasts: visibleToasts}),
    [showToast, hideToast, visibleToasts],
  );

  /*Adds remaining items from backing field */
  useEffect(() => {
    if (
      visibleToasts.length > MAX_TOASTS - 1 &&
      visibleToasts.length < MAX_TOASTS &&
      toasts.current.length > 0
    ) {
      let temp = toasts.current;
      let first = temp.shift();
      toasts.current = temp;
      if (first) {
        setVisibleToasts(prev => [...prev, first]);
      }
    }
  }, [visibleToasts]);

  /*Store a reference to toast action */
  useEffect(() => {
    ToastActions.showToast = showToast;
  }, [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <FlatList
        style={styles.root}
        data={visibleToasts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 16,
    start: 16,
  },
  content: {
    gap: 8,
  },
});
