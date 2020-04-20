import React from 'react';
import Routes from './src/configs/Routes';
import { Provider } from 'react-redux';
import { store } from './src/configs/Redux';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
