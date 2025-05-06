import { Text, Pressable } from "react-native";

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;
