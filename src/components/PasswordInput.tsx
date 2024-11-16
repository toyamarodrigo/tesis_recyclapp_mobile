import { useState } from "react";
import { TextInput } from "react-native-paper";

export const PasswordInput = ({
  value,
  onChangeText,
  onBlur,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      style={{ marginTop: 10 }}
      secureTextEntry={!show}
      maxLength={10}
      mode="outlined"
      right={
        <TextInput.Icon
          icon={show ? "eye-off" : "eye"}
          size={20}
          onPress={() => setShow(!show)}
        />
      }
    />
  );
};
