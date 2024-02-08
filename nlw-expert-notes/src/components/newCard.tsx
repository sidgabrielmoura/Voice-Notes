import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewCardProps {
    onNoteCreated: (content: string) => void
}

export function NewCard({ onNoteCreated }: NewCardProps){
    const [shouldShowOnboading, setShouldShowOnboading] = useState(true)
    const [content, setContent] = useState('')

    function handleStartEditor(){
        setShouldShowOnboading(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)

        if (event.target.value === ''){
            setShouldShowOnboading(true)
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        onNoteCreated(content)

        setContent('')

        setShouldShowOnboading(true)

        toast.success('Nota criada com sucesso')
    }
    return(
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md bg-zinc-700 p-5 gap-2 hover:bg-zinc-600 group transition-colors duration-100 cursor-pointer text-left 
            flex flex-col'>
                <span className='text-zinc-200 group-hover:text-zinc-50'>
                    Adicionar nota
                </span>
                <p className='text-zinc-400 group-hover:text-zinc-300'>
                    Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                    <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
                    <Dialog.Content className='z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-zinc-700 rounded-md flex flex-col
                    outline-none h-[60vh] overflow-hidden'>
                        <Dialog.Close className='absolute right-0 p-[8px] bg-zinc-800 hover:bg-red-700 hover:text-zinc-100 text-zinc-500 transition-colors duration-100'>
                            <X className='p-[2px]'/>
                        </Dialog.Close>

                        <form onSubmit={handleSaveNote} className='flex flex-col flex-1'>
                            <div className='flex flex-1 flex-col gap-3 p-5'>
                                <span className='text-zinc-400 text-[14.5px]'>
                                    Adicionar nota
                                </span>
                                
                                {shouldShowOnboading ? 
                                    <p className='text-zinc-300 text-left'>
                                        Comece {''}
                                        <button className='text-lime-500 hover:underline hover:underline-offset-2'>gravando uma nota</button> {''}
                                        em áudio ou se preferir {''}
                                        <button className='text-lime-500 hover:underline hover:underline-offset-2' onClick={handleStartEditor}>utilize apenas texto</button>.
                                    </p> 
                                    : 
                                    <textarea 
                                        autoFocus
                                        className='text-sm leading-6 text-zinc-200 bg-transparent resize-none outline-none flex-1'
                                        onChange={handleContentChanged}
                                        value={content}
                                    />
                                }
                            </div>

                            <button type='submit' className='w-full bg-emerald-700 py-4 text-center text-sm text-zinc-50 outline-none font-medium group'>
                                deseja salvar essa nota?
                            </button>
                        </form>
                        
                    </Dialog.Content>
                </Dialog.Portal>
        </Dialog.Root>
    )
}
         