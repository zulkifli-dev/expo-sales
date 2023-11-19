import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '@pages/Login';
import { StackNavigatorParamList } from '@type/typeScreen';
import { TabApp } from './TabApp';
import Dashboard from '@pages/dashboard';
import Login from '@pages/login';
import Register from '@pages/register';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Register" component={Register} /> */}
        </Stack.Navigator>
    )
}

export default AuthStack 