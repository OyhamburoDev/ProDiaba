import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const InputForm = ({ label, onchange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const onChangeText = (text) => {
    setInput(text);
    onchange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={label}
        placeholderTextColor="rgba(0, 0, 0, 0.59)"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#5D5D8A",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.83)",
    padding: 16,
    borderRadius: 12,
    color: "#4A4A6A",
    fontSize: 16,
    fontWeight: "500",
    // Borde sutil solo al estar enfocado
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
  },
  inputFocused: {
    borderColor: "rgba(197, 202, 233, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  error: {
    color: "#E57373",
    marginTop: 8,
    fontSize: 13,
  },
});
export default InputForm;
