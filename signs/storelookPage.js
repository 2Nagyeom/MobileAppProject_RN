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
const call = require('../img/call.png');
const message = require('../img/message.png');
const gps = require('../img/gps.png');
const clock = require('../img/clock.png');

const chwidth = Dimensions.get('window').width;

const storelookPage = () => {

    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
            <View
                style={{
                    width: chwidth - 40,
                    marginLeft: 20,
                    marginTop: 40,
                }}>
                <View>
                    <Text style={{
                        fontSize: 45,
                    }}>은비칼국수</Text>
                </View>

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
                    <Text style={{ color: 'white' }}>실시간 예약하기</Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
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
                <View style={{
                    marginTop: 30
                }}>
                    <Text style={{
                        textAlign: 'center'
                    }}>문의하기</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 80,
                        borderColor: '#6485E6',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <AutoHeightImage
                            width={50}
                            source={call}
                        />
                    </View>
                    <View style={{
                        borderWidth: 1,
                        borderColor: '#6485E6',
                        height: '100%',
                    }}>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <AutoHeightImage
                            width={50}
                            source={message}
                        />
                    </View>
                </View>
                <View style={{
                    marginTop: 100,
                }}>
                    <View style={{
                        width: chwidth - 50,
                        marginLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <AutoHeightImage
                            width={30}
                            source={gps}
                        />
                        <Text style={{
                            marginLeft: 30,
                            fontSize: 20
                        }}>남구 용당동</Text>
                    </View>
                    <View style={{
                        marginTop: 40,
                        width: chwidth - 50,
                        marginLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <AutoHeightImage
                            width={30}
                            source={clock}
                        />
                        <Text style={{
                            marginLeft: 30,
                            fontSize: 20
                        }}>10 : 00 ~ 22 : 00</Text>
                    </View>
                    <View style={{
                        marginTop: 40,
                        width: chwidth - 50,
                        marginLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <AutoHeightImage
                            width={30}
                            source={call}
                        />
                        <Text style={{
                            marginLeft: 30,
                            fontSize: 20
                        }}>1111-1111-1111</Text>
                    </View>
                </View>
            </View>


        </SafeAreaView >
    );
};

export default storelookPage;