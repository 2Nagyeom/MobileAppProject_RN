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
    Dimensions,
    Alert,
    Modal
} from 'react-native';


const chwidth = Dimensions.get('window').width;



const QrCodeCheck = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                width: chwidth - 40,
                marginLeft: 20,
                borderRadius: 20,
                borderWidth: 10,
                borderColor: '#6485E6',
                marginTop: 20,
            }}>
                <View style={{
                    alignItems: 'flex-start',
                    marginLeft: 20,

                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>매장 이름 : </Text>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>아이디 :</Text>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>전화번호 : </Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: chwidth - 40,
                marginLeft: 20
            }}>
                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>위 고객의 입장을</Text>
                <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>확인하시겠습니까?</Text>
            </View>

            <View style={{
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
                <Text>확인</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                <View style={{
                    marginTop: 5,
                    marginLeft: 20,
                    borderRadius: 60,
                    marginBottom: 10,
                    borderWidth: 1,
                    width: chwidth - 40,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderColor: '#6485E6',
                }}>
                    <Text>취소</Text>
                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default QrCodeCheck