import React from"react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default Button = (props) => {
    const {onPress, title, style} = props
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.Button,...style}}>
            <Text style={styles.Name}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Button:{
        // width:200,
        height:100,
        backgroundColor:"grey",
        borderColor:"black",
        borderWidth:2,
        display:"flex",
        flexDirection:"column",
        flex:1,
        padding:20
    },
    Name:{
        textAlign:"center",
        display:"flex",
        fontWeight:"bold",
    }
    
})