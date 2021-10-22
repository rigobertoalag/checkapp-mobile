import React from 'react'
import { Button, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../../utils/slices'

export default function GetDataScreen() {
    const token = useSelector(state => state.token.value)
    const dispatch = useDispatch()

    return (
        <View style={{ marginTop: 60 }}>
            <Button
                onPress={() => dispatch(setToken('token perron'))}
                title="Boton"
            />

            <Text>Datos: {token}</Text>
        </View>
    )
}