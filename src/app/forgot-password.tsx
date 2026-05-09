import { useRouter } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authStyles } from "./auth-styles";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"email" | "twoFa" | "google">(
    "twoFa",
  );

  const methods = useMemo(
    () => [
      {
        id: "email" as const,
        icon: <Feather color="#586770" name="mail" size={18} />,
        title: "Email Address",
        subtitle: "Send via email address securely.",
      },
      {
        id: "twoFa" as const,
        icon: <MaterialCommunityIcons color="#6aa30e" name="cellphone-key" size={20} />,
        title: "2 Factor Authentication",
        subtitle: "Send via 2FA securely.",
      },
      {
        id: "google" as const,
        icon: <Feather color="#586770" name="lock" size={18} />,
        title: "Google Authenticator",
        subtitle: "Send via authenticator securely.",
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardAvoid}
      >
        <View style={authStyles.forgotHeader}>
          <Pressable onPress={() => router.push("/signin" as never)} style={authStyles.backButton}>
            <Ionicons color="#26333a" name="chevron-back" size={22} />
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={[authStyles.content, authStyles.forgotContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={authStyles.forgotTitle}>Forgot Password</Text>
          <Text style={authStyles.forgotSubtitle}>
            Select which methods you'd like to reset.
          </Text>

          <View style={authStyles.methodList}>
            {methods.map((method) => {
              const isActive = selectedMethod === method.id;
              return (
                <Pressable
                  key={method.id}
                  onPress={() => setSelectedMethod(method.id)}
                  style={[authStyles.methodCard, isActive ? authStyles.methodCardActive : undefined]}
                >
                  <View
                    style={[
                      authStyles.methodIconWrap,
                      isActive ? authStyles.methodIconWrapActive : undefined,
                    ]}
                  >
                    {method.icon}
                  </View>
                  <View style={authStyles.methodTextWrap}>
                    <Text style={authStyles.methodCardTitle}>{method.title}</Text>
                    <Text style={authStyles.methodCardSubtitle}>{method.subtitle}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={authStyles.primaryButton}>
            <Text style={authStyles.primaryButtonText}>Reset Password</Text>
            <Feather color="#ffffff" name="arrow-right" size={20} />
          </Pressable>

          <View style={authStyles.bottomTextRow}>
            <Text style={authStyles.bottomText}>Need an account?</Text>
            <Pressable onPress={() => router.push("/signup" as never)}>
              <Text style={authStyles.bottomLink}>Sign Up.</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
