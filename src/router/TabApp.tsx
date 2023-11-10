import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigation from '@components/TabNavigation';
// import Dashboard from '@pages/dashboard';
import Dashboard from '@pages/dashboard';
import Transaksi from '@pages/transaksi';

const Tab = createBottomTabNavigator();
export const TabApp = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 90,
                },
                headerShown: false,
            }}
            tabBar={(props) => <TabNavigation {...props} />}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Transaksi" component={Transaksi} />
        </Tab.Navigator>
    )
}