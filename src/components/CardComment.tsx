import { IMAGE } from "@constants/image.constant";
import { Comment } from "@models/comment.type";
import { transformDate } from "@utils/helpers";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { theme } from "src/theme";

export default function CardComment({ comment }: { comment: Comment }) {
  const imageComment = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_GENERIC}`;
  const timestamp = `?timestamp=${Date.now()}`;
  const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${comment.userId}.jpg${timestamp}`;
  const [imageCommentUser, setImageCommentUser] =
    useState<string>(imageComment);

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(urlImage);
        if (test.status === 200) setImageCommentUser(urlImage);
        return;
      } catch (e) {
        return;
      }
    })();
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Card style={{ alignItems: "center", marginVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Avatar.Image
            size={64}
            style={{ marginRight: 10 }}
            source={{
              uri: imageCommentUser,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.username}>@{comment.username}</Text>
            <Text style={styles.date}>{transformDate(comment.timestamp)}</Text>
          </View>
        </View>
        <Card.Content>
          <Text style={styles.message}>{comment.message}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginBottom: 16,
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.backdrop,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: theme.colors.backdrop,
  },
});
