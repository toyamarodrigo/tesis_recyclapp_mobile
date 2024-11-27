import { List } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { Post } from "@models/post.type";
import { MaterialProduct } from "@models/materialProduct.type";
import { EmptyListMessage } from "@features/feed/components/empty-list-message";
import { MaterialCard } from "@features/feed/components/material-card";

interface AllActivePostsProps {
  posts?: Post[];
  materials?: MaterialProduct[];
}

export const AllActivePosts = ({ posts, materials }: AllActivePostsProps) => {
  const activePosts = posts?.filter((post) => post.isActive) || [];

  return (
    <List.Accordion
      title="Todas las publicaciones activas"
      style={{
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        backgroundColor: colors.purple[100],
      }}
      left={(props) => <List.Icon {...props} icon="progress-clock" />}
    >
      {activePosts.length === 0 ? (
        <EmptyListMessage
          message="No hay publicaciones activas"
          style={{ marginBottom: 8, marginLeft: 16 }}
        />
      ) : (
        activePosts.map((post) => (
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
