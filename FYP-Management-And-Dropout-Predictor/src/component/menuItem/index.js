import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { styles } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { height } from '../../utils/Dimension';

export default function MenuItemComponent({ setState }) {
    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select Option')
    const hideMenu = (item) => {
        setSelectedOption(item)
        if (setState) {
            setState(item); // Update parent state if function is provided
        }
        setVisible(false);
    }

    const showMenu = () => setVisible(true);

    return (
        <View style={styles.menuContainer}>
            <Menu
                visible={visible}
                anchor={<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text onPress={showMenu} style={styles.optionText}>{selectedOption ? selectedOption : 'Select Option'}</Text>
                    <View style={{ height: height(4), alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="down" size={18} color="#fff" />
                    </View>
                </View>
                }
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={() => hideMenu("Student")} >Student</MenuItem>
                <MenuItem onPress={() => hideMenu('Supervisor')}>Supervisor</MenuItem>
                <MenuItem onPress={() => hideMenu('Batch Advoiser')}>Batch Advisor</MenuItem>
                <MenuDivider />
            </Menu>
        </View>
    );
}