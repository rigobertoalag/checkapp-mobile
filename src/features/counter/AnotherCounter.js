import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function AnotherCounter(){
    const acount = useSelector(state => state.counter.value)

    return(
        <View>
            <Text style={{ fontSize: 24 }}>Desde AnotherCounter: {acount}</Text>
        </View>
    )
}