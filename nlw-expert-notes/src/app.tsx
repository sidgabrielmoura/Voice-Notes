import { useState } from 'react'
import logo from './assets/Logo.svg'
import { NoteCard } from './components/cards'
import { NewCard } from './components/newCard'
export function App() {

  interface Note{
    id: string
    date: Date
    content: string
  }
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    
    return []
  })

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const noteArray = [newNote, ...notes]

    setNotes(noteArray)

    localStorage.setItem('notes', JSON.stringify(noteArray))
  }

  return(
    <>
        <main className='mx-auto max-w-6xl my-12 space-y-6'>
          <img src={logo} />

          <form className='w-full'>
            <input 
              type="text" 
              placeholder='Busque em suas notas...'
              className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-zinc-500 outline-none'
            />
          </form>

          <div className='h-px bg-zinc-700'/>

          <section className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
            
            <NewCard onNoteCreated={onNoteCreated}/>

            {notes.map(note => {
              return <NoteCard key={note.id} note={note}/>
            })}
          </section>
        </main>
    </>
  )
}
