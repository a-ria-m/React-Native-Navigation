// App.tsx
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './screens/Cart';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}