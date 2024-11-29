import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "src/theme";
import type { Post } from "@models/post.type";
import type { MaterialProduct } from "@models/materialProduct.type";
import { PostCardHeader } from "./post-card-header";
import { PostCardContent } from "./post-card-content";
import { PostCardImage } from "./post-card-image";
import { PostCardActions } from "./post-card-actions";

interface PostCardProps {
  post: Post | undefined;
  imagePost: string;
  imagePostUser: string;
  materials?: MaterialProduct[];
  isLoading: boolean;
  userId: string;
  onEdit: () => void;
  onComment: () => void;
}

export function PostCard({
  post,
  imagePost,
  imagePostUser,
  materials,
  isLoading,
  userId,
  onEdit,
  onComment,
}: PostCardProps) {
  return (
    <Card style={[styles.card, { opacity: post?.isArchived ? 0.5 : 1 }]}>
      <PostCardHeader
        username={post?.username}
        imageUrl={imagePostUser}
        isActive={post?.isActive}
      />
      <PostCardContent
        purpose={post?.purpouse as "HAVE" | "WANT"}
        materialId={post?.materialProductId}
        quantity={post?.quantity}
        description={post?.description}
        materials={materials}
      />
      <PostCardImage imageUrl={imagePost} isLoading={isLoading} />
      <PostCardActions
        isArchived={post?.isArchived}
        userId={userId}
        postUserId={post?.userId}
        onEdit={onEdit}
        onComment={onComment}
        isLoading={isLoading}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: theme.colors.surface,
  },
});
