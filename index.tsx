import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  useWindowDimensions,
  View,
} from 'react-native';

import { AppIcon, type AppIconName } from '@/components/app-icon';
import { HillsBackground } from '@/components/hills-background';
import { Brand, Spacing } from '@/constants/theme';

const WIDE_BREAKPOINT = 768;

const CARD_TEXT = '#151A2D';
const CARD_MUTED = '#6B7280';
const FIELD_BORDER = '#E2E4E9';
const FIELD_BACKGROUND = '#F5F6F8';
const PLACEHOLDER = '#9CA0A8';

function deriveDisplayName(input: string) {
  const base = input.includes('@') ? input.split('@')[0] : input;
  const words = base
    .replace(/[._-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'User';
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: AppIconName;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
};

function FormField({
  label,
  value,
  onChangeText,
  icon,
  placeholder,
  secureTextEntry,
  autoCapitalize = 'none',
  rightIcon,
  onRightIconPress,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        <AppIcon name={icon} size={18} color={CARD_MUTED} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={PLACEHOLDER}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
        />
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={rightIcon === 'eye' ? 'Show password' : 'Hide password'}>
            <AppIcon name={rightIcon} size={18} color={CARD_MUTED} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const canSubmit = username.trim().length > 0 && password.trim().length > 0;

  function handleSignIn() {
    if (!canSubmit) return;
    router.replace({ pathname: '/dashboard', params: { name: deriveDisplayName(username.trim()) } });
  }

  const usernameField = (
    <FormField
      label="Username"
      value={username}
      onChangeText={setUsername}
      icon="person"
      placeholder="Enter your username"
    />
  );

  const passwordField = (
    <FormField
      label="Password"
      value={password}
      onChangeText={setPassword}
      icon="lock"
      placeholder="Enter your password"
      secureTextEntry={!showPassword}
      rightIcon={showPassword ? 'eye-off' : 'eye'}
      onRightIconPress={() => setShowPassword((value) => !value)}
    />
  );

  const signInButton = (
    <Pressable
      onPress={handleSignIn}
      disabled={!canSubmit}
      accessibilityRole="button"
      accessibilityState={{ disabled: canSubmit }}
      style={({ pressed }) => [
        styles.button,
        isWide && styles.buttonWide,
        canSubmit ? styles.buttonEnabled : styles.buttonDisabled,
        pressed && canSubmit && styles.buttonPressed,
      ]}>
      <Text style={styles.buttonText}>Sign In</Text>
    </Pressable>
  );

  if (isWide) {
    return (
      <View style={styles.wideRoot}>
        <StatusBar style="dark" />
        <View style={styles.wideLeft}>
          <ScrollView contentContainerStyle={styles.wideLeftScroll} keyboardShouldPersistTaps="handled">
            <Image
              source={require('@/assets/images/bms-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.wideSignInTitle}>Sign In</Text>
            <Text style={styles.wideSubtitle}>Enter your credentials to access your account</Text>
            {usernameField}
            {passwordField}
            <Text style={styles.wideForgotLink}>Forgot Password?</Text>
            {signInButton}
          </ScrollView>
        </View>
        <View style={styles.wideRight}>
          <Image
            source={require('@/assets/images/tplex-highway.jpg')}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <HillsBackground />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.signInTitle}>Sign In</Text>
            <Text style={styles.subtitle}>Enter your credentials to access your account</Text>

            <View style={styles.demoBlock}>
              <Text style={styles.demoLabel}>Demo Accounts:</Text>
              <Text style={styles.demoLine}>admin (Admin)</Text>
              <Text style={styles.demoLine}>user1 (Cotabato City)</Text>
              <Text style={styles.demoLine}>user2 (Basilan)</Text>
              <Text style={styles.demoLine}>user3 (Metro Manila 1st)</Text>
              <Text style={styles.demoLine}>Password: 12345678</Text>
            </View>

            {usernameField}
            {passwordField}

            <Text style={styles.forgotLink}>Forgot Password?</Text>

            {signInButton}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fieldGroup: {
    gap: Spacing.one,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: CARD_TEXT,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 48,
    backgroundColor: FIELD_BACKGROUND,
  },
  inputRowFocused: {
    borderColor: Brand.navy,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    color: CARD_TEXT,
    outlineWidth: 0,
  },
  button: {
    height: 52,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWide: {
    borderRadius: Spacing.two,
  },
  buttonEnabled: {
    backgroundColor: Brand.navy,
  },
  buttonDisabled: {
    backgroundColor: '#C4C8D0',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Narrow (phone) layout — full-bleed hills photo + centered card
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: Spacing.five,
    padding: Spacing.five,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  signInTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: CARD_TEXT,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: CARD_MUTED,
    textAlign: 'center',
    marginTop: -Spacing.two,
  },
  demoBlock: {
    alignItems: 'center',
    gap: 2,
  },
  demoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: CARD_MUTED,
    marginBottom: 2,
  },
  demoLine: {
    fontSize: 12,
    color: PLACEHOLDER,
  },
  forgotLink: {
    fontSize: 13,
    fontWeight: '600',
    color: CARD_TEXT,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },

  // Wide (tablet/desktop/web) layout — split screen, form left / photo right
  wideRoot: {
    flex: 1,
    flexDirection: 'row',
  },
  wideLeft: {
    flex: 1,
    maxWidth: 560,
    backgroundColor: '#ffffff',
  },
  wideLeftScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.six,
    gap: Spacing.three,
  },
  wideRight: {
    flex: 1.2,
  },
  logo: {
    width: 140,
    aspectRatio: 396 / 402,
    alignSelf: 'center',
  },
  wideSignInTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5B6B82',
    textAlign: 'center',
    marginTop: Spacing.two,
  },
  wideSubtitle: {
    fontSize: 15,
    color: CARD_MUTED,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  wideForgotLink: {
    fontSize: 14,
    color: CARD_TEXT,
    marginBottom: Spacing.one,
  },
});
