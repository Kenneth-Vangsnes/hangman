export default function Word() {
    const words = ["weather", "season", "sport", "testing", "javascript", "react", "christmas"]
    const random = Math.ceil(Math.random() * words.length)
   
    return Array.from(words[random].toUpperCase())
    
}

