import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import StudentComponent from '../../component/studentComponent';
import HeaderComponent from '../../component/header';
import { styles } from './styles';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import SupervisorDashboard from '../../component/supervisorComponent';
import BatchAdvisorDashboard from '../../component/batchAdvoiser';

export default function HomeScreen({ route }) {
    const selectedOption = route?.params?.Option ? route?.params?.Option : 'Student'
    console.log("data", selectedOption);

    return (
        <ScreenWrapper style={styles.container} barStyle='light-content' statusBarColor='#000'>
            <HeaderComponent title={selectedOption} />
            {/* 
            <Text style={styles.header}>Home Screen</Text> */}
            {selectedOption === 'Student' && (
                <StudentComponent />
            )}
            {selectedOption === 'Supervisor' && (
                <SupervisorDashboard />
            )}
            {selectedOption === 'Batch Advoiser' && (
                <BatchAdvisorDashboard />

            )}
        </ScreenWrapper>
    );
}


