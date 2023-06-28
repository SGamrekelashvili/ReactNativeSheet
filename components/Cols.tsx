import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    name: string,
    age: string
}

const Cols = ({ name = "fallback", age = "2" }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer} >
                <Text style={styles.text} >{name}</Text>
            </View>
            <View style={styles.innerContainer} >
                <Text style={styles.text}>{age}</Text>
            </View>
        </View>
    )
}

export default Cols

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    innerContainer: {
        width: "50%",
        paddingVertical: 10
    },
    text: {
        color: "black"
    }
})