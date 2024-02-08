import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'


interface NoteCardsProps {
    note: {
        id: string,
        date: Date,
        content: string,
    }

    onNoteDelet: (id: string) => void
}

export function NoteCard({ note, onNoteDelet }: NoteCardsProps){
    return(
        <>
            <Dialog.Root>
                <Dialog.Trigger className='rounded-md text- flex flex-col bg-zinc-800 p-5 gap-2 relative overflow-hidden hover:ring-[0.8px] transition-all duration-100
                outline-none focus-visible:ring-1 focus-visible:ring-lime-700'>
                    <span className='text-zinc-400 text-[13px]'>
                        {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                    </span>
                    
                    <p className='text-zinc-300 text-left'>
                        {note.content}
                    </p>

                    <div className='absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none'/>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
                    <Dialog.Content className='z-10 fixed w-full bg-zinc-700 rounded-none flex flex-col inset-0 
                    outline-none overflow-hidden
                    md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] md:inset-auto md:rounded-md'>
                        <Dialog.Close className='absolute right-0 p-[8px] bg-zinc-800 hover:bg-red-700 hover:text-zinc-100 text-zinc-500 transition-colors duration-100'>
                            <X className='p-[2px]'/>
                        </Dialog.Close>

                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-zinc-400 text-[14.5px]'>
                                {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                            </span>
                            
                            <p className='text-zinc-300 text-left'>
                                {note.content}
                            </p>
                        </div>

                        <button onClick={() => onNoteDelet(note.id)} type='button' className='w-full bg-zinc-800 py-4 text-center text-sm text-zinc-300 outline-none font-medium group'>
                            deseja <span className='text-red-400 group-hover:underline group-hover:underline-offset-2'>apagar essa nota</span>?
                        </button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}