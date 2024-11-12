import React from 'react'
import {View,Text} from 'react-native';

export default function Card({data}) {
    return(
        <View>
            <Text>Hello</Text>
            <Text>{data.name}</Text>
            <Text>{data.number}</Text>
        </View>
    )
}