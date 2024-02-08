import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  View,
  Text,
} from "react-native";
import { forwardRef } from "react";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-center pb-4"
        {...rest}
      >
        <Image source={data.thumbnail} className="w-20 h-20 rounded-md"></Image>

        <View className="flex-1 ml-2">
          <View className="flex-row items-center">
            <Text className="text-slate-100 font-subtitle text-base ml-1">
              {data.title}
            </Text>

            {data.quantity && (
              <Text className="text-slate-400 font-subtitle text-sm ml-3">
                x{data.quantity}
              </Text>
            )}
          </View>

          <Text className="font-bold text-slate-400 text-xs leading-5 mt-0.5 ml-2.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
