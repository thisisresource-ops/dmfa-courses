import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import VideoPlayer from '../components/VideoPlayer'
import NotesEditor from '../components/NotesEditor'

export default function Lesson() {
  const { slug, lessonSlug } = useParams()
  const { hasActiveSubscription } = useAuth()
  const { progress, markComplete, markIncomplete } = useProgress()
  const [course, setCourse] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!courseData) {
        setLoading(false)
        return
      }

      setCourse(courseData)

      // Fetch all lessons for nav
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseData.id)
        .eq('is_published', true)
        .order('sort_order')

      if (lessonsData) {
        setLessons(lessonsData)
        const current = lessonsData.find(l => l.slug === lessonSlug)
        setLesson(current || null)
      }

      setLoading(false)
    }

    fetchData()
  }, [slug, lessonSlug])

  // Subscription gate (allow free previews through)
  if (!hasActiveSubscription() && lesson && !lesson.is_free_preview) {
    return (
      <div className="gate-page">
        <div className="gate-card">
          <div className="gate-icon">&#128274;</div>
          <h2 className="gate-title">Subscription Required</h2>
          <p className="gate-desc">Subscribe to watch this lesson and access all content.</p>
          <Link to="/pricing" className="btn btn-full" style={{ textDecoration: 'none' }}>View Plans</Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="lesson-page">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>Lesson not found</h2>
        <Link to="/dashboard" className="btn-outline" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const currentIndex = lessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const isCompleted = progress[lesson.id]?.completed

  const formatDuration = (seconds) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="lesson-page">
      {/* Back link */}
      <div style={{ marginBottom: '16px' }}>
        <Link to={`/courses/${slug}`} className="btn-ghost" style={{ padding: '8px 0' }}>
          &larr; {course?.title || 'Back to Course'}
        </Link>
      </div>

      {/* Video */}
      <VideoPlayer lesson={lesson} />

      {/* Lesson info */}
      <div className="lesson-header">
        <div>
          <h1 className="lesson-header-title">{lesson.title}</h1>
          <div className="lesson-header-meta">
            Lesson {currentIndex + 1} of {lessons.length}
            {lesson.duration_seconds ? ` \u2022 ${formatDuration(lesson.duration_seconds)}` : ''}
          </div>
        </div>

        <button
          className={isCompleted ? 'btn-outline' : 'btn'}
          style={{ whiteSpace: 'nowrap', padding: '10px 20px', fontSize: '13px' }}
          onClick={() => isCompleted ? markIncomplete(lesson.id) : markComplete(lesson.id)}
        >
          {isCompleted ? '\u2713 Completed' : 'Mark Complete'}
        </button>
      </div>

      {/* Navigation */}
      <div className="lesson-nav">
        {prevLesson ? (
          <Link to={`/courses/${slug}/${prevLesson.slug}`} className="lesson-nav-btn">
            &larr; Previous
          </Link>
        ) : (
          <button className="lesson-nav-btn" disabled>&larr; Previous</button>
        )}

        {nextLesson ? (
          <Link to={`/courses/${slug}/${nextLesson.slug}`} className="lesson-nav-btn">
            Next &rarr;
          </Link>
        ) : (
          <button className="lesson-nav-btn" disabled>Next &rarr;</button>
        )}
      </div>

      {/* Notes */}
      <NotesEditor lessonId={lesson.id} />
    </div>
  )
}
