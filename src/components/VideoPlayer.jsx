import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { config } from '../config'

export default function VideoPlayer({ lesson, onProgress }) {
  const { user } = useAuth()
  const [videoUrl, setVideoUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!lesson?.bunny_video_id) {
      setLoading(false)
      return
    }

    const fetchVideoToken = async () => {
      setLoading(true)
      setError(null)
      try {
        const session = await (await import('../lib/supabase')).supabase?.auth.getSession()
        const token = session?.data?.session?.access_token

        const res = await fetch(
          `${config.webhooks.videoToken}?lessonId=${lesson.id}&videoId=${lesson.bunny_video_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (!res.ok) throw new Error('Failed to get video')
        const data = await res.json()
        setVideoUrl(data.embedUrl)
      } catch (err) {
        setError('Unable to load video. Please try again.')
      }
      setLoading(false)
    }

    fetchVideoToken()
  }, [lesson?.id, lesson?.bunny_video_id, user])

  if (!lesson?.bunny_video_id) {
    return (
      <div className="video-container">
        <div className="video-placeholder">
          <div className="video-placeholder-icon">&#9654;</div>
          <span>Video coming soon</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="video-container">
        <div className="video-placeholder">
          <div className="spinner"></div>
          <span>Loading video...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="video-container">
        <div className="video-placeholder">
          <span className="text-error">{error}</span>
          <button className="btn btn-sm" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="video-container">
      <iframe
        ref={iframeRef}
        src={videoUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={lesson.title}
      />
    </div>
  )
}
