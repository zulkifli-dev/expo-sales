import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from '@type/typeScreen';
import { TabApp } from './TabApp';
import { UserDataType } from '../type/user';
import ListOutlet from '@pages/listOutlet';
import ProsesOrder from '@pages/prosesOrder';
import OrderBarang from '@pages/orderBarang';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

const MainStack = ({ user }: { user: UserDataType }) => {


    return (
        <Stack.Navigator initialRouteName='TabApp' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabApp" component={TabApp} />
            <Stack.Screen name="ListOutlet" component={ListOutlet} />
            <Stack.Screen name="ProsesOrder" component={ProsesOrder} initialParams={{ listDetailOrders: [], outlet: undefined }} />
            <Stack.Screen name="OrderBarang" component={OrderBarang} initialParams={undefined} />
        </Stack.Navigator>
    )

}

export default MainStack