import { StyleSheet } from "react-native";

const styleLemb = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: 160,
        height: 160,
        borderRadius: 5,
        marginRight: 8
    },
    miniCard: {
        flex: 1,
        backgroundColor: '#4440F5',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center'
    },
    titulo: {
        color: '#4D4D4D',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    horarioTexto: {
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    icon: {
        color: 'white',
    }
})

export default styleLemb;