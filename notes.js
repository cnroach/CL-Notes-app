const fs = require('fs')
const chalk = require('chalk')

//Add Note Function
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find ((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

//Remove Note Function
const removeNote = (title) => {
   const notes = loadNotes()
   const checkTitle = notes.filter((note) => note.title !== title)
   if (notes.length > checkTitle.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(checkTitle)
   } else {
    console.log(chalk.red.inverse('Note was not found!'))
   }

}

//Read Note Function
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find ((note) => note.title === title)
    
    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.inverse.red('No note was found!'))
    }
}

//List Notes Function
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
    
}

//Save Notes Function
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//Load notes Function
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes

}