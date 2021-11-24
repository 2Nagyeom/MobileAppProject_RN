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



const QrCodeCheck = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Text>가계이름</Text>
                <Text>아이디</Text>
                <Text>전화번호</Text>

                <Text>위 고객의 입장을 확인하시겠습니까?</Text>
            </View>

            <View style={{
                width: chwidth - 40,
                marginLeft: 20,
                padding: 10,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'yellow'
            }}>
                <Text>확인</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                <View style={{
                    width: chwidth - 40,
                    marginLeft: 20,
                    padding: 10,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'yellow'
                }}>
                    <Text>취소</Text>
                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default QrCodeCheck