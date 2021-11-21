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

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const menudeletePage = () => {
    const [id, setID] = useState('');
    const [pwd, setPWD] = useState('');

    const navigation = useNavigation();

    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <View style={{
                marginTop: 10,
                alignItems: 'center',
            }}>
                <AutoHeightImage
                    width={100}
                    source={Logo}
                />
            </View>
            <ScrollView style={{
                flex: 1,
            }}>
                <View style={{
                    marginTop: 50,
                    marginLeft: 20,
                    marginBottom: 30,
                    width: chwidth - 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        marginTop: 30,
                    }}>
                        <TouchableWithoutFeedback
                            onPress={() => Alert.alert("메뉴를 수정할까요?")}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Text style={{ fontSize: 20 }}>메뉴이름</Text>
                                <Text style={{ fontSize: 20 }}>5000원</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 0,
                            borderColor: '#6485E6',
                        }} />
                    </View>
                    <View style={{
                        marginTop: 30,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ fontSize: 20 }}>메뉴이름</Text>
                            <Text style={{ fontSize: 20 }}>5000원</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 0,
                            borderColor: '#6485E6',
                        }} />
                    </View>
                    <View style={{
                        marginTop: 30,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{ fontSize: 20 }}>메뉴이름</Text>
                            <Text style={{ fontSize: 20 }}>5000원</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 0,
                            borderColor: '#6485E6',
                        }} />
                    </View>
                </View>
            </ScrollView>
            <View style={{
                alignItems: 'center',
                marginTop: 10,
            }}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('메뉴 등록 페이지')}>
                    <View style={{
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#6485E6',
                        backgroundColor: '#6485E6',
                        marginBottom: 10,

                    }}>
                        <Text style={{ color: 'black' }}>메뉴 등록하기</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('매장사장 메인페이지')}>
                    <View style={{
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#6485E6',
                        marginBottom: 10,
                    }}>
                        <Text style={{ color: 'black' }}>뒤로가기</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView >
    );
};

export default menudeletePage;