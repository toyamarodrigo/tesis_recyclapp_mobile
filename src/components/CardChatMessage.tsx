import { IMAGE } from "@constants/image.constant";
import { ChatMessage } from "@models/chatMessage.type";
import { transformDate } from "@utils/helpers";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { theme } from "src/theme";

export default function CardChatMessage({
  chatMessage,
}: {
  chatMessage: ChatMessage;
}) {
  const timestamp = `?timestamp=${Date.now()}`;
  const urlImageUser = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${chatMessage.senderId}.jpg${timestamp}`;
  const genericAvatar = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_GENERIC}`;
  const [imageCommentUser, setImageCommentUser] =
    useState<string>(genericAvatar);

  useEffect(() => {
    (async () => {
      try {
        const testComment = await axios.get(urlImageUser);
        if (testComment.status === 200) setImageCommentUser(urlImageUser);
        return;
      } catch (e) {
        return;
      }
    })();
  }, []);

  return (
    <Card style={{ marginVertical: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Avatar.Image
            size={24}
            style={{ marginRight: 10 }}
            source={{
              uri: imageCommentUser,
            }}
          />
          <View>
            <Text style={styles.username}>@{chatMessage.senderUsername}</Text>
            <Text style={styles.date}>
              {transformDate(chatMessage.timestamp)}
            </Text>
          </View>
        </View>
      </View>
      <Card.Content>
        <Text style={styles.message}>{chatMessage.message}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  message: {
    marginBottom: 16,
    fontSize: 16,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.backdrop,
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    color: theme.colors.backdrop,
  },
});
