import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    fontSize,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';

import database from '@react-native-firebase/database';


import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { atomManagernum } from '../atom/atom';
import { useRecoilState } from 'recoil';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const m_storedetailPage = () => {

    const [id, setID] = useState('');
    const [pwd, setPWD] = useState('');

    const [atManagernum, setAtManagernum] = useRecoilState(atomManagernum)

    const [currentReservArray, setCurrentReservArray] = useState([])
    const [otherReservArray, setOtherReservArray] = useState([])

    const navigation = useNavigation();

    useEffect(() => {
        reservLoad()
    }, [])

    function reservLoad(params) {
        database().ref('/reserve/' + atManagernum).on('value', (res) => {
            console.log(res.val())
            // console.log(Object.keys(res.val()).length)
            // console.log(Object.values(res.val())[0])
            setCurrentReservArray([])
            setOtherReservArray([])

            if (res.val() != null) {
                for (var i = 0; i < Object.keys(res.val()).length; i++) {
                    if (Object.values(res.val())[i].time == 'now') {
                        setCurrentReservArray((rr) => [...rr, Object.values(res.val())[i]])
                    } else {
                        setOtherReservArray((rr) => [...rr, Object.values(res.val())[i]])
                    }
                }
            }
        })
    }

    function deleteData(param) {
        const dataRef = database().ref('/reserve/' + atManagernum + '/' + param)
        dataRef.once('value').then((res) => {
            if (res.val !== null) {
                Alert.alert('삭제하시겠습니까?', '',
                    [
                        {
                            text: "취소",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "삭제", onPress: () => {
                                dataRef.remove().then(() => {
                                    Alert.alert('삭제 완료')
                                })
                            }
                        }
                    ])
            } else {
                Alert.alert('이미 삭제된 데이터 입니다!')
            }
        })
    }


    const ScrollViewItem = (prop) => {
        // console.log(prop)
        return (
            <View>
                <View style={{ width: chwidth - 60, marginLeft: 30, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>{prop.id}</Text>
                    <Text>{prop.date == 'now' ? '오늘' : prop.date}/{prop.time == 'now' ? '실시간' : prop.time}</Text>

                    <TouchableWithoutFeedback onPress={() => {
                        console.log(prop.id);
                        deleteData(prop.id)
                    }}>
                        <View style={{ borderRadius: 10, width: 50, height: 40, backgroundColor: '#6485E6', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>삭제</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ width: chwidth - 60, borderWidth: 0.5, marginLeft: 30, marginTop: 5 }}></View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <View style={{
                marginTop: 10,
                marginBottom: 50,
                alignItems: 'center'
            }}>
                <View>
                    <AutoHeightImage
                        width={150}
                        source={Logo} />
                </View>
            </View>
            <View style={{
                width: chwidth - 70,
                marginLeft: 30,
                marginTop: 10,
            }}>
                <Text style={{
                    color: '#6485E6',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>당일예약자</Text>
            </View>
            <View style={{
                borderWidth: 1,
                marginLeft: 20,
                width: chwidth - 40,
                height: 0,
                borderColor: '#6485E6',
            }}>
            </View>
            <View style={{ flex: 1, marginBottom: 10 }}>
                <ScrollView style={{ flex: 1 }}>

                    {/* 실시간 예약 있을 시 출력! */}
                    {
                        currentReservArray.map((valuse, index) => {
                            console.log('??????');
                            console.log(valuse)
                            return (
                                <ScrollViewItem key={index} id={valuse.id} date={valuse.day} time={valuse.time}></ScrollViewItem>
                            )
                        })
                    }


                </ScrollView>
            </View>



            <View style={{
                width: chwidth - 70,
                marginLeft: 20,
            }}>
                <Text style={{
                    color: '#6485E6',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>다른 날에 예약한 사람이 있어요!</Text>
            </View>
            <View style={{
                borderWidth: 1,
                width: chwidth - 40,
                height: 0,
                borderColor: '#6485E6',
                marginLeft: 20,
            }}>
            </View>

            <View style={{ flex: 1, marginBottom: 10 }}>
                <ScrollView style={{ flex: 1 }}>

                    {/* 예약 있을 시 출력! */}
                    {
                        otherReservArray.map((valuse, index) => {
                            console.log('??????');
                            console.log(valuse)
                            return (
                                <ScrollViewItem key={index} id={valuse.id} date={valuse.day} time={valuse.time}></ScrollViewItem>
                            )
                        })
                    }

                </ScrollView>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("매장사장 메인페이지")}>
                <View style={{
                    marginLeft: 20,
                    borderRadius: 60,
                    borderWidth: 2,
                    width: chwidth - 40,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#6485E6',
                    marginBottom: 10
                }}>
                    <Text style={{ color: 'black' }}>뒤로가기</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    );
};



export default m_storedetailPage;