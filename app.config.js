import "dotenv/config";

export default {
  expo: {
    name: "ProDiaba",
    slug: "ProDiaba",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/sinFondo.png",
      resizeMode: "contain",
      backgroundColor: "#FFF8DC",
    },
    plugins: ["expo-font"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGIN_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
