import {
  Image,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function showCartToast(product: string) {
    ToastAndroid.showWithGravity(
      `${product} adicionado ao carrinho`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  function addQuantity() {
    setQuantity(quantity + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAddtoCart() {
    for (let i = 0; i < quantity; i++) {
      cartStore.add(product);
    }

    navigation.goBack();
    setQuantity(1);
    showCartToast(product.title);
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52 "
        resizeMode="cover"
      ></Image>

      <View className="mt-4 items-center">
        <Text className="font-heading text-slate-400 text-3xl ">
          {product.title}
        </Text>
      </View>

      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>
        {product.ingredients.map((ingredient) => (
          <Text key={ingredient} className="text-slate-400 font-body leading-6">
            {"\u2022"}
            {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <View className="flex-row gap-2">
          <Button onPress={handleAddtoCart}>
            <Button.Icon>
              <Feather name="plus-circle" size={20}></Feather>
            </Button.Icon>
            <Button.Text>Adicionar ao Pedido</Button.Text>
          </Button>

          <View className="w-15 h-12 flex-row items-center gap-x-1">
            <TouchableOpacity
              className="w-6 h-6 bg-slate-700 rounded-full items-center"
              onPress={addQuantity}
            >
              <Feather
                className="self-center"
                name="plus"
                size={23}
                color={"white"}
              />
            </TouchableOpacity>

            <View className="w-10 h-full bg-lime-400 rounded-md justify-center">
              <Text className=" rounded-md text-slate-900 text-center font-bold text-2xl">
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              className="items-center bg-slate-700 w-6 h-6 rounded-full"
              onPress={decreaseQuantity}
            >
              <Feather
                className="self-center"
                name="minus"
                size={23}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
