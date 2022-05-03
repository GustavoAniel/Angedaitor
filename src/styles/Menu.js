import { StyleSheet } from "react-native";

const styleMenu = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 4},
        elevation: 20,
        marginBottom: 50
    },
    tituloCard: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },


    btnMenu: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 4},
        elevation: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    icone: {
        color: 'white'
    },
    btnGroups: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginVertical: 20
    }
})

export default styleMenu;