import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode, AVPlaybackSource } from "expo-av";
const zoomIn: Animatable.CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};
const zoomOut = {
  0: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};
const TrendingItems = ({
  activeItems,
  item,
}: {
  activeItems: Models.Document;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItems.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }: { posts: Models.Document[] }) => {
  const [activeItems, setActiveItems] = useState(posts[1]);
  const viewAbleItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Models.Document>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItems(viewableItems[0].item);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItems activeItems={activeItems} item={item} />
      )}
      onViewableItemsChanged={viewAbleItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
