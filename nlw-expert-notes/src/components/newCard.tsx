import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

let speechRecognition: SpeechRecognition | null = null

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

        if(content === ''){
            return toast.warning("Nota sem conteudo!")
        }

        onNoteCreated(content)

        setContent('')

        setShouldShowOnboading(true)

        toast.success('Nota criada com sucesso')
    }

    const [isRecording, setIsRecording] = useState(false)

    function handleStarRecording(){
        const isSpeechRecordingApiAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window

        if(!isSpeechRecordingApiAvailable){
            alert("infelizmente seu navegador não suporta gravação T_T")
            return
        }

        setIsRecording(true)
        setShouldShowOnboading(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        speechRecognition = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) =>{
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) =>{
            console.error(event)
        }

        speechRecognition.start()
    }

    function handleStopRecording(){
        setIsRecording(false)

        if(speechRecognition != null) {
            speechRecognition.stop()
        }
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
                    <Dialog.Content className='z-10 fixed w-full bg-zinc-700 flex flex-col inset-0 rounded-none
                    outline-none overflow-hidden
                    md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] md:inset-auto md:rounded-md'>

                        <Dialog.Close className='absolute right-0 p-[8px] bg-zinc-800 hover:bg-red-700 hover:text-zinc-100 text-zinc-500 transition-colors duration-100'>
                            <X className='p-[2px]'/>
                        </Dialog.Close>

                        <form className='flex flex-col flex-1'>
                            <div className='flex flex-1 flex-col gap-3 p-5'>
                                <span className='text-zinc-400 text-[14.5px]'>
                                    Adicionar nota
                                </span>
                                
                                {shouldShowOnboading ? 
                                    <p className='text-zinc-300 text-left'>
                                        Comece {''}
                                        <button onClick={handleStarRecording} type='button' className='text-lime-500 hover:underline hover:underline-offset-2'>gravando uma nota</button> {''}
                                        em áudio ou se preferir {''}
                                        <button type='button' className='text-lime-500 hover:underline hover:underline-offset-2' onClick={handleStartEditor}>utilize apenas texto</button>.
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

                            {isRecording ? (
                                    <button type='button' onClick={handleStopRecording} className='flex items-center justify-center gap-1.5 w-full bg-zinc-900 py-4 text-center text-sm text-zinc-300 outline-none font-medium group'>
                                    <div className='size-3 rounded-full bg-red-600 animate-pulse'/>
                                    Gravando! (clique p/ interromper)
                                </button>
                            ) : (
                                <button type='button' onClick={handleSaveNote} className='w-full bg-emerald-700 py-4 text-center text-sm text-zinc-50 outline-none font-medium group'>
                                    deseja salvar essa nota?
                                </button>
                            )}
                        </form>
                        
                    </Dialog.Content>
                </Dialog.Portal>
        </Dialog.Root>
    )
}
         