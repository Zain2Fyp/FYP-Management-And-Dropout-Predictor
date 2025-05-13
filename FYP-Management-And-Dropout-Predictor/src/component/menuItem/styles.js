import { StyleSheet } from "react-native";
import { colors } from "../../utils/database";
import { height, width } from "../../utils/Dimension";

export const styles = StyleSheet.create({
    menuContainer: {
        width: width(90),
        justifyContent: 'center',
        alignSelf: "center",
        alignItems: 'flex-end',
        // backgroundColor: colors.red
        marginVertical: height(1)
    },
    optionText: {
        height: height(4),
        fontSize: 18,
        fontWeight: '700',
        color: colors.white

    }
})