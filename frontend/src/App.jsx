import './App.css'
import logo from './assets/logo.png'
import TemplateCustomizer from './TemplateCustomizer';
import TemplatesPage from './TemplatesPage';
import MyProgramsPage from './MyProgramsPage';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';

const sampleTemplates = [
  {
    id: 1,
    name: 'Beginner Strength',
    category: 'Strength',
    description: 'A basic strength program for beginners.',
    exercises: [
      { id: '1', name: 'Squat', sets: 3, reps: 8, notes: '' },
      { id: '2', name: 'Bench Press', sets: 3, reps: 8, notes: '' },
      { id: '3', name: 'Deadlift', sets: 2, reps: 5, notes: '' },
    ],
  },
  {
    id: 2,
    name: 'Hypertrophy Builder',
    category: 'Hypertrophy',
    description: 'A template focused on muscle growth.',
    exercises: [
      { id: '1', name: 'Leg Press', sets: 4, reps: 12, notes: '' },
      { id: '2', name: 'Incline Dumbbell Press', sets: 4, reps: 10, notes: '' },
      { id: '3', name: 'Lat Pulldown', sets: 4, reps: 12, notes: '' },
    ],
  },
];

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="w-full bg-primary text-secondary flex flex-col items-center justify-center py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/src/assets/logo.png')] bg-center bg-no-repeat bg-contain pointer-events-none" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Ready to get strong with GymApp?</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-medium">Achieve your fitness goals with comprehensive training, expert guidance, and fully customizable programming templates.</p>
        <button onClick={() => navigate('/templates')} className="bg-secondary text-primary px-8 py-4 rounded-lg font-bold text-lg shadow hover:bg-accent hover:text-white transition">View Templates</button>
      </section>
      {/* Features Section */}
      <section id="features" className="w-full flex flex-col items-center py-16 px-4 bg-white dark:bg-neutral-900">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 dark:text-gray-100">Why Choose GymApp?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="bg-secondary rounded-xl shadow-lg p-8 flex flex-col items-center border-t-4 border-primary dark:bg-neutral-800 dark:text-gray-100 dark:border-accent">
            <span className="text-primary text-4xl mb-3">🏋️‍♂️</span>
            <h3 className="font-bold text-xl mb-2 text-accent dark:text-gray-100">AI-Powered Coaching</h3>
            <p className="text-center text-accent dark:text-gray-100">Our AI coaches help you reach your goals safely and efficiently with personalized guidance and smart recommendations.</p>
          </div>
          <div className="bg-secondary rounded-xl shadow-lg p-8 flex flex-col items-center border-t-4 border-primary dark:bg-neutral-800 dark:text-gray-100 dark:border-accent">
            <span className="text-primary text-4xl mb-3">💪</span>
            <h3 className="font-bold text-xl mb-2 text-accent dark:text-gray-100">Smart Training</h3>
            <p className="text-center text-accent dark:text-gray-100">Intelligent workout tracking and progress analysis for all training styles and levels, ensuring optimal results.</p>
          </div>
          <div className="bg-secondary rounded-xl shadow-lg p-8 flex flex-col items-center border-t-4 border-primary dark:bg-neutral-800 dark:text-gray-100 dark:border-accent">
            <span className="text-primary text-4xl mb-3">📝</span>
            <h3 className="font-bold text-xl mb-2 text-accent dark:text-gray-100">Adaptive Programs</h3>
            <p className="text-center text-accent dark:text-gray-100">AI-generated and customizable programming templates that adapt to your progress and unique fitness needs.</p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="w-full bg-primary bg-opacity-5 py-16 px-4 flex flex-col items-center dark:bg-neutral-900">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 dark:text-gray-100">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[              {
                quote: "GymApp has completely changed my fitness journey. The comprehensive templates are a game changer!",
                name: 'Alex P.',
              }, {
            quote: "The trainers are knowledgeable and the equipment is top-notch. Highly recommend!",
            name: 'Maria S.',
          }, {
            quote: "I love being able to tailor my workouts. The app is so easy to use!",
            name: 'Chris D.',
          }].map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border-b-4 border-primary dark:bg-neutral-800 dark:text-gray-100 dark:border-accent">
              <span className="text-accent text-5xl mb-4 dark:text-gray-100">“</span>
              <p className="text-accent text-lg mb-4 italic dark:text-gray-100">{t.quote}</p>
              <span className="font-bold text-primary dark:text-gray-100">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Social Media Links */}
      <div className="flex gap-6 justify-center py-8 bg-white dark:bg-neutral-900">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent text-2xl" aria-label="Instagram">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.545 1.459 2.488 2.516 2.216 3.689 2.158 4.966.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.33 2.45 1.387 3.507 1.057 1.057 2.23 1.329 3.507 1.387C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.33 3.507-1.387 1.057-1.057 1.329-2.23 1.387-3.507.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.33-2.45-1.387-3.507C19.398.402 18.225.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent text-2xl" aria-label="Facebook">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
        </a>
      </div>
    </>
  );
}

function App() {
  const [myPrograms, setMyPrograms] = useState([]);

  // Handler to add a template to my programs
  const handleAddToMyPrograms = (template) => {
    // Prevent duplicates by id
    setMyPrograms((prev) => prev.some(p => p.id === template.id) ? prev : [...prev, template]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage onAddToMyPrograms={handleAddToMyPrograms} />} />
          <Route path="/my-programs" element={<MyProgramsPage myPrograms={myPrograms} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
