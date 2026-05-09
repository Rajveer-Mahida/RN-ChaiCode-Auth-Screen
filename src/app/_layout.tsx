import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signin" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="Forgot Password" />
    </Stack>
  );
}
