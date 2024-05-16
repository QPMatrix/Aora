import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyBoardType,
  ...props
}: {
  title?: string;
  value?: string;
  keyBoardType?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="mt-0.5 text-white flex-1 font-pregular text-base"
        value={value}
        placeholder="Search for videos topics"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
