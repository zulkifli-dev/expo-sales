import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import clsx from 'clsx'


const TabItem = ({ index, isFocused, onPress, onLongPress, label }: any) => {
  const Icon = () => {
    if (label == 'Dashboard') {
      return isFocused ?
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/iconProfileWhite.png')} />
        :
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/iconProfileNavy.png')} />
    }
    // else if (label == 'Pengelola') {
    //   return isFocused ?
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/UsersA.png')} />
    //     :
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/Users.png')} />
    // }
    // else if (label == 'Report') {
    //   return isFocused ?
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/DocumentA.png')} />
    //     :
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/Document.png')} />
    // }
    // else if (label == 'Aset') {
    //   return isFocused ?
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/AsetA.png')} />
    //     :
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/Aset.png')} />
    // }
    // else if (label == 'Profil') {
    //   return isFocused ?
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/ProfilA.png')} />
    //     :
    //     <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/Profil.png')} />
    // }

    // return <Image style={{ width: 30, height: 30 }} source={require('../../assets/icons/Dashboard.png')} />
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
      className={clsx(' border-primary pb-1', isFocused && 'border-b-2')}
    >
      <Icon />
      <Text className={clsx('text-xs', isFocused ? 'text-white-0' : 'text-secondary')}>{label}</Text>
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
})