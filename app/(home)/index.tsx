import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import Home from "app/(tabs)";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  console.log("user", user);
  return (
    <View>
      <SignedIn>
        <Home />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
