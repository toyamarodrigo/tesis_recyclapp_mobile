import { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { FAB } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { usePostList, usePostListByClerkId } from "@hooks/usePost";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { MyActivePosts } from "@features/feed/components/my-active-posts";
import { AllActivePosts } from "@features/feed/components/all-active-posts";
import { AllPosts } from "@features/feed/components/all-posts";
import { theme } from "src/theme";

const Feed = () => {
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  if (!isSignedIn) return null;

  const [refreshing, setRefreshing] = useState(false);
  const { data: postsByClerkId, refetch: refetchUserPosts } =
    usePostListByClerkId({ userId });
  const { data: materials, refetch: refetchMaterials } =
    useMaterialProductList();
  const { data: postsList, refetch: refetchPosts } = usePostList();

  const postListNotFromUserSignedIn = postsList?.filter(
    (post) => post.userId !== userId
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled([
      refetchUserPosts(),
      refetchMaterials(),
      refetchPosts(),
    ]);
    setRefreshing(false);
  }, [refetchUserPosts, refetchMaterials, refetchPosts]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.green[500]]}
            tintColor={colors.green[500]}
          />
        }
      >
        <MyActivePosts posts={postsByClerkId} materials={materials} />
        <AllActivePosts posts={postListNotFromUserSignedIn} materials={materials} />
        <AllPosts posts={postsList} materials={materials} />
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/feed/new")}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.green[500],
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

export default Feed;
