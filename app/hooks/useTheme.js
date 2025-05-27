import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../styles/styles";

export default function useThemeNew() {
  const darkMode = useSelector((state) => state.theme.darkMode); // maneja el estado del darkmode
  return darkMode ? darkTheme : lightTheme;
}
