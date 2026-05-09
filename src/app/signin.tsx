import { useRouter } from "expo-router";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authStyles } from "./auth-styles";

export default function SignInScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  return (
    <SafeAreaView style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={authStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.headerWrap}>
            <View style={authStyles.logo}>
              <View style={[authStyles.logoDot, authStyles.logoTop]} />
              <View style={[authStyles.logoDot, authStyles.logoLeft]} />
              <View style={[authStyles.logoDot, authStyles.logoRight]} />
              <View style={[authStyles.logoDot, authStyles.logoBottom]} />
            </View>
            <Text style={authStyles.title}>Sign In</Text>
            <Text style={authStyles.subtitle}>Let's experience the joy of telecare AI.</Text>
          </View>

          <View style={authStyles.fieldWrap}>
            <Text style={authStyles.label}>Email Address</Text>
            <View
              style={[
                authStyles.inputRow,
                focusedField === "email" ? authStyles.inputRowFocused : undefined,
              ]}
            >
              <Feather color="#606f77" name="mail" size={18} />
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={() => setFocusedField(null)}
                onFocus={() => setFocusedField("email")}
                placeholder="Enter your email..."
                placeholderTextColor="#98a4ab"
                style={authStyles.input}
              />
            </View>
          </View>

          <View style={authStyles.fieldWrap}>
            <Text style={authStyles.label}>Password</Text>
            <View
              style={[
                authStyles.inputRow,
                focusedField === "password" ? authStyles.inputRowFocused : undefined,
              ]}
            >
              <Feather color="#606f77" name="lock" size={18} />
              <TextInput
                onBlur={() => setFocusedField(null)}
                onFocus={() => setFocusedField("password")}
                placeholder="Enter your password..."
                placeholderTextColor="#98a4ab"
                secureTextEntry={!showPassword}
                style={authStyles.input}
              />
              <Pressable
                hitSlop={6}
                onPress={() => setShowPassword((previous) => !previous)}
                style={authStyles.rightIconButton}
              >
                <Ionicons
                  color="#9aa5ac"
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={authStyles.primaryButton}>
            <Text style={authStyles.primaryButtonText}>Sign In</Text>
            <Feather color="#ffffff" name="arrow-right" size={20} />
          </Pressable>

          <View style={authStyles.socialRow}>
            <Pressable style={authStyles.socialButton}>
              <FontAwesome color="#111111" name="facebook" size={20} />
            </Pressable>
            <Pressable style={authStyles.socialButton}>
              <FontAwesome color="#111111" name="google" size={19} />
            </Pressable>
            <Pressable style={authStyles.socialButton}>
              <FontAwesome color="#111111" name="instagram" size={20} />
            </Pressable>
          </View>

          <View style={authStyles.bottomTextRow}>
            <Text style={authStyles.bottomText}>Don't have an account?</Text>
            <Pressable onPress={() => router.push("/signup" as never)}>
              <Text style={authStyles.bottomLink}>Sign Up.</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => router.push("/forgot-password" as never)}>
            <Text style={authStyles.forgotStandaloneLink}>Forgot your password?</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
