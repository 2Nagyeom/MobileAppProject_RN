import React, { useState } from 'react';
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
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const enrollmentPage = () => {
    const [id, setID] = useState('');


    const navigation = useNavigation();

    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <ScrollView>
                <View
                    style={{
                        width: chwidth - 40,
                        marginLeft: 20,
                        marginTop: 40,
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ marginTop: 60 }}>
                            <TextInput
                                style={{
                                    width: chwidth - 50,
                                    marginTop: 10,
                                    marginLeft: 10,
                                    marginBottom: 10,
                                    color: 'black',
                                }}
                                placeholder={'메뉴이름입력'}
                                value={id}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginBottom: 10,
                                    borderRadius: 45,
                                    borderWidth: 1,
                                    width: 220,
                                    height: 220,
                                    justifyContent: 'center',
                                    borderColor: '#6485E6',
                                    alignItems: 'center',
                                    color: 'black',
                                }}>
                                <Text>사진등록</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                style={{
                                    width: chwidth - 50,
                                    marginTop: 20,
                                    marginLeft: 10,
                                    color: 'black',
                                }}
                                placeholder={'메뉴간단설명'}
                                value={id}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ marginLeft: 20, marginBottom: 50 }}>
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
                    <Text style={{ color: 'black' }}>등록하기</Text>
                </View>

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
                    <Text style={{ color: 'black' }}>뒤로가기</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default enrollmentPage;