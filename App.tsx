import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import NavigationIndex from './src/navigation';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationIndex />
    </Provider>
  );
}
