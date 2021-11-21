
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
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



const qrcodePage = () => {

    const navigation = useNavigation();

    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디



    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{
                marginBottom: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                }}>
                    입장 QR코드 입니다!
                </Text>
            </View>
            <QRCode value="atId" />
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('메인페이지');
            }}>
                <View style={{
                    marginTop: 40,
                }}>
                    <Text style={{ fontSize: 15 }}>
                        뒤로가기
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default qrcodePage;
