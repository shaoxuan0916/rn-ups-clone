import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { TailwindProvider } from "tailwind-rn"
import CustomersScreen from "./screens/CustomersScreen"
import utilities from "./tailwind.json"
import { NavigationContainer } from "@react-navigation/native"
import RootNavigator from "./navigator/RootNavigator"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"

const LOCAL_SYSTEM_IP_ADDRESS = "192.168.59.61"
const PORT = "5001"

const client = new ApolloClient({
  //note: this is the local IP address of the system
  link: createHttpLink({
    uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/api/dozing-manta`,
  }),
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
