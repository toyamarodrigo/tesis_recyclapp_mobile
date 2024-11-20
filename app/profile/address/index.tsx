import CardProfile from "@components/CardProfile";
import DataEmpty from "@components/DataEmpty";
import { useAddressClerkId, useUpdateAddress } from "@hooks/useAddress";
import { useAddressStore } from "@stores/useAddressStore";
import { Link, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import {
  Title,
  Button,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "src/theme";
import { Address, AddressPut } from "@models/address.type";
import { useUser } from "@clerk/clerk-expo";

export default function Addresses() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user?.id) {
    return null;
  }

  const theme = useAppTheme();
  const router = useRouter();
  const { setCurrentAddress } = useAddressStore();
  const { mutate: updateAddress } = useUpdateAddress();
  //TODO recarga de direcciones post update
  const { data: addressList, error, isLoading } = useAddressClerkId(user.id);

  const handleDelete = (address: Address) => {
    const removeAddress: AddressPut = {
      id: address.id,
      isArchived: true,
    };
    updateAddress(removeAddress);
  };

  const handleEdit = (address: Address) => {
    setCurrentAddress(address);
    router.push("/profile/address/new");
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Mis direcciones</Title>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
            <View style={{ width: "100%" }}>
              <View style={{ marginBottom: 20 }}>
                {isLoading && (
                  <ActivityIndicator
                    color={theme.colors.primary}
                    size={"large"}
                  />
                )}
                {error && (
                  <DataEmpty displayText="Ocurrió un problema al mostrar las direcciones. Intente nuevamente." />
                )}
                {!isLoading &&
                  !error &&
                  addressList &&
                  addressList.length === 0 && (
                    <DataEmpty displayText="Aún no tienes direcciones creadas. Puedes agregar una a continuación." />
                  )}
                {addressList &&
                  addressList.map((address) => (
                    <CardProfile
                      key={address.id}
                      title={address.street}
                      type={"dirección"}
                      onDelete={() => handleDelete(address)}
                      onEdit={() => handleEdit(address)}
                    />
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ padding: 16, gap: 15 }}>
          <Button
            mode="contained"
            onPress={() => router.push("/profile/address/new")}
          >
            Agregar dirección
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
