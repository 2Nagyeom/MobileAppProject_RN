import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';

import database from '@react-native-firebase/database';

import { useRecoilState } from 'recoil';
import { atomStoreName, atomStorenum } from '../atom/atom';

const CurrentReservation = () => {
    const navigation = useNavigation()

    const [atStoreNum, setAtStoreNum] = useRecoilState(atomStorenum) //마커 선택한 스토어 번호
    const [atStoreName, setAtStoreName] = useRecoilState(atomStoreName) //마커 선택한 스토어 이름

    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)

    useEffect(() => {
        console.log(atStoreNum)
        database().ref('/store/' + atStoreNum).once('value').then((res) => {
            console.log(res.val())
            setCurrentTable(res.val().quest)
            setCurrentWait(res.val().wait)
        })
    }, [])


    return (
        <SafeAreaView>
            <Text>매장 테이블 수 : {currentTable}개</Text>
            <Text>현재 대기자 수 : {currentWait}팀</Text>
            <View style={{ borderRadius: 10, backgroundColor: 'yellow', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text>예약하기</Text>
            </View>
        </SafeAreaView>
    )
}

export default CurrentReservation;