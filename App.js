import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import LoginScreen from './App/Screen/LoginScreen';
import {ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo"

export default function App() {
  const [fontsLaded] = useFonts({
    'outfit': require('./assets/Fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
    'outfit-light': require('./assets/Fonts/Outfit-Light.ttf'),
    'outfit-semibold': require('./assets/Fonts/Outfit-SemiBold.ttf'),
  })
  return (
    <ClerkProvider publishableKey='pk_test_aHVtb3JvdXMtcGlnbGV0LTQ5LmNsZXJrLmFjY291bnRzLmRldiQ
'>
      <View style={styles.container}>

     <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
        <LoginScreen />
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
