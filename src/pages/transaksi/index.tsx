import CardHistory from '@components/Card/CardHistory'
import Header from '@components/Header'
import { BASE_URL } from '../../constant/url'
import { AuthContext } from '@context/authContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { HistoryOrderType } from '@type/order';
import ButtonFilterPeriode from '@components/Button/ButtonFilterPeriode';
import ButtonFilterByCategory from '@components/Button/ButtonFilterByCategory';
import SafeAreaScroll from '@components/SafeAreaScroll';

import {
    BarChart,
    LineChart
} from "react-native-chart-kit"
import useOutlet from '@hooks/useOutlet';
import useModal from '@hooks/modal';
import Button from '@components/Button/Button';
import IconImage from '@components/IconImage';


function hitungPerOutlet(history: HistoryOrderType[]) {

    let outlets: string[] = [];
    let totals: number[] = [];
    history.map((item) => {
        if (!outlets.includes(item.attributes.outlet.data.attributes.nama)) {
            outlets.push(item.attributes.outlet.data.attributes.nama)
            totals.push(item.attributes.total_gross / 1000)
        } else {
            //search index on outlets
            const index = outlets.findIndex((outlet) => outlet === item.attributes.outlet.data.attributes.nama)
            totals[index] += item.attributes.total_gross / 1000
        }
    })

    return {
        outlets,
        totals
    }
}



function Transaksi() {
    const { user, profile } = useContext(AuthContext);

    const [historisAll, setHistorisAll] = useState<HistoryOrderType[]>([])
    const [historis, setHistoris] = useState<HistoryOrderType[]>([])
    const [selectPeriode, setSelectPeriode] = useState('Semua')
    const [selectOutlet, setSelectOutlet] = useState('Semua')

    const visibleChart = useModal();

    useEffect(() => {

        if (!profile?.salesman.periode?.id) return
        function getPeride() {
            let filterPeriode = selectPeriode === 'Semua' ? '' : `&filters[periode][nama]=${selectPeriode}`
            let filterOutlet = selectOutlet === 'Semua' ? '' : `&filters[outlet][nama]=${selectOutlet}`

            const url = BASE_URL(`/orders?populate=*&filters[salesman][id]=${profile?.salesman?.id}${filterPeriode}${filterOutlet}`)
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then((response) => {
                const { data } = response.data
                setHistoris(data)
                if (selectPeriode === 'Semua' && selectOutlet === 'Semua') {
                    setHistorisAll(data)
                }


            }).catch((error) => {
                // console.log(error)
            })
        }
        getPeride();

    }, [profile, selectPeriode, selectOutlet]);

    const DATA_CHART = useMemo(() => hitungPerOutlet(historis), [historis])


    return (
        <SafeAreaView>
            <Header title='Report' iconRight={
                <TouchableOpacity onPress={visibleChart.toggleModal}><IconImage source={require('../../assets/icons/iconChartWhite.png')} /></TouchableOpacity>
            } />
            <View className='px-2 flex justify-center'>
                {visibleChart.visible &&
                    <TouchableOpacity onPress={visibleChart.toggleModal}>
                        <BarChart
                            data={{
                                labels: DATA_CHART.outlets,
                                datasets: [
                                    {
                                        data: DATA_CHART.totals
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - 16} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#1278AE",
                                backgroundGradientFrom: "#1278AE",
                                backgroundGradientTo: "#70C8F6",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>
            <View className='mx-4 my-4 flex flex-row justify-between'>
                <View>
                    <Text className='text-center text-xl'>Periode</Text>
                    <View className='h-10'>
                        <ButtonFilterPeriode setSelectPeriodeProps={setSelectPeriode} />
                    </View>
                </View>
                <View>
                    <Text className='text-center  text-xl'>Outlet</Text>
                    <View className='h-10'>
                        <ButtonFilterByCategory setSelectOutletProps={setSelectOutlet} />
                    </View>
                </View>
            </View>
            <View className='mx-4 my-2'>
                <FlatList
                    data={historis}
                    renderItem={({ item }) => <CardHistory history={item} />}
                    keyExtractor={() => Math.random().toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <SafeAreaScroll />}
                />
            </View>
        </SafeAreaView>
    )
}

export default Transaksi


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});