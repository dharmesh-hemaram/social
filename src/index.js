import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { fetchUsers } from './features/users/usersSlice';

const container = document.getElementById('root');
const root = createRoot(container);


async function start() {
  store.dispatch(fetchUsers())
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

start()
