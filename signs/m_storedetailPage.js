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
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const m_storedetailPage = () => {
    const [id, setID] = useState('');
    const [pwd, setPWD] = useState('');

    const navigation = useNavigation();

    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>

            <View style={{ marginLeft: 20, marginBottom: 30 }}>

                <View
                    style={{
                        width: chwidth - 40,
                        marginLeft: 20,
                        marginTop: 200,
                        color: 'black',

                    }} />
                <Text style={{ fontSize: 20 }}>당일예약자</Text>
                <View style={{
                    borderWidth: 1,
                    width: chwidth - 40,
                    height: 0,
                    borderColor: '#6485E6',
                }}>
                    <View
                        style={{
                            marginTop: 10,
                            borderRadius: 60,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: '700'
                        }}>예약자 확인하기</Text>
                    </View>
                </View>

                <View
                    style={{
                        width: chwidth - 70,
                        marginLeft: 20,
                        marginTop: 200,
                        alignItems: 'center',


                    }}>
                    <Text style={{
                        color: '#6485E6',
                        fontSize: 24,
                    }}>다른 날에 예약한 사람이 있어요!</Text>
                </View>
                <View style={{
                    borderWidth: 1,
                    width: chwidth - 40,
                    height: 0,
                    borderColor: '#6485E6',

                }}>
                    <View
                        style={{
                            marginTop: 10,
                            borderRadius: 60,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                        <Text style={{ color: 'black', fontWeight: '700' }}>예약자 확인하기</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}
                    style={{
                        marginTop: 150,
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#6485E6',
                    }}>
                    <Text style={{ color: 'black' }}>뒤로가기</Text>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default m_storedetailPage;