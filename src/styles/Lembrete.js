import { StyleSheet } from "react-native";

const styleLemb = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: 160,
        height: 160,
        borderRadius: 5,
        margin: 5
    },
    miniCardAzul: {
        flex: 1,
        backgroundColor: '#4440F5',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center'
    },
    miniCardCinza: {
        flex: 1,
        backgroundColor: '#525252',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center'
    },
    miniCardVerde: {
        flex: 1,
        backgroundColor: '#1EB91B',
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center'
    },
    miniCardVermelho: {
        flex: 1,
        backgroundColor: '#F54B40',
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