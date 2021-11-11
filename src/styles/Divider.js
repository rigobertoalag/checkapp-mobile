import React from 'react'
import { View, Text } from 'react-native'

export default function Divider({text}) {
    return (
        <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: "10%" }}
        >
            <View style={{ height: 1, width: "30%", backgroundColor: "#979797" }} />
            <View style={{ marginTop: -10 }}>
                <Text style={{ textAlign: "center", width: 75, color: "#979797" }}>
                    {text}
                </Text>
            </View>
            <View style={{ height: 1, width: "30%", backgroundColor: "#979797" }} />
        </View>
    );
}