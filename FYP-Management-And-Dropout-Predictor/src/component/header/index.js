import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';


export default function HeaderComponent({ title }) {
    return (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{title} DashBoard</Text>
        </View>
    );
}
