import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from './Cart';
import { useNavigation } from '@react-navigation/native';

export default function Checkout() {
  const navigation = useNavigation();
  const { cart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout successful',
      'Your order has been processed successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
          style: 'default'
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5E1', padding: 20 }}> 
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF85A1', marginBottom: 20 }}>
        Checkout
      </Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#D7E8FA', borderRadius: 5, marginVertical: 5 }}>
            <Text style={{ color: '#4E342E', fontWeight: 'bold' }}>
              {item.title} x {item.quantity}
            </Text>
            <Text style={{ color: '#4E342E' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#E0C3A7', marginVertical: 5 }} />}
      />

      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4E342E', marginVertical: 20 }}>
        Total: ${totalPrice.toFixed(2)}
      </Text>

      <TouchableOpacity 
        onPress={handleCheckout} 
        style={{ backgroundColor: '#A8E6CF', padding: 15, borderRadius: 5, alignItems: 'center' }}
      >
        <Text style={{ color: '#3E2723', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
