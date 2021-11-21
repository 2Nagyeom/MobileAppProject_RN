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
    Alert,
    fontSize,
    fontWeight
} from 'react-native';

import database from '@react-native-firebase/database';

import { useRecoilState } from 'recoil';
import { atomStoreName, atomStorenum } from '../atom/atom';

const chwidth = Dimensions.get('window').width;

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
            <View>
                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                    }}>매장 테이블 수 : {currentTable}개</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View
                            style={{
                                borderRadius: 40,
                                borderWidth: 1,
                                width: chwidth - 320,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6485E6',
                                borderColor: '#6485E6',
                            }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 70,
                                height: 95
                            }}>-</Text>
                        </View>
                        <View style={{
                            marginLeft: 10,
                            borderRadius: 50,
                            borderWidth: 8,
                            width: chwidth - 220,
                            height: 160,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderColor: '#6485E6',
                        }}>
                        </View>
                        <View
                            style={{
                                borderRadius: 40,
                                borderWidth: 1,
                                marginLeft: 10,
                                width: chwidth - 320,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6485E6',
                                borderColor: '#6485E6',
                            }} >
                            <Text style={{
                                color: 'white',
                                fontSize: 65,
                                height: 90
                            }}>+</Text>
                        </View>

                    </View>
                    <Text>현재 대기자 수 : {currentWait}팀</Text>
                    <View style={{ borderRadius: 10, backgroundColor: 'yellow', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>예약하기</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CurrentReservation;