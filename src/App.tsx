
import { useState } from 'react'
import './App.css'

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="portal-container">
      <section className="portal-section">
        <div className="left-content">
          <h1 className="portal-title">Welcome to the Portal</h1>
          <p className="portal-text">
            Enter your journey through this innovative interface.
            Scroll down to explore more sections and interact with
            our dynamic portal system.
          </p>
        </div>
        <div className="right-content">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="portal-input"
            value={formData.name}
            onChange={handleChange}
          />
          <button className="portal-button">Begin Journey</button>
        </div>
      </section>

      <section className="portal-section">
        <div className="left-content">
          <h2 className="portal-title">Your Experience</h2>
          <p className="portal-text">
            Share your thoughts and experiences with us.
            We value your feedback and suggestions for
            improving our portal system.
          </p>
        </div>
        <div className="right-content">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="portal-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="message"
            placeholder="Your message"
            className="portal-input"
            value={formData.message}
            onChange={handleChange}
          />
          <button className="portal-button" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
      </section>
    </div>
  )
}
