import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import SearchInput from "@/components/serach-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import useAppwrite from "@/lib/use-appwrite";
import { searchPosts } from "@/lib/appwrite";
import VideoCard from "@/components/video-card";
import { router, useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() =>
    searchPosts(Array.isArray(query) ? query.join(" ") : query || "")
  );
  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
              <TouchableOpacity
                className="border-secondary-100 bg-secondary rounded-xl border-2"
                onPress={() => router.replace("/")}
              >
                <Image
                  source={images.back}
                  className="w-8 h-8 "
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <SearchInput
              initialQuery={
                Array.isArray(query) ? query.join(" ") : query || ""
              }
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for the search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
