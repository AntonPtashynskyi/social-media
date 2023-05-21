import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { ProfileImage } from './ProfileImage'
import { useSession } from 'next-auth/react'

const NewTweetForm = () => {
  const session = useSession();
  const [inputVal, setInputVal] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, [])

  useEffect(() => {
    updateTextAreaSize(textAreaRef?.current);
  }, [inputVal])

  if(session.status !== "authenticated") return;

  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2'>
        <div className='flex gap-4'>
            <ProfileImage src={session.data.user.image}/>
            <textarea
             ref={inputRef}
             style={{ height: 0}}
             value={inputVal}
             onChange={(e) => setInputVal(e.target.value)}
             className='flex-grow resize-none overflow-hidden p-4 text-lg outline-none'
             placeholder='Type some text'/>
        </div>
        <Button className='self-end'>Post</Button>
    </form>
  )
}

export default NewTweetForm

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if(!textArea) return;
    textArea.style.height = '0';
    textArea.style.height = `${textArea.scrollHeight}px`

}