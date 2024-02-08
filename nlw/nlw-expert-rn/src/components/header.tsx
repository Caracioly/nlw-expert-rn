import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import colors from "tailwindcss/colors";

type HeaderProps = {
  title: string;
  cartQuantityitems?: number;
};

export function Header({ title, cartQuantityitems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white mt-2 text-2xl font-heading">{title}</Text>
      </View>

      {cartQuantityitems > 0 && (
        <Link href={"/cart"} asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-slate-900 text-xs">
                {cartQuantityitems}
              </Text>
            </View>
            <Feather
              name="shopping-bag"
              color={colors.white}
              size={24}
            ></Feather>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
