import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from '@type/typeScreen';
import { TabApp } from './TabApp';
import { UserDataType } from '../type/user';
import Login from '@pages/login';
import Register from '@pages/register';
import ListOutlet from '@pages/listOutlet';
import ProsesOrder from '@pages/prosesOrder';
import OrderBarang from '@pages/orderBarang';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const MainStack = ({ user }: { user: UserDataType }) => {


    return (
        <Stack.Navigator initialRouteName='TabApp' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabApp" component={TabApp} />
            <Stack.Screen name="ListOutlet" component={ListOutlet} />
            <Stack.Screen name="ProsesOrder" component={ProsesOrder} />
            <Stack.Screen name="OrderBarang" component={OrderBarang} />
        </Stack.Navigator>
    )
}

export default MainStack