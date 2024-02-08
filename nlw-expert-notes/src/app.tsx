import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo.svg'
import { NoteCard } from './components/cards'
import { NewCard } from './components/newCard'
export function App() {

  const [ search, setSearch] = useState('')

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

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }
  
  const filteredNotes = search !== '' 
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes

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

  function onNoteDelet(id: string){
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)

    localStorage.setItem('nota', JSON.stringify(notesArray))
  }

  return(
    <>
        <main className='mx-auto max-w-6xl my-12 space-y-6 px-6 
        lg:px-0
        md:px-4'>
          <img src={logo} />

          <form className='w-full'>
            <input 
              type="text" 
              placeholder='Busque em suas notas...'
              className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-zinc-500 outline-none'
              onChange={handleSearch}
            />
          </form>

          <div className='h-px bg-zinc-700'/>

          <section className='grid gap-6 auto-rows-[250px] grid-cols-1
          lg:grid-cols-3
          md:grid-cols-2'>
            
            <NewCard onNoteCreated={onNoteCreated}/>

            {filteredNotes.map(note => {
              return <NoteCard key={note.id} note={note} onNoteDelet={onNoteDelet}/>
            })}
          </section>
        </main>
    </>
  )
}
