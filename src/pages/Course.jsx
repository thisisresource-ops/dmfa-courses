import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'

export default function Course() {
  const { slug } = useParams()
  const { hasActiveSubscription } = useAuth()
  const { progress } = useProgress()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (courseData) {
        setCourse(courseData)
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseData.id)
          .eq('is_published', true)
          .order('sort_order')

        if (lessonData) setLessons(lessonData)
      }
      setLoading(false)
    }

    fetchCourse()
  }, [slug])

  // Subscription gate
  if (!hasActiveSubscription()) {
    return (
      <div className="gate-page">
        <div className="gate-card">
          <div className="gate-icon">&#128274;</div>
          <h2 className="gate-title">Subscription Required</h2>
          <p className="gate-desc">Subscribe to access this course and all lessons.</p>
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

  if (!course) {
    return (
      <div className="course-detail">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>Course not found</h2>
        <Link to="/dashboard" className="btn-outline" style={{ marginTop: '16px', display: 'inline-block' }}>
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const completedCount = lessons.filter(l => progress[l.id]?.completed).length

  const formatDuration = (seconds) => {
    if (!seconds) return ''
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  return (
    <div className="course-detail">
      <div style={{ marginBottom: '16px' }}>
        <Link to="/dashboard" className="btn-ghost" style={{ padding: '8px 0' }}>
          &larr; All Courses
        </Link>
      </div>

      <div className="course-detail-header">
        <h1 className="course-detail-title">{course.title}</h1>
        <p className="text-secondary" style={{ marginBottom: '8px' }}>{course.description}</p>
        <div className="course-detail-meta">
          {lessons.length} lessons &bull; {completedCount}/{lessons.length} completed
        </div>
        <div className="progress-bar" style={{ marginTop: '16px', height: '6px' }}>
          <div
            className={`progress-bar-fill ${completedCount === lessons.length && lessons.length > 0 ? 'complete' : ''}`}
            style={{ width: `${lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0}%` }}
          />
        </div>
      </div>

      <div className="lesson-list">
        {lessons.map((lesson, i) => {
          const isCompleted = progress[lesson.id]?.completed
          return (
            <Link
              key={lesson.id}
              to={`/courses/${slug}/${lesson.slug}`}
              className="lesson-item"
            >
              <div className="lesson-number">{i + 1}</div>
              <div className="lesson-info">
                <div className="lesson-title">{lesson.title}</div>
                {lesson.duration_seconds && (
                  <div className="lesson-duration">{formatDuration(lesson.duration_seconds)}</div>
                )}
              </div>
              {lesson.is_free_preview && (
                <span className="lesson-preview-badge">Free</span>
              )}
              <div className={`lesson-check ${isCompleted ? 'completed' : ''}`}>
                {isCompleted ? '\u2713' : ''}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
