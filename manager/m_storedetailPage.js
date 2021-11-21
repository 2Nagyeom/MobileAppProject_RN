import React, { useState } from 'react';
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

    const navigation = useNavigation();

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


                    <ScrollViewItem></ScrollViewItem>
                    <ScrollViewItem></ScrollViewItem>
                    <ScrollViewItem></ScrollViewItem>

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
                    <ScrollViewItem></ScrollViewItem>
                    <ScrollViewItem></ScrollViewItem>
                    <ScrollViewItem></ScrollViewItem>
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

const ScrollViewItem = () => {
    return (
        <View>
            <View style={{ width: chwidth - 60, marginLeft: 30, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>아이디</Text>
                <Text>날짜/시간</Text>

                <View style={{ borderRadius: 10, width: 50, height: 40, backgroundColor: '#6485E6', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>삭제</Text>
                </View>
            </View>
            <View style={{ width: chwidth - 60, borderWidth: 0.5, marginLeft: 30, marginTop: 5 }}></View>
        </View>
    )
}

export default m_storedetailPage;