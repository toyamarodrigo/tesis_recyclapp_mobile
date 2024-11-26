import { List } from "react-native-paper";

interface EmptyListMessageProps {
  message?: string;
  style?: any;
}

export const EmptyListMessage = ({
  message = "No hay publicaciones",
  style,
}: EmptyListMessageProps) => {
  return <List.Item title={message} style={style} />;
};
