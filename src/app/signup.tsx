import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
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

export default function SignUpScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | "confirm" | null>(
    null,
  );

  const isPasswordMismatch = useMemo(() => {
    if (confirmPassword.length === 0) {
      return false;
    }
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  return (
    <SafeAreaView style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={[authStyles.content, authStyles.forgotContent]}
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
            <Text style={authStyles.title}>Sign Up For Free</Text>
            <Text style={authStyles.subtitle}>Sign up in 1 minute for free!</Text>
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
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                placeholder="Enter your password..."
                placeholderTextColor="#98a4ab"
                secureTextEntry={!showPassword}
                style={authStyles.input}
                value={password}
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

          <View style={authStyles.fieldWrap}>
            <Text style={authStyles.label}>Password Confirmation</Text>
            <View
              style={[
                authStyles.inputRow,
                focusedField === "confirm" ? authStyles.inputRowFocused : undefined,
                isPasswordMismatch ? authStyles.inputRowError : undefined,
              ]}
            >
              <Feather color="#606f77" name="lock" size={18} />
              <TextInput
                onBlur={() => setFocusedField(null)}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedField("confirm")}
                placeholder="Confirm your password..."
                placeholderTextColor="#98a4ab"
                secureTextEntry={!showConfirmPassword}
                style={authStyles.input}
                value={confirmPassword}
              />
              <Pressable
                hitSlop={6}
                onPress={() => setShowConfirmPassword((previous) => !previous)}
                style={authStyles.rightIconButton}
              >
                <Ionicons
                  color="#9aa5ac"
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                />
              </Pressable>
            </View>
            {isPasswordMismatch ? (
              <View style={authStyles.errorBox}>
                <Feather color="#cf4063" name="alert-triangle" size={16} />
                <Text style={authStyles.errorText}>ERROR: Password do not match!</Text>
              </View>
            ) : null}
          </View>

          <Pressable style={authStyles.primaryButton}>
            <Text style={authStyles.primaryButtonText}>Sign Up</Text>
            <Feather color="#ffffff" name="arrow-right" size={20} />
          </Pressable>

          <View style={authStyles.bottomTextRow}>
            <Text style={authStyles.bottomText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/signin" as never)}>
              <Text style={authStyles.bottomLink}>Sign In.</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
