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

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const test = () => {
    const [id, setID] = useState('');
    const [pwd, setPWD] = useState('');

    const databaseRfunction = () => {
        database()
            .ref('/users/manager/name/' + id)
            .once('value')
            .then((snapshot) => {
                console.log('-------------------예약정보---------------------');
                console.log(snapshot.val());
                console.log(id + ' 가 예약했습니다!');
                Alert.alert(
                    "예약되었습니다!!",
                    [
                        { text: "확인", onPress: () => console.log("OK Pressed") }
                    ]
                );
            });
    };

    const databaseDfunction = () => {
        database()
            .ref('/users/manager/name/' + id)
            .remove('/users/manager / name /' + id)
            .then((snapshot) => {
                console.log('-------------------예약정보---------------------');
                console.log(snapshot.val());
                console.log(id + ' 가 예약취소했습니다!');
                Alert.alert(
                    "예약취소되었습니다!!",
                    [
                        { text: "확인", onPress: () => console.log("OK Pressed") }
                    ]
                );
            });
    };



    const navigation = useNavigation();

    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <ScrollView>

                <View style={{ width: chwidth, height: 70, borderRadius: 40, borderWidth: 1, flexDirection: 'row' }}>
                    <View style={{ width: chwidth / 2 - 1, height: '100%' }}>
                    </View>

                    <View style={{ height: 70, borderWidth: 0.5, width: 0 }}>
                    </View>

                    <View style={{ width: chwidth / 2, height: '100%' }}>
                    </View>

                </View>


                <View
                    style={{
                        width: chwidth - 40,
                        marginLeft: 20,
                        marginTop: 40,
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <View>
                            <AutoHeightImage
                                width={150}
                                source={Logo}
                            />
                        </View>
                        <View style={{ marginTop: 60 }}>
                            <View
                                style={{
                                    marginTop: 40,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    width: chwidth - 40,
                                    height: 50,
                                    justifyContent: 'center',
                                    borderColor: '#6485E6',
                                }}>
                                <TextInput
                                    style={{ width: chwidth - 50, marginLeft: 10 }}
                                    placeholder={'ID'}
                                    onChangeText={setID}
                                    value={id}
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
                                <TextInput
                                    style={{ width: chwidth - 50, marginLeft: 10 }}
                                    placeholder={'PWD'}
                                    onChangeText={setPWD}
                                    value={pwd}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ marginLeft: 20, marginBottom: 50 }}>
                <TouchableWithoutFeedback onPress={() => { databaseRfunction() }}>
                    <View
                        style={{
                            marginTop: 60,
                            borderRadius: 60,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                        <Text style={{ color: 'white' }}>예약하기</Text>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={() => { databaseDfunction }}>
                    <View style={{ marginTop: 60 }}
                        style={{
                            marginTop: 15,
                            borderRadius: 60,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: '#6485E6',
                        }}>
                        <Text style={{ color: 'black' }}>취소하기</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: chwidth - 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: '#6485E6',
                        fontWeight: '900',
                    }}>아직 회원이 아니신가요?</Text>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default test;