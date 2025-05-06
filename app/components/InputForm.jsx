import { View, Text, TextInput } from "react-native";
import { useState } from "react";

const InputForm = ({ label, onchange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");

  const onChangeText = (text) => {
    setInput(text);
    onchange(text);
  };

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default InputForm;
