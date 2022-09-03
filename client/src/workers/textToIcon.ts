enum textS {
    "add" = "add",
    "subtract" = "subtract",
    "division" = "division",
    "multiply" = "multiply",
}

export default function textToIcon(text: textS){
    switch (text){
        case "add":
            return "+"
        case "subtract":
            return "-"
        case "division":
            return "÷"
        case "multiply":
            return "×"
    }
}
