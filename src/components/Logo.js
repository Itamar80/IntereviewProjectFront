import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    container: {
        flexGrow: .3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#455a64',
    },
    logo: {
        width: 300,
        height: 80,
    },

});