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
import { atomManagernum, atomStoreName, atomStorenum } from '../atom/atom';

const chwidth = Dimensions.get('window').width;

const CurrentReservation = () => {
    const navigation = useNavigation()

    // const [atStoreNum, setAtStoreNum] = useRecoilState(atomStorenum) //마커 선택한 스토어 번호
    // const [atStoreName, setAtStoreName] = useRecoilState(atomStoreName) //마커 선택한 스토어 이름
    const [atManagernum, setAtManagernum] = useRecoilState(atomManagernum)

    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)

    const StoreRef = database().ref('/store/' + atManagernum)

    useEffect(() => {
        console.log(atManagernum)
        StoreRef.on('value', (res) => {
            console.log(res.val())
            setCurrentTable(res.val().quest)
            setCurrentWait(res.val().wait)
        })
    }, [])

    function waitPlusMinus(param) {
        if (param == 'plus') {
            var cc = currentWait + 1
            StoreRef.update({ wait: cc }).then(() => { console.log('wait plsu 완료!') })
            setCurrentWait(cc)
        } else {
            var cc = currentWait - 1
            StoreRef.update({ wait: cc }).then(() => { console.log('wait minus 완료!') })
            setCurrentWait(cc)
        }
    }



    function tablePlusMinus(param) {
        if (param == 'plus') {
            var cc = currentTable + 1
            StoreRef.update({ quest: cc }).then(() => { console.log('table plsu 완료!') })
            setCurrentTable(cc)
        } else {
            var cc = currentTable - 1
            StoreRef.update({ quest: cc }).then(() => { console.log('table minus 완료!') })
            setCurrentTable(cc)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 20, flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 20, }}>매장 테이블 수: {currentTable}개</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableWithoutFeedback onPress={() => {
                        tablePlusMinus('minus')
                    }}>
                        <View style={{
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
                    </TouchableWithoutFeedback>
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

                        <Text>{currentTable}</Text>
                    </View>


                    <TouchableWithoutFeedback onPress={() => {
                        tablePlusMinus('plus')
                    }}>
                        <View style={{
                            borderRadius: 40,
                            borderWidth: 1,
                            marginLeft: 10,
                            width: chwidth - 320,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 65,
                                height: 90
                            }}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>


                <Text style={{ textAlign: 'center', fontSize: 20, }}>대기 팀 수: {currentWait}개</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableWithoutFeedback onPress={() => {
                        waitPlusMinus('minus')
                    }}>
                        <View style={{
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
                    </TouchableWithoutFeedback>
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

                        <Text>{currentWait}</Text>
                    </View>


                    <TouchableWithoutFeedback onPress={() => {
                        waitPlusMinus('plus')
                    }}>
                        <View style={{
                            borderRadius: 40,
                            borderWidth: 1,
                            marginLeft: 10,
                            width: chwidth - 320,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 65,
                                height: 90
                            }}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

            <View style={{
                borderRadius: 10,
                backgroundColor: 'yellow',
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>뒤로가기</Text>
            </View>

        </SafeAreaView>
    )
}

export default CurrentReservation;