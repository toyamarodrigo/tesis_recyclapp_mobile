import CardProfile from "@components/CardProfile";
import DataEmpty from "@components/DataEmpty";
import { useAddressClerkId, useUpdateAddress } from "@hooks/useAddress";
import { useAddressStore } from "@stores/useAddressStore";
import { Link, useRouter } from "expo-router";
import { ScrollView, View, RefreshControl } from "react-native";
import {
  Title,
  Button,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "src/theme";
import type { Address, AddressPut } from "@models/address.type";
import { useUser } from "@clerk/clerk-expo";
import { useCallback, useState } from "react";
import { useUserStoreByClerk } from "@hooks/index";

export default function Addresses() {
  const { user, isLoaded } = useUser();
  const theme = useAppTheme();
  const router = useRouter();
  const { setCurrentAddress } = useAddressStore();
  if (!isLoaded || !user?.id) return null;
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const {
    data: addressList = [],
    isPending,
    refetch,
    isError,
  } = useAddressClerkId(user.id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const hasAddresses =
    addressList &&
    addressList?.length > 0 &&
    addressList?.some((address) => !address.isArchived);

  const handleDelete = async (address: Address) => {
    const removeAddress: AddressPut = {
      id: address.id,
      isArchived: true,
    };
    await updateAddress(removeAddress);
  };

  const handleEdit = (address: Address) => {
    setCurrentAddress(address);
    router.push("/profile/address/new");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        height: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary, fontWeight: 700 }}>
          Mis direcciones
        </Title>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        >
          <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
            <View style={{ width: "100%" }}>
              <View style={{ marginBottom: 20 }}>
                {isPending && (
                  <ActivityIndicator
                    color={theme.colors.primary}
                    size={"large"}
                  />
                )}
                {isError && (
                  <DataEmpty displayText="Ocurrió un problema al mostrar las direcciones. Intente nuevamente." />
                )}
                {!isPending && !isError && !hasAddresses && (
                  <DataEmpty displayText="Aún no tienes direcciones creadas. Puedes agregar una a continuación." />
                )}
                {hasAddresses &&
                  addressList.map((address) => {
                    if (address.isArchived) return null;
                    return (
                      <CardProfile
                        key={address.id}
                        title={address.street}
                        type={"dirección"}
                        onDelete={() => handleDelete(address)}
                        onEdit={() => handleEdit(address)}
                      />
                    );
                  })}
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
