import React from 'react';
import { View,Text,StyleSheet, Dimensions } from 'react-native';

export default class CalculatorScreen extends React.Component{
 
    getInputTextElement = (t,i) =>{
        if(isNaN(t) && t !== "."){
            return (
                <Text key={`operator-${t}-${i}`} style={styles.InputTextOperator}>{t}</Text>
            )    
        }
        return (
            <Text key={`operand-${t}-${i}`} style={styles.InputTextOperand}>{t}</Text>
        )
    }

    render(){
        let {text, result, style} = this.props
        return <View style={{...style,...styles.Screen}}>
            <View style={styles.Input}>
                {text.split("").map(this.getInputTextElement)}    
            </View>
            <View style={styles.Result}>
                <Text style={styles.ResultText}>{result}</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    Screen:{
        display:"flex",
        flexDirection:"column"
    },
    Input:{
        height:Dimensions.get("window").height * 0.20,
        width:Dimensions.get("window").width,
        display:"flex",
        flexDirection:"row"
    },
    Result:{
        height:Dimensions.get("window").height * 0.80,
        width:Dimensions.get("window").width,
    },
    ResultText:{
        textAlign:"right",
        fontWeight:"bold",
        fontFamily:"calibri",
        fontSize:Dimensions.get("window").width * 0.2,
        color:"green",
        padding:15
    },
    InputTextOperand:{
        fontStyle:"italic",
        fontWeight:"bold",
        fontFamily:"calibri",
        fontSize:Dimensions.get("window").width * 0.05,
        color:"orange",
    },
    InputTextOperator:{
        fontStyle:"italic",
        fontWeight:"bold",
        fontFamily:"calibri",
        fontSize:Dimensions.get("window").width * 0.05,
        color:"yellow",
    },
})