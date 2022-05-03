import React, {useState} from 'react';
import { NativeBaseProvider, Box, Divider } from 'native-base';
import { Pressable, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import style from '../../styles/Geral';
import styleMenu from '../../styles/Menu';
import Lembrete from '../../components/Lembretes';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconIonicons from 'react-native-vector-icons/Ionicons'


export default function Menu({navigation: {navigate}}){
    return(
        <NativeBaseProvider config={config}>
            <Box style={[style.background]} bg={gradient1}>
                <ScrollView>

                
                
                    <Box style={[styleMenu.card]} bg={gradient}>
                        <Text style={[styleMenu.tituloCard]}>O que tem pra hoje</Text>
                       
                            <ScrollView horizontal={true}>
                            

                            
                                <Lembrete titulo={'Ler a Bíblia'} horario={'Dia todo'}/>

                                <Lembrete titulo={'Ir no RH'} horario={'15:00'}/>
                                <Lembrete titulo={'Programar'} horario={'15:30-16:00'}/>
                       
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