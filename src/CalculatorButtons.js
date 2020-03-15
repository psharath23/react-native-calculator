import React from 'react'
import {  View, StyleSheet, Dimensions } from 'react-native'
import Button from "./Button"
const operators = ["+", "-", "*", "/", "mod", "%", "(", ")"]

const getGrid = () => {
    return [
        [1,2,3,"*","/"],
        [4,5,6,"-","+"],
        [7,8,9,"%+","%-"],
        [0,".","%","="]
    ]
}

export default class CalculatorButtons extends React.Component {
    onClick=(ev,col)=>{
        ev.preventDefault()
        if(isNaN(col) && col !== "."){
            this.props.onOperatorClick(col)
        }else{
            this.props.onOperandClick(col)
        }
    }

    getStyleName = (col) =>{
        if(isNaN(col) && col !== "."){
            return col === "=" ? styles.OperatorEquals : styles.Operator
        }else{
            return styles.Number
        }
    }

    render() {
        console.log("render")
        let {onOperandClick, onOperatorClick, onDel, onClear, style} = this.props
        return (
            <View style={style}>
                <View style={styles.RemoveButtons}>
                        <Button style={styles.ClearButton} onPress={onClear} title="Clear" />
                        <Button style={styles.DeleteButton} onPress={onDel} title="Backspace" />
                </View>
                <View style={styles.CalculatorButtons}>
                        {
                            getGrid().map((row, i) => {
                                return <View style={styles.Row} key={`key-row-${i}`}>
                                    {
                                        row.map((col,j) => {
                                            return <Button
                                                style={this.getStyleName(col)}
                                                onPress={(ev)=>this.onClick(ev,col)}
                                                key={`key-num-${i}-${j}`}
                                                title={`${col}`}
                                            />
                                        })
                                    }
                                </View>
                            })
                        }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CalculatorButtons: {
        display: "flex",
        flexDirection:"column",
    },
    RemoveButtons: {
        display:"flex",
        flexDirection: "row",
        justifyContent:"space-around",
        height: 100,
    },
    ClearButton: {
        backgroundColor:"red",
        color:"white"
    },
    DeleteButton:{
        backgroundColor:"orangered"
    },
    Number: {
        width: 200,
        height: 100,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"lightblue"
    },
    Operator: {
        width: 300,
        height: 100,
        backgroundColor:"royalblue",
        borderWidth:1,
        borderColor:"black"
    },
    OperatorEquals:{
        width: 600,
        height: 100,
        backgroundColor:"green",
        borderWidth:1,
        borderColor:"black"
    },
    Row:{
        display:"flex",
        flexDirection:"row",
        // width:Dimensions.get("screen").width/3,
        // height:Dimensions.get("screen").width/4
    }
});