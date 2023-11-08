import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import IfComponent from "@components/IfComponent";
import { ActivityIndicator, View } from "react-native";

const Router = () => {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <>
      <IfComponent condition={isLoading}>
        <View className="flex-1 justify-center items-center absolute z-50 top-0 bottom-0 left-0 right-0 m-auto bg-[#000] opacity-40">
          <ActivityIndicator size="large" color="white" />
        </View>
      </IfComponent>
      <NavigationContainer>
        {user.jwt ?
          <MainStack user={user} /> :
          <AuthStack />
        }
      </NavigationContainer>
    </>
  );
};


export default Router;
