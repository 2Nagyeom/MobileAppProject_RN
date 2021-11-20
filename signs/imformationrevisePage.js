import React, { useState } from 'react';
import database from '@react-native-firebase/database';

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

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { NUMBER_BINARY_OPERATORS } from '@babel/types';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const imformationrevisePage = () => {
    const [pwd, setPWD] = useState('');
    const [pwd_check, setPWD_CHECK] = useState('');
    const [num, setNUM] = useState('');

    const navigation = useNavigation();

    const databasefunction = () => {

        database()
            .ref('/users/Test/')
            .once('value').then((snapshot) => {
                console.log('삽입성공');
                if (pwd == snapshot.val().pwd)
                    Alert.alert("저번 비밀번호랑 같아요!")
                else if (pwd != pwd_check)
                    Alert.alert("비밀번호 불일치!")
                else {
                    Alert.alert("변경되었습니다!")
                    database()
                        .ref('/users/Test')
                        .update({
                            pwd: pwd,
                            phone: num,
                        })
                        .then(() => console.log('Data updated.'));
                }
            });
    };


    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <View style={{
                alignItems: 'center'
            }}>
                <AutoHeightImage
                    width={70}
                    source={Logo}
                />
            </View>
            <ScrollView >
                <View
                    style={{
                        width: chwidth - 40,
                        marginLeft: 20,
                        marginTop: 15,
                    }}>
                    <View style={{ alignItems: 'center' }}>

                        <View style={{ marginTop: 35 }}>
                            <View
                                style={{
                                    marginTop: 10,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    width: chwidth - 40,
                                    height: 50,
                                    borderColor: '#6485E6',
                                    justifyContent: 'center',
                                }}>
                                <TextInput onChangeText={(pwd) => { setPWD(pwd) }}
                                    style={{ width: chwidth - 50, marginLeft: 10 }}
                                    placeholder={'PWD'}
                                />
                            </View>
                            <View style={{ marginTop: 60 }}
                                style={{
                                    marginTop: 15,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    width: chwidth - 40,
                                    height: 50,
                                    borderColor: '#6485E6',
                                    justifyContent: 'center',
                                }}>
                                <TextInput onChangeText={(pwd_check) => { setPWD_CHECK(pwd_check) }}
                                    style={{ width: chwidth - 50, marginLeft: 10 }}
                                    placeholder={'PWD_CHECK'}
                                />
                            </View>
                            <View style={{ marginTop: 60 }}
                                style={{
                                    marginTop: 15,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    width: chwidth - 40,
                                    height: 50,
                                    borderColor: '#6485E6',
                                    justifyContent: 'center',
                                }}>
                                <TextInput onChangeText={(num) => { setNUM(num) }}
                                    style={{ width: chwidth - 50, marginLeft: 10 }}
                                    placeholder={'NUM'}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{
                marginLeft: 20
            }}>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('테스트 페이지')
                }}>
                    <View
                        style={{
                            width: chwidth - 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 15,
                        }}>
                        <Text style={{
                            color: '#6485E6',
                            fontSize: 20,
                        }}>매장사장이신가요?</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={() => { databasefunction() }}>
                <View
                    style={{
                        marginLeft: 20,
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6485E6',
                        borderColor: '#6485E6',
                    }}>
                    <Text style={{ color: 'white' }}>수정하기</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={{ marginTop: 60 }}
                style={{
                    marginLeft: 20,
                    marginTop: 15,
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
        </SafeAreaView >
    );
};


export default imformationrevisePage;