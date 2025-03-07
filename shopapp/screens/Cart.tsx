import React, { createContext, useState, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: string;
  title: string;
  basePrice: number;
};

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, change: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing 
        ? prev.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        : [...prev, { ...product, price: product.basePrice, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(item.quantity + change, 0) } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

const CartScreen = () => {
  const { cart, updateQuantity } = useCart();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5E1', padding: 20 }}> 
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF85A1', marginBottom: 20 }}>
        Your Cart
      </Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#D7E8FA', borderRadius: 5, marginVertical: 5 }}>
            <Text style={{ color: '#4E342E', fontWeight: 'bold' }}>
              {item.title} x {item.quantity}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 20, color: '#FF85A1' }}>➖</Text>
              </TouchableOpacity>
              <Text style={{ color: '#4E342E' }}>${(item.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 20, color: '#FF85A1' }}>➕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#E0C3A7', marginVertical: 5 }} />}
      />

      <TouchableOpacity 
        onPress={() => navigation.navigate('Checkout')}
        style={{ backgroundColor: '#A8E6CF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 }}
      >
        <Text style={{ color: '#3E2723', fontWeight: 'bold' }}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;
