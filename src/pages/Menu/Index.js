import React, {useEffect, useState} from 'react';
import { NativeBaseProvider, Box, Divider, Modal, Button } from 'native-base';
import { Pressable, Text, ScrollView, FlatList  } from 'react-native';
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
    const [finalizado, setFinalizado] = useState(0);


    const [lembretes, setLembretes] = useState([]) //Array
    const [hoje, setHoje] = useState([])

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

   

    const formatoData = (data) => { //DD-MM-AAAA
        let dataN = data.split(" ")[0]
        dataN = dataN.split('-')[2]+'/'+dataN.split('-')[1]+'/'+dataN.split('-')[0]
        return dataN
    }

    const dataAgora = () => {
        let date = new Date();

        let dia = date.getDate();
        let mes = date.getMonth()+1;

        if(dia < 10){
            dia = '0'+dia;
        }

        if(mes < 10){
            mes = '0'+mes;
        }

        let result = dia+'/'+mes+'/'+date.getFullYear()

        return result
    }

    const listar = () => {

        LembreteDB.all().then(data => {
            setLembretes(data)
        })
    }


    const deletar = (id) => {
        LembreteDB.remove(id).then(ox => {
        }).catch(err => console.log(err))
        
        reset({index: 0, routes: [{name: 'Inicio'}]})
    }

    const finalizar = (id) => {
        LembreteDB.finalizar(id).then(ox => {

        }).catch(err => console.log(err))
        reset({index: 0, routes: [{name: 'Inicio'}]})
    }

    const modal = (id, titulo, inicio, final, descricao, finalizado) => {
        setId(id)
        setTitulo(titulo);
        setInicio(inicio);
        setFinal(final);
        setDescricao(descricao);
        setFinalizado(finalizado)

        setVisivel(true);
    }

    return(
        <NativeBaseProvider config={config} >
            <Box style={[style.background]} bg={gradient1} >
                

                    <Box style={[styleMenu.card]} bg={gradient}>
                        <Text style={[styleMenu.tituloCard]}>Planos</Text>

                        <Divider marginY={4} />
                        
                        <FlatList nestedScrollEnabled={true} data={lembretes} numColumns={2} keyExtractor={(item) => item.id} renderItem={({item}) => {
                            return <Pressable onPress={() => modal(item.id, item.titulo, item.inicio, item.final, item.descricao, item.finalizado)}>
                                    <Lembrete key={item.id} titulo={item.titulo} horario={item.inicio} data={item.inicio} finalizado={item.finalizado}/>
                                </Pressable>
                        }} />
            
                        {/* {lembretes.map(lembrete => (
                            <Pressable onPress={() => modal(lembrete.id, lembrete.titulo, lembrete.inicio, lembrete.final, lembrete.descricao)}>
                                <Lembrete key={lembrete.id} titulo={lembrete.titulo} horario={lembrete.inicio}/>
                            </Pressable>))
                        }     */}
  
                    </Box>

                    <ScrollView>

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
                                <Text style={[styleModal.texto]}>Data: {formatoData(inicio)}</Text>
                                <Text style={[styleModal.texto]}>Descrição: {descricao}</Text>
                                <Text style={[styleModal.texto]}>Finalizado: {finalizado == 1 ? 'Sim':'Não'}</Text>
                            </Box>
                        
                        </Modal.Body>
                        <Modal.Footer justifyContent='space-between'>
                            <Button onPress={() => finalizar({id})} bg='success.500'>Finalizar</Button>
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