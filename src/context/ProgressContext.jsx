import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState({}) // { lessonId: { completed, progress_seconds } }
  const [courseProgress, setCourseProgress] = useState({}) // { courseId: { completed, total } }

  // Load all progress for user
  const loadProgress = useCallback(async () => {
    if (!user || !supabase) return
    const { data } = await supabase
      .from('lesson_progress')
      .select('lesson_id, completed, progress_seconds')
      .eq('user_id', user.id)

    if (data) {
      const map = {}
      data.forEach(p => {
        map[p.lesson_id] = { completed: p.completed, progress_seconds: p.progress_seconds }
      })
      setProgress(map)
    }
  }, [user])

  // Load course progress summaries
  const loadCourseProgress = useCallback(async () => {
    if (!user || !supabase) return
    // Get all lessons grouped by course
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, course_id')
      .eq('is_published', true)

    const { data: completed } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('completed', true)

    if (lessons) {
      const completedIds = new Set((completed || []).map(c => c.lesson_id))
      const courseMap = {}
      lessons.forEach(l => {
        if (!courseMap[l.course_id]) courseMap[l.course_id] = { completed: 0, total: 0 }
        courseMap[l.course_id].total++
        if (completedIds.has(l.id)) courseMap[l.course_id].completed++
      })
      setCourseProgress(courseMap)
    }
  }, [user])

  useEffect(() => {
    loadProgress()
    loadCourseProgress()
  }, [loadProgress, loadCourseProgress])

  // Update progress for a lesson
  const updateProgress = async (lessonId, progressSeconds) => {
    if (!user || !supabase) return
    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        progress_seconds: progressSeconds,
        completed: false,
      }, { onConflict: 'user_id,lesson_id' })

    if (!error) {
      setProgress(prev => ({
        ...prev,
        [lessonId]: { ...prev[lessonId], progress_seconds: progressSeconds }
      }))
    }
  }

  // Mark lesson as complete
  const markComplete = async (lessonId) => {
    if (!user || !supabase) return
    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
      }, { onConflict: 'user_id,lesson_id' })

    if (!error) {
      setProgress(prev => ({
        ...prev,
        [lessonId]: { ...prev[lessonId], completed: true }
      }))
      loadCourseProgress()
    }
  }

  // Mark lesson as incomplete
  const markIncomplete = async (lessonId) => {
    if (!user || !supabase) return
    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: false,
      }, { onConflict: 'user_id,lesson_id' })

    if (!error) {
      setProgress(prev => ({
        ...prev,
        [lessonId]: { ...prev[lessonId], completed: false }
      }))
      loadCourseProgress()
    }
  }

  const value = {
    progress,
    courseProgress,
    updateProgress,
    markComplete,
    markIncomplete,
    loadProgress,
    loadCourseProgress,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export default ProgressContext
