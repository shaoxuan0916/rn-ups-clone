import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { useTailwind } from "tailwind-rn/dist"
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { TabStackParamList } from "../navigator/TabNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigator/RootNavigator"
import { Image } from "@rneui/themed"
import Loader from "../components/Loader"
import { Input } from "@rneui/base"
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from "../graphql/queries"
import CustomerCard from "../components/CustomerCard"

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>

const CustomersScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<CustomersScreenNavigationProp>()
  const [input, setInput] = useState<string>("")

  const { loading, error, data } = useQuery(GET_CUSTOMERS)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: "#59C1CC" }}>
      <Image
        style={tw("w-full h-64")}
        // source={{ uri: "../assets/customer2" }}
        // source={{ uri: "https://imgur.com/uU8GTZM" }}
        source={{ uri: "https://source.unsplash.com/1cqIcrWFQBI" }}
        // transitionDuration={1000}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<Loader />}
      />

      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />

      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.toLowerCase().includes(input.toLowerCase())
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  )
}

export default CustomersScreen
