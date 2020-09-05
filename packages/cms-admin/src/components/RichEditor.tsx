import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

interface RichEditorProps {

}

const RichEditor: React.FC<RichEditorProps> = (props) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    console.log(editorState)
  }, [editorState])
  return <Editor editorState={editorState} onChange={setEditorState} />
}

export default RichEditor
