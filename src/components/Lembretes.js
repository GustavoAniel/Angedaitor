import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import styleLemb from '../styles/Lembrete'
import IconIO from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'

export default function Lembrete({id,titulo, horario, data, finalizado}){
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

    const formatoData = (data) => {
        let dataN = data.split(" ")[0]
        dataN = dataN.split('-')[2]+'/'+dataN.split('-')[1]+'/'+dataN.split('-')[0]

        return dataN
    }

    const formatoHora = (hora) => {
        let horaN = hora.split(" ")[1]
        return horaN
    }

    if(finalizado != 1){
    
        if(formatoData(data) == dataAgora()){
        return(
            <NativeBaseProvider>
                <Box style={[styleLemb.card]}>
                    <Text style={[styleLemb.titulo]}>{titulo}</Text>
                    <Box style={[styleLemb.miniCardAzul]}>

                        <Box flexDirection={'row'}>
                            <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                            <Text style={styleLemb.horarioTexto}>{formatoHora(horario)}</Text>
                        </Box>
                        
                        <Box flexDirection={'row'}>
                                <IconFeather name='calendar' size={25} style={[styleLemb.icon]}/>
                                <Text style={styleLemb.horarioTexto}>Hoje</Text>
                        </Box>
                    </Box>
                </Box>
            </NativeBaseProvider>
        )
        }else if(formatoData(data) > dataAgora()){
            return(
                <NativeBaseProvider>
                    <Box style={[styleLemb.card]}>
                        <Text style={[styleLemb.titulo]}>{titulo}</Text>
                        <Box style={[styleLemb.miniCardCinza]}>
                            <Box flexDirection={'row'}>
                                <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                                <Text style={styleLemb.horarioTexto}>{formatoHora(horario)}</Text>
                            </Box>
                            <Box flexDirection={'row'}>
                                <IconFeather name='calendar' size={25} style={[styleLemb.icon]}/>
                                <Text style={styleLemb.horarioTexto}>{formatoData(data)}</Text>
                            </Box>
                        </Box>
                    </Box>
                </NativeBaseProvider>
            )
        }else{
            return(
                <NativeBaseProvider>
                    <Box style={[styleLemb.card]}>
                        <Text style={[styleLemb.titulo]}>{titulo}</Text>
                        <Box style={[styleLemb.miniCardVermelho]}>
                            <Box flexDirection={'row'}>
                                <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                                <Text style={styleLemb.horarioTexto}>{formatoHora(horario)}</Text>
                            </Box>
                            <Box flexDirection={'row'}>
                                <IconFeather name='calendar' size={25} style={[styleLemb.icon]}/>
                                <Text style={styleLemb.horarioTexto}>{formatoData(data)}</Text>
                            </Box>
                        </Box>
                    </Box>
                </NativeBaseProvider>
            )
        }
    }else{
        return(
            <NativeBaseProvider>
                <Box style={[styleLemb.card]}>
                    <Text style={[styleLemb.titulo]}>{titulo}</Text>
                    <Box style={[styleLemb.miniCardVerde]}>
                        <Box flexDirection={'row'}>
                            <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                            <Text style={styleLemb.horarioTexto}>{formatoHora(horario)}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <IconFeather name='calendar' size={25} style={[styleLemb.icon]}/>
                            <Text style={styleLemb.horarioTexto}>{formatoData(data)}</Text>
                        </Box>
                    </Box>
                </Box>
            </NativeBaseProvider>
        )
    }
}