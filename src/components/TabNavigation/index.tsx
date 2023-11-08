import { View } from 'react-native'
import TabItem from './TabItem';

const TabNavigation = ({ state, descriptors, navigation }: any) => {
  return (
    <View className='flex absolute bottom-0 items-center w-full justify-center  bg-primary '>
      <View className="flex flex-row shadow-md w-full justify-evenly py-1 px-2" >
        {
          state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            return (
              <TabItem
                key={index}
                isFocused={isFocused}
                onLongPress={onLongPress}
                onPress={onPress}
                label={label} />
            );
          })
        }
      </View>
    </View >
  );
}

export default TabNavigation