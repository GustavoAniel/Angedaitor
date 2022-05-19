import React, {useEffect, useState} from 'react';
import { NativeBaseProvider, Box, FormControl, Stack, Input, Select, TextArea, Radio, Button, ScrollView, Modal } from 'native-base';
import { Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from '../../styles/Geral';
import { styleCadastro } from '../../styles/Planos';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Lembrete from '../../database/Lembrete'
import LembreteModel from '../../model/Lembrete'

export default function Cadastro({navigation: { navigate, reset }}){
    const [titulo, setTitulo] = useState('');           
    const [horario, setHorario] = useState('00:00');
    const [finalizado, setFinalizado] = useState(0);
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState();
    const [inicio , setInicio] = useState();
    const [final, setFinal] = useState();
    const [agora, setAgora] = useState();
    const [horarioAtual, setHorarioAtual] = useState('');

    //States só do DateTimePicker 
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');

    const [desahabi, setDesahabi] = useState(true) //Habilitar ou não os campos de horário e do dia

    const cadastrar = (titulo, horario, finalizado, inicio, final, descricao, data_criacao) => {

        if(horario == ''){
            console.log('Preencha o campo!!')
        }else{
            const novoLembrete = new LembreteModel(titulo, horario, finalizado, inicio, final, descricao, data_criacao)
            Lembrete.create(novoLembrete).then(() => {console.log('Executando...')})
            reset({index: 0, routes: [{name: 'Inicio'}]})
        }  
    }

    useEffect(()=>{
        let dataAgora = new Date();

        let dia = dataAgora.getDate();
        let mes = dataAgora.getMonth()+1;

        let horas = dataAgora.getHours();
        let minutos = dataAgora.getMinutes();

        if(dia < 10){
            dia = '0'+dia;
        }

        if(mes < 10){
            mes = '0'+mes;
        }

        if(horas < 10){
            horas = '0'+horas
        }

        if(minutos < 10){
            minutos = '0'+minutos
        }

        setHorario(horas+':'+minutos); //Colocando o horário atual na visão do usuario
        setData(dia+'/'+mes+'/'+dataAgora.getFullYear()); //Colocando a data atual na visão do usuario
        setInicio(dataAgora.getFullYear()+'-'+mes+'-'+dia+' '+horas+':'+minutos) //Colocando data e hora atual na visão do sistema
        setFinal(dataAgora.getFullYear()+'-'+mes+'-'+dia+' '+horas+':'+minutos)
        setAgora(dataAgora.getFullYear()+'-'+mes+'-'+dia+' '+horas+':'+minutos)
    },[])

    const campoHorario = (item) => {
        if(item == 'Agora mesmo'){
            setDesahabi(true)
        }else{
            setDesahabi(false)
        }
        setHorarioAtual(item)
    }


    const onChange = (evento, dataSelecionada) => {
        setShow(false)
        const dataAtual = dataSelecionada || date;
        setDate(dataAtual);

        let tempoPicker = new Date(dataAtual);
        let horas = tempoPicker.getHours()
        let minutos = tempoPicker.getMinutes()

        let dia = tempoPicker.getDate();
        let mes = tempoPicker.getMonth()+1;

        if(dia < 10){
            dia = '0'+dia;
        }

        if(mes < 10){
            mes = '0'+mes;
        }

        if(horas < 10){
            horas = '0'+horas
        }

        if(minutos < 10){
            minutos = '0'+minutos
        }

        if(mode == 'time'){
            setHorario(horas+':'+minutos);
        }else{
            setData(dia+'/'+mes+'/'+tempoPicker.getFullYear());
        }

        setInicio(tempoPicker.getFullYear()+'-'+mes+'-'+dia+' '+horas+':'+minutos)
        setFinal(tempoPicker.getFullYear()+'-'+mes+'-'+dia+' '+horas+':'+minutos)
    }

    const showMode = (modoAtual) => {
        setMode(modoAtual);
        setShow(true);
    }

    return(
        <NativeBaseProvider config={config}>
            <Box bg={gradient1} style={[style.background]}>
                <Text style={[styleCadastro.titulo]}>Cadastrar Plano</Text>
                <ScrollView>

                        <FormControl >
                            <Stack mx="4" safeArea space={10}>

                                <Box>
                                    <FormControl.Label _android={{_text:{color: 'white', fontSize: 20}}}>Título</FormControl.Label>
                                    <Input color='white' onChangeText={(titulo) => setTitulo(titulo)} />
                                    <FormControl.HelperText _android={{_text:{color: '#DCDCDC'}}}>
                                        Insira o nome desse plano.
                                    </FormControl.HelperText>
                                    <FormControl.ErrorMessage >
                                        Atleast 6 characters are required.
                                    </FormControl.ErrorMessage>
                                </Box>
                                
                                <Box>
                                    <FormControl.Label _android={{_text:{color: 'white', fontSize: 20}}}>Horário</FormControl.Label>

                                    <Select placeholder='Selecione aqui' onValueChange={item => {campoHorario(item)}} color={'white'} _light>
                                        <Select.Item label='Agora mesmo' value='Agora mesmo' />
                                        <Select.Item label='Início e Fim' value='Início e Fim'/>
                                        <Select.Item label='Só Início' value='Só Início'/>
                                        <Select.Item label='O dia todo' value='O dia todo'/>
                                    </Select>

                                </Box>

                                <Box>
                                    <FormControl.Label _android={{_text:{color: 'white', fontSize: 20}}}>Que Horas?</FormControl.Label>
                                    <Button isDisabled={desahabi} style={{height: 50, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 0.8}} color='white' onPress={() => showMode('time')}>{horario}</Button>
                                    
                                    <FormControl.HelperText _android={{_text:{color: '#DCDCDC'}}}>
                                    Escolha que horas você quer se lembrar.
                                    </FormControl.HelperText>
                                    <FormControl.ErrorMessage >
                                        Atleast 6 characters are required.
                                    </FormControl.ErrorMessage>
                                </Box>

                                <Box>
                                    <FormControl.Label _android={{_text:{color: 'white', fontSize: 20}}}>Que Dia?</FormControl.Label>
                                    <Button isDisabled={desahabi} style={{height: 50, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 0.8}} color='white' onPress={() => showMode('date')}>{data}</Button>
                                    
                                    <FormControl.HelperText _android={{_text:{color: '#DCDCDC'}}}>
                                    Escolha que dia você quer se lembrar.
                                    </FormControl.HelperText>
                                    <FormControl.ErrorMessage >
                                        Atleast 6 characters are required.
                                    </FormControl.ErrorMessage>
                                </Box>

                                <Box>
                                    <FormControl.Label _android={{_text:{color: 'white', fontSize: 20}}}>Descrição</FormControl.Label>
                                    <TextArea onChangeText={(descricao) => setDescricao(descricao)} color='white' />
                                    <FormControl.HelperText _android={{_text:{color: '#DCDCDC'}}}>
                                        Descreva mais sobre o lembrete.
                                    </FormControl.HelperText>
                                    <FormControl.ErrorMessage >
                                        Atleast 6 characters are required.
                                    </FormControl.ErrorMessage>
                                </Box>
                                
                                <Box flexDirection={'row'} justifyContent={'space-between'}>
                                    <Button borderColor={'white'} borderWidth={1} backgroundColor={'#4500D8'} size={'lg'} onPress={() => {cadastrar(titulo, horarioAtual, finalizado, inicio, final, descricao, agora)}}>Salvar</Button>


                                    <Button borderColor={'white'} borderWidth={1} backgroundColor={'transparent'} size={'lg'} onPress={()=> reset({index: 0, routes: [{name: 'Inicio'}]})}>Cancelar</Button>
                                </Box>
                            </Stack>
                        </FormControl>
                </ScrollView>
                {show && (
                   <RNDateTimePicker testID='dateTimePicker' mode={mode} value={date} is24Hour={true} display='default' onChange={onChange}/>
                )}
                
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