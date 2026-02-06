import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { config } from '../config'

export default function Dashboard() {
  const { user, profile, hasActiveSubscription } = useAuth()
  const { courseProgress } = useProgress()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      if (!supabase) {
        // Fallback: use config courses as preview
        setCourses(config.courses.map((c, i) => ({
          id: i + 1,
          title: c.title,
          slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
          description: c.description,
          lesson_count: c.lessons,
        })))
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('sort_order')

      if (data) setCourses(data)
      setLoading(false)
    }

    fetchCourses()
  }, [])

  // Subscription gate
  if (!hasActiveSubscription()) {
    return (
      <div className="gate-page">
        <div className="gate-card">
          <div className="gate-icon">&#128274;</div>
          <h2 className="gate-title">Subscription Required</h2>
          <p className="gate-desc">
            Subscribe to access all courses and lessons. Choose the plan that works best for you.
          </p>
          <Link to="/pricing" className="btn btn-full" style={{ textDecoration: 'none' }}>
            View Plans
          </Link>
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

  const getName = () => {
    if (profile?.full_name) return profile.full_name.split(' ')[0]
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name.split(' ')[0]
    return 'Fighter'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-greeting">Welcome back, <span className="text-accent">{getName()}</span></h1>
        <p className="dashboard-subtitle">Continue your training</p>
      </div>

      <div className="dashboard-grid">
        {courses.map(course => {
          const cp = courseProgress[course.id]
          const completed = cp?.completed || 0
          const total = cp?.total || course.lesson_count || 0
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0

          return (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="dashboard-course-card"
            >
              <div className="dashboard-course-thumb">
                <div style={{ fontSize: '48px', opacity: 0.3 }}>&#129354;</div>
              </div>
              <div className="dashboard-course-body">
                <h3 className="dashboard-course-title">{course.title}</h3>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${percent === 100 ? 'complete' : ''}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="progress-text">
                  {completed}/{total} lessons {percent === 100 ? '- Complete!' : `(${percent}%)`}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
