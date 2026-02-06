import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function NotesEditor({ lessonId }) {
  const { user } = useAuth()
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const saveTimeout = useRef(null)

  // Load existing note
  useEffect(() => {
    if (!user || !supabase || !lessonId) return
    setLoading(true)
    supabase
      .from('lesson_notes')
      .select('note_text')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single()
      .then(({ data }) => {
        if (data) setNote(data.note_text || '')
        setLoading(false)
      })
  }, [user, lessonId])

  // Auto-save on change (debounced)
  const handleChange = (text) => {
    setNote(text)
    setSaved(false)

    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      if (!user || !supabase) return
      await supabase
        .from('lesson_notes')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          note_text: text,
        }, { onConflict: 'user_id,lesson_id' })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  if (loading) return null

  return (
    <div className="notes-section">
      <div className="notes-header">
        <h3 className="notes-title">Personal Notes</h3>
        {saved && <span className="notes-saved">Saved</span>}
      </div>
      <textarea
        className="notes-textarea"
        value={note}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your notes for this lesson..."
      />
    </div>
  )
}
