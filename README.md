# ProDiaba - App de Control Glucémico

ProDiaba es una aplicación móvil desarrollada con **React Native + Expo** orientada a personas con diabetes tipo 1 o tipo 2 que necesitan registrar y hacer seguimiento de sus niveles de glucemia. La app permite ingresar valores glucémicos, agregar comentarios, visualizar el historial por fechas y gestionar un perfil personalizado.

---

![image (1)](https://github.com/user-attachments/assets/6d99ac5d-c318-4044-844d-b5bccc710000)

## 🌟 Características principales

- ✉️ **Autenticación con Firebase Auth**: registro, login y cierre de sesión con persistencia usando SQLite.
- 🌌 **Modo claro y oscuro**: configurable desde un toggle con un custom hook.
- 📊 **Carga y visualización de controles glucémicos**:
  - Carga de valores con comentario.
  - Visualización por calendario o listado de fechas.
  - Navegación hacia una pantalla con los valores registrados ese día.
- 🧰 **Estado global con Redux**: manejo de autenticación, datos y tema.
- 📂 **Almacenamiento de datos en Firebase Realtime Database + SQLite**.
- 🌍 **Pantalla de perfil**:
  - Carga y edición de foto de perfil (Firebase + SQLite + Redux).
  - Guardado y modificación de ubicación (Firebase + Redux).
  - Cierre de sesión (Firebase + Redux + SQLite).
- 📈 **Sección de gráficos**: placeholder para futura implementación (visualización de glucemias por día, semana y mes).

---

## 🚀 Tecnologías utilizadas

- **React Native + Expo SDK 53**
- **Redux Toolkit + Redux**
- **Firebase Auth & Realtime Database**
- **SQLite** (expo-sqlite)
- **Expo Location**
- **Expo Image Picker + Camera**
- **React Navigation**

## 🎨 Herramientas de estilo visual

- **Expo Linear Gradient**
- **Expo BlurView**
- **Modo claro/oscuro gestionado con Redux**

---

## 👤 Cuenta de prueba para testeo

- **Email**: `ramiro@gmail.com`  
- **Contraseña**: `ramiro123`

Este usuario tiene datos pre-cargados en la base para que se puedan visualizar los registros.

---

## 📦 Dependencias necesarias para correr la app

```bash
npx expo install react-redux @reduxjs/toolkit
npx expo install firebase
npx expo install expo-sqlite
npx expo install expo-location
npx expo install expo-image-picker
npx expo install expo-linear-gradient
npx expo install expo-blur
npx expo install expo-constants
npx expo install expo-file-system
npx expo install expo-font
npx expo install expo-splash-screen
npx expo install react-native-calendars
npx expo install react-native-svg
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
