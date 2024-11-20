import React from 'react';
import {ToastProvider} from './ToastProvider';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <ToastProvider>
      <HomeScreen />
    </ToastProvider>
  );
};

export default App;
