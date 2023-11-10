import { DetailOrderBarangAttributes, OrderBarangAttributes } from "@pages/prosesOrder";
import { RouteProp } from "@react-navigation/native";
import { OutletAttributes } from "./order";

export type StackNavigatorParamList = {
    TabApp: undefined,
    Login: undefined,
    Register: undefined,
    ListOutlet: undefined,
    ProsesOrder: {
        listDetailOrders: DetailOrderBarangAttributes[],
        outlet: OutletAttributes
    },
    OrderBarang?: {
        listOrders: OrderBarangAttributes,
        onUpdate: (data: OrderBarangAttributes, indexOfArray: number) => void,
        onAdd: (data: OrderBarangAttributes) => void,
        onRemove: (indexOfArray: number) => void
    }

};

export type OrderBarangProps = RouteProp<StackNavigatorParamList, 'OrderBarang'>;
