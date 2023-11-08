import { Platform, StyleSheet } from "react-native"

const styles: { shadow: any, borderStyle: any } = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.65,
        elevation: 5,
    },
    borderStyle: {
        borderTopWidth: 1,
        borderStyle: Platform.OS === 'android' ? 'dashed' : 'solid',
        width: '100%'
    }
})
export default styles