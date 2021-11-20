

import QRCode from 'react-native-qrcode-svg';


const qrcodePage = () => {
    <View style={styles.qrCodeStyle}>
        <View>
            <QRCode
                size={200}			  // 로고 사이즈 조절
                value={data.address}   // 실제 연결 될 주소 
                logoSize={300}
                logoBackgroundColor='transparent'
            />
        </View>
    </View>
}

export default qrcodePage;
