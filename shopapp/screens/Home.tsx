import React from 'react';
import { SafeAreaView, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from './Cart';
import { useNavigation } from '@react-navigation/native';

const products = [
  { id: '1', title: 'Chocolate', description: 'Choco is forever.', basePrice: 10 },
  { id: '2', title: 'Mint', description: 'Minty fresh.', basePrice: 15 },
  { id: '3', title: 'Blueberry', description: 'Let us get rid of your blues.', basePrice: 28 },
];

export default function Home() {
  const navigation = useNavigation();
  const { cart, addToCart } = useCart();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5E1' }}> 
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF85A1' }}>
            Ice Cream Delights
          </Text>
          <Text style={{ fontSize: 16, color: '#4E342E', textAlign: 'center', marginVertical: 10 }}>
            Sweet treats for everyone!
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#A8E6CF', borderRadius: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={{ color: '#3E2723', fontSize: 16, fontWeight: 'bold' }}>
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF85A1' }}>
            Flavors for Sale
          </Text>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#D7E8FA', padding: 15, borderRadius: 10, marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4E342E' }}>{item.title}</Text>
                <Text style={{ color: '#4E342E' }}>{item.description}</Text>
                <Text style={{ fontSize: 14, color: '#4E342E' }}>Price: ${item.basePrice}</Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: '#A8E6CF', padding: 10, borderRadius: 5 }}
                onPress={() => addToCart(item)}
              >
                <Text style={{ color: '#3E2723', fontWeight: 'bold' }}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
