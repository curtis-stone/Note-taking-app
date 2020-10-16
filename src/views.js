import moment from 'moment'
import { getFilters} from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a') // anchor tag makes every part of the note clickable
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //SetUp the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // SetUp Status Message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    noteEl.appendChild(statusEl)
    statusEl.classList.add('list-item__subtitle')

    return noteEl
}

// Render application notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p') // this p is created by js
        emptyMessage.textContent = 'No Notes Created' 
        emptyMessage.classList.add('empty-message') // styling requires classList.add to the const being created
        notesEl.appendChild(emptyMessage)
    }
    
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage}