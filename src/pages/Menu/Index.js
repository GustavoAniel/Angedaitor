import React, {useEffect, useState} from 'react';
import { NativeBaseProvider, Box, Divider, Modal, Center, Button } from 'native-base';
import { Pressable, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from '../../styles/Geral';
import styleMenu from '../../styles/Menu';
import Lembrete from '../../components/Lembretes';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import db from '../../database/SQLiteDatabase';
import LembreteDB from '../../database/Lembrete';
import styleModal from '../../styles/Modal';


export default function Menu({navigation: {navigate, reset}}){
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [inicio, setInicio] = useState('');
    const [final, setFinal] = useState('');
    const [descricao, setDescricao] = useState('');


    const [lembretes, setLembretes] = useState([]) //Array

    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        db.transaction(tx => {

            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS lembrete(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(50), horario VARCHAR(45), finalizado INT, inicio DATETIME, final DATETIME, descricao TEXT, data_criacao DATETIME)"
            )
            console.log('UseEffect executado')
        })

        listar()

    },[])

    const listar = () => {
        setLembretes([])
        LembreteDB.all().then(data => {
            setLembretes(data)
            console.log(data)
        })
    }

    const deletar = (id) => {
        console.log(id)
        LembreteDB.remove(id).then(ox => {
            console.log(ox)
        }).catch(err => console.log(err))
        
        reset({index: 0, routes: [{name: 'Inicio'}]})
    }

    const modal = (id, titulo, inicio, final, descricao) => {
        setId(id)
        setTitulo(titulo);
        setInicio(inicio);
        setFinal(final);
        setDescricao(descricao);

        setVisivel(true)

        let testedata = new Date();
        console.log(testedata); 
    }

    return(
        <NativeBaseProvider config={config} >
            <Box style={[style.background]} bg={gradient1} >
                <ScrollView>

                    <Box style={[styleMenu.card]} bg={gradient}>
                        <Text style={[styleMenu.tituloCard]}>O que tem pra hoje</Text>
                       
                            <ScrollView horizontal={true}>
                
                                {lembretes.length != 0 ? lembretes.map(lembrete => (
                                    <Pressable onPress={() => modal(lembrete.id, lembrete.titulo, lembrete.inicio, lembrete.final, lembrete.descricao)}>
                                        <Lembrete key={lembrete.id} titulo={lembrete.titulo} />
                                    </Pressable>

                                )) : <Center><Text style={[styleMenu.textoNd]}>Você não cadastrou nada até agora...</Text></Center>}
                            </ScrollView>
                            

                        <Divider marginY={4} />
                        <Text style={[styleMenu.tituloCard]}>Outros planos</Text>

                        <ScrollView>

                            <Lembrete titulo={'Trocar o SSD do Cássio'} horario={'15:00'} data={'10/05/22'}/>

                        </ScrollView>    
                    </Box>

                    <Box style={{marginBottom: 20}}>

                        <Box style={[styleMenu.btnGroups]}>
                            <Pressable onPress={() => navigate('Cadastro_Plano')}>
                                <Box style={[styleMenu.btnMenu]} bg={gradient}>
                                    <IconFontAwesome name='calendar-check-o' size={50} style={[styleMenu.icone]}/>
                                </Box>
                            </Pressable>

                            <Pressable>
                                <Box style={[styleMenu.btnMenu]} bg={gradient}>
                                    <IconFeather name='list' size={50} style={[styleMenu.icone]}/>
                                </Box>
                            </Pressable>
                        </Box>

                        <Box style={[styleMenu.btnGroups]}>
                            <Pressable>
                                <Box style={[styleMenu.btnMenu]} bg={gradient}>
                                    <IconOcticons name='note' size={50} style={[styleMenu.icone]}/>
                                </Box>
                            </Pressable>

                            <Pressable>
                                <Box style={[styleMenu.btnMenu]} bg={gradient}>
                                    <IconIonicons name='settings-outline' size={50} style={[styleMenu.icone]}/>
                                </Box>
                            </Pressable>
                        </Box>

                    </Box>
                </ScrollView>
                
                <Modal isOpen={visivel} onClose={() => setVisivel(false)}>
                    <Modal.Content>
                        <Modal.Header alignItems='center'>
                            <Text style={[styleModal.titulo]}>{titulo}</Text>
                        </Modal.Header>
                        <Modal.Body>

                            <Box flex={1} bg={'white'}>
                                <Text style={[styleModal.texto]}>Inicio: {inicio}</Text>
                                <Text style={[styleModal.texto]}>Final: {final}</Text>
                                <Text style={[styleModal.texto]}>Descrição: {descricao}</Text>
                            </Box>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={() => deletar({id})} bg='danger.600'>Excluir</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Box>
        </NativeBaseProvider>
    )
}

const config = {
    dependencies: {
        "linear-gradient": LinearGradient
    }
};

const gradient1 = {
    linearGradient: {
        colors: ['#4500D8', '#E11F71'], start: [1, 0], end: [0, 1]
    }
}

const gradient = {
    linearGradient: {
        colors: ['#4500D8', '#6C1B73'], start: [0, 0], end: [1, 0]
    }
}