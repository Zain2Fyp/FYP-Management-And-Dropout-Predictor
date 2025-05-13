import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';

export default function Button({ style, textStyle, title, onPress, ...rest }) {
    return (
        <TouchableOpacity style={style ? style : styles.loginButton} onPress={onPress} {...rest}>
            <Text style={textStyle ? textStyle : styles.loginButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}
