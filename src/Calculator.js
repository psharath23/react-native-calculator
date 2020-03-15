import React from "react"
import CalculatorScreen from "./CalculatorScreen"
import CalculatorButtons from "./CalculatorButtons"
import { StyleSheet, Dimensions, View } from "react-native"
import Orientation from 'react-native-orientation'

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            actualText: "",
            result: ""
        }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    _orientationDidChange(orientation) {
        console.log(orientation)
    }

    isOperand = (str) => {
        return !isNaN(str) || (isNaN(str) && str == ".")
    }

    isOperator(str) {
        return (isNaN(str) && str != ".")
    }

    getValueAsArray = () => {
        // let value = this.state.text+""
        //1+2
        // let valueArr = value.split("").reduce((acc, v, i) => {
        //     if (this.isOperand(v)) {
        //         if (acc.length === 0) {
        //             return [...acc, v]
        //         } else {
        //             let lastValue = acc.pop()
        //             if (!isNaN(lastValue) || (isNaN(lastValue) && lastValue === ".")) {
        //                 return [...acc, lastValue + v]
        //             } else {
        //                 return [...acc, lastValue, v]
        //             }
        //         }
        //     } else {
        //         return [...acc, v]
        //     }
        // }, [])
        // return valueArr
        let { actualText } = this.state
        return actualText.split("|")
    }

    getPrecedence = (value) => {
        switch (value) {
            case "+":
            case "-": return 1
            case "/":
            case "mod":
            case "*": return 2
            case "(":
            case ")": return 3

        }
    }

    evaluate = (operators, operands) => {
        let oprs = [...operators]
        let oprnds = [...operands]
        let op = oprs.pop()
        let op2 = oprnds.pop()
        let op1 = oprnds.pop()
        let value = 0
        switch (op) {
            case "+": value = +op2 + +op1; break
            case "-": value = +op2 - +op1; break
            case "*": value = +op2 * +op1; break
            case "/": value = +op1 / +op2; break
            case "mod": value = +op1 % op2; break
            case "%": value = +op2 * +(+op1 / 100).toFixed(2); break
            case "%+": value = +op2 + +(+op2 * (+op1 / 100)).toFixed(2); break;
            case "%-": value = +op2 - +(+op2 * (+op1 / 100)).toFixed(2); break;
        }
        return {
            value, oprs, oprnds
        }
    }

    calculate = () => {
        let valueArr = this.getValueAsArray()
        let operators = []
        let result = valueArr.reduce((acc, v, i) => {
            if (!isNaN(v) || (isNaN(v) && v === ".")) {
                acc = [...acc, v]
                return acc
            } else {
                if (operators.length === 0) {
                    operators = [...operators, v]
                    return acc
                }
                let lastOpr = [...operators].pop()
                if (v === ")") {
                    let fromIndex = operators.lastIndexOf("(")
                    let _operators = operators.splice(fromIndex + 1)
                    operators.splice(fromIndex, 1)
                    _operators = [..._operators].reverse()
                    _operators.forEach((op, i) => {
                        let { value, oprs, oprnds } = this.evaluate([op], acc)
                        acc = [...oprnds, value]
                    })

                    // let { value, oprs, oprnds } = this.evaluate(_operators, acc)
                    // operators = oprs
                    // acc = [...oprnds, value]
                    return acc
                }
                if (v === "(" || lastOpr === "(") {
                    operators = [...operators, v]
                    return acc
                }
                if (this.getPrecedence(lastOpr) >= this.getPrecedence(v)) {
                    let { value, oprs, oprnds } = this.evaluate(operators, acc)
                    operators = oprs
                    operators = [...operators, v]
                    acc = [...oprnds, value]
                    return acc
                } else {
                    operators = [...operators, v]
                    return acc
                }
            }
        }, [])
        operators = [...operators].reverse()
        operators.forEach((op, i) => {
            console.log(op)
            let { value, oprs, oprnds } = this.evaluate([op], result)
            console.log(result)
            result = [...oprnds, value]
            console.log(result)
            console.log(".....")
        })
        return result.join("")
    }

    getLastChar = (str) => {
        return str.length > 0 ? str[str.length - 1] : ""
    }

    isLastCharOperator = () => {
        console.log("jkl")
        let lastChar = this.getLastChar(this.state.text)
        return lastChar.length > 0 && lastChar != "." && isNaN(lastChar)
    }

    getDisplayInputText = (str) => {
        return `${str}`.split("|").join("")
    }

    onOperandClick = (operand) => {
        let { actualText, text } = this.state
        let splitArr = actualText.split("|")
        let lastStr = splitArr[splitArr.length - 1]
        if (operand === "." && (text.length === 0 || lastStr.includes("."))) {
            return
        }
        if (text.length === 0) {
            actualText += operand
        } else if (this.isOperand(text[text.length - 1])) {
            actualText = actualText + operand
        } else {
            actualText = actualText.length > 0 ? actualText + "|" + operand : actualText + operand
        }
        text = this.getDisplayInputText(actualText)
        this.setState({ text, actualText })
    }

    cleanUpResult = (result) => {
        console.log("IN cleanup:", result)
        if (isNaN(result)) {
            console.log("1")
            return ""
        } else if (Number.isInteger(+result)) {
            console.log("2")
            return result
        } else {
            console.log("3")
            return Number(result).toFixed(2)
        }
    }

    onOperatorClick = (operator) => {
        let { actualText, text, result } = this.state
        if (text.length === 0) {
            if (operator === "(" || operator === ")") {
                actualText = actualText + operator
            }
        } else {
            if (operator === "=") {
                result = this.calculate()
                result = this.cleanUpResult(result)
            } else if (this.isOperator(text[text.length - 1])) {
                if (this.getLastChar(text) === ")") {
                    actualText = actualText.length > 0 ? actualText + "|" + operator : actualText + operator
                }
            } else {
                actualText = actualText.length > 0 ? actualText + "|" + operator : actualText + operator
            }
        }
        text = this.getDisplayInputText(actualText)
        this.setState({ text, actualText, result })
    }

    onDel = () => {
        let { actualText, text } = this.state
        actualText = actualText.slice(0, actualText.length - 2)
        text = this.getDisplayInputText(actualText)
        this.setState({ text, actualText })
    }

    onClear = () => {
        this.setState({ text: "", result: "", actualText: "" })
    }

    render() {
        console.log(this.state)
        let { actualText, result } = this.state
        let text = this.getDisplayInputText(actualText)
        return (<View style={styles.Calculator}>
            <CalculatorScreen
                text={text}
                style={styles.Screen}
                result={result}
            />
            <CalculatorButtons
                style={styles.Buttons}
                onClear={this.onClear}
                onDel={this.onDel}
                onOperandClick={this.onOperandClick}
                onOperatorClick={this.onOperatorClick.bind(this)}
            />
        </View>)
    }
}

const CalDim = {
    Screen: {}
}

const styles = StyleSheet.create({
    Calculator: {
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap"
    },
    Screen: {
        borderStyle: "solid",
        borderWidth: 2,
        height: Dimensions.get("screen").height - 545,
        width: Dimensions.get("screen").width - 10,
        backgroundColor: "black",

    },
    Buttons: {
        borderStyle: "solid",
        borderWidth: 2,
        display: "flex",
        flexDirection: "column",
        //   marginTop:10
    }
});