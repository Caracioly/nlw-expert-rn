import { TouchableOpacity, TouchableOpacityProps, Image, ImageProps, View, Text } from "react-native";
import { forwardRef } from "react";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(({ data, ...rest }, ref) => {
  return (
    <TouchableOpacity ref={ref} className="w-full flex-row items-center pb-4" {...rest}>
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md"></Image>

      <View className="">
        <Text className="font-subtitle text-slate-100 text-base flex-1 ml-1.5">{data.title}</Text>
        <Text className="font-bold text-slate-400 text-xs leading-5 mt-0.5 ml-2.5">{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
})
