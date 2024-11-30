import { List } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { Post } from "@models/post.type";
import { MaterialProduct } from "@models/materialProduct.type";
import { EmptyListMessage } from "@features/feed/components/empty-list-message";
import { MaterialCard } from "@features/feed/components/material-card";

interface AllPostsProps {
  posts?: Post[];
  materials?: MaterialProduct[];
}

export const AllPosts = ({ posts, materials }: AllPostsProps) => {
  return (
    <List.Accordion
      title="Publicaciones cerradas"
      style={{
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        backgroundColor: colors.green[100],
      }}
      left={(props) => <List.Icon {...props} icon="recycle" />}
    >
      {!posts?.length ? (
        <EmptyListMessage
          message="No hay publicaciones"
          style={{ marginBottom: 8, marginLeft: 16 }}
        />
      ) : (
        posts.map((post) => (
          <MaterialCard
            key={post.id}
            post={post}
            id={post.id}
            materials={materials}
          />
        ))
      )}
    </List.Accordion>
  );
};
