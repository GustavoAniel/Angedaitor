import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import styleLemb from '../styles/Lembrete'
import IconIO from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'

export default function Lembrete({titulo, horario, data}){
    if(data == null){
    return(
        <NativeBaseProvider>
            <Box style={[styleLemb.card]}>
                <Text style={[styleLemb.titulo]}>{titulo}</Text>
                <Box style={[styleLemb.miniCard]}>
                    <Box flexDirection={'row'}>
                        <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                        <Text style={styleLemb.horarioTexto}>{horario}</Text>
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
                    <Box style={[styleLemb.miniCard]}>
                        <Box flexDirection={'row'}>
                            <IconIO name='time-outline' size={25} style={[styleLemb.icon]}/>
                            <Text style={styleLemb.horarioTexto}>{horario}</Text>
                        </Box>
                        <Box flexDirection={'row'}>
                            <IconFeather name='calendar' size={25} style={[styleLemb.icon]}/>
                            <Text style={styleLemb.horarioTexto}>{data}</Text>
                        </Box>
                    </Box>
                </Box>
            </NativeBaseProvider>
        )
    }
}