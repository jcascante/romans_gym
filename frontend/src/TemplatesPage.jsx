import React, { useState } from 'react';
import logo from './assets/logo.jpg';
import benchPressImg from './assets/bench_press_example.jpg';

const placeholderImg = 'https://via.placeholder.com/40x40?text=Ex';
const defaultExerciseIcon = 'https://via.placeholder.com/40x40?text=Ex';
const templates = [
  {
    id: 1,
    name: 'Superman Workout',
    focus: 'Upper Body',
    duration: '5/WEEK',
    gender: 'MALE',
    type: 'Strength',
    description: 'A superhero-inspired upper body program.',
    weeks: [
      {
        week: 1,
        days: [
          { day: 1, exercises: [
            { id: '1', name: 'Bench Press', sets: 4, reps: 8, image: benchPressImg, video: '', comments: 'Focus on form, full range of motion.' },
            { id: '2', name: 'Pull Ups', sets: 4, reps: 10, image: placeholderImg, video: '', comments: 'Use full extension.' },
            { id: '3', name: 'Overhead Press', sets: 3, reps: 10, image: placeholderImg, video: '', comments: '' },
          ] },
          { day: 2, exercises: [
            { id: '4', name: 'Incline Dumbbell Press', sets: 4, reps: 8, image: placeholderImg, video: '', comments: '' },
            { id: '5', name: 'Barbell Row', sets: 4, reps: 10, image: placeholderImg, video: '', comments: 'Keep back flat.' },
          ] },
          { day: 3, exercises: [
            { id: '6', name: 'Dips', sets: 3, reps: 12, image: placeholderImg, video: '', comments: '' },
            { id: '7', name: 'Face Pulls', sets: 3, reps: 15, image: placeholderImg, video: '', comments: 'Pause at contraction.' },
          ] },
        ]
      },
      {
        week: 2,
        days: [
          { day: 1, exercises: [
            { id: '8', name: 'Bench Press', sets: 5, reps: 6, image: placeholderImg, video: '', comments: '' },
            { id: '9', name: 'Chin Ups', sets: 4, reps: 8, image: placeholderImg, video: '', comments: '' },
            { id: '10', name: 'Lateral Raises', sets: 3, reps: 15, image: placeholderImg, video: '', comments: 'Light weight, high reps.' },
          ] },
          { day: 2, exercises: [
            { id: '11', name: 'Incline Barbell Press', sets: 4, reps: 8, image: placeholderImg, video: '', comments: '' },
            { id: '12', name: 'Seated Cable Row', sets: 4, reps: 10, image: placeholderImg, video: '', comments: '' },
          ] },
          { day: 3, exercises: [
            { id: '13', name: 'Push Ups', sets: 3, reps: 20, image: placeholderImg, video: '', comments: '' },
            { id: '14', name: 'Rear Delt Fly', sets: 3, reps: 15, image: placeholderImg, video: '', comments: '' },
          ] },
        ]
      },
      {
        week: 3,
        days: [
          { day: 1, exercises: [
            { id: '15', name: 'Close Grip Bench Press', sets: 4, reps: 8, image: placeholderImg, video: '', comments: '' },
            { id: '16', name: 'Lat Pulldown', sets: 4, reps: 10, image: placeholderImg, video: '', comments: '' },
            { id: '17', name: 'Arnold Press', sets: 3, reps: 10, image: placeholderImg, video: '', comments: '' },
          ] },
          { day: 2, exercises: [
            { id: '18', name: 'Decline Dumbbell Press', sets: 4, reps: 8, image: placeholderImg, video: '', comments: '' },
            { id: '19', name: 'T-Bar Row', sets: 4, reps: 10, image: placeholderImg, video: '', comments: '' },
          ] },
          { day: 3, exercises: [
            { id: '20', name: 'Diamond Push Ups', sets: 3, reps: 15, image: placeholderImg, video: '', comments: '' },
            { id: '21', name: 'Cable Face Pull', sets: 3, reps: 15, image: placeholderImg, video: '', comments: '' },
          ] },
        ]
      },
    ],
  },
  {
    id: 2,
    name: 'Thor Workout',
    focus: 'Upper Body',
    duration: '5/WEEK',
    gender: 'MALE',
    type: 'Strength',
    description: 'Get as strong as Thor!',
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Deadlift', sets: 5, reps: 5 }] }] },
    ],
  },
  {
    id: 3,
    name: "Jared Feather's Favorite",
    focus: 'Whole Body',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Hypertrophy',
    description: "Jared Feather's go-to full body routine.",
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Squat', sets: 4, reps: 8 }] }] },
    ],
  },
  {
    id: 4,
    name: "Dr. Mike's Favorite",
    focus: 'Whole Body',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Conditioning',
    description: "Dr. Mike's favorite full body program.",
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Bench Press', sets: 4, reps: 8 }] }] },
    ],
  },
  {
    id: 5,
    name: 'Glutes & Abs Emphasis',
    focus: 'Glutes & Abs',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Hypertrophy',
    description: 'Focus on glutes and abs.',
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Hip Thrust', sets: 4, reps: 10 }] }] },
    ],
  },
  {
    id: 6,
    name: 'Chest & Triceps Emphasis',
    focus: 'Chest & Triceps',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Hypertrophy',
    description: 'Emphasize chest and triceps.',
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Incline Press', sets: 4, reps: 8 }] }] },
    ],
  },
  {
    id: 7,
    name: 'Back & Biceps Emphasis',
    focus: 'Back & Biceps',
    duration: '6/WEEK',
    gender: 'MALE',
    type: 'Hypertrophy',
    description: 'Emphasize back and biceps.',
    weeks: [
      { week: 1, days: [{ day: 1, exercises: [{ id: '1', name: 'Barbell Row', sets: 4, reps: 8 }] }] },
    ],
  },
];

const focusOptions = ['All', 'Upper Body', 'Whole Body', 'Glutes & Abs', 'Chest & Triceps', 'Back & Biceps'];
const durationOptions = ['All', '5/WEEK', '6/WEEK'];
const genderOptions = ['All', 'MALE', 'FEMALE'];
const typeOptions = ['All', 'Strength', 'Hypertrophy', 'Conditioning', 'Rehab'];

function TemplatesPage({ onAddToMyPrograms }) {
  const [focus, setFocus] = useState('All');
  const [duration, setDuration] = useState('All');
  const [gender, setGender] = useState('All');
  const [type, setType] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [myProgramsIds, setMyProgramsIds] = useState([]);
  const [mediaModal, setMediaModal] = useState({ open: false, type: '', src: '', alt: '' });

  const filteredTemplates = templates.filter(t =>
    (focus === 'All' || t.focus === focus) &&
    (duration === 'All' || t.duration === duration) &&
    (gender === 'All' || t.gender === gender) &&
    (type === 'All' || t.type === type)
  );

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddToMyProgramsClick = (template) => {
    if (onAddToMyPrograms) {
      onAddToMyPrograms(template);
      setMyProgramsIds((prev) => [...prev, template.id]);
    }
  };

  const MediaModal = ({ open, type, src, alt, onClose }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
          <button
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-lg hover:bg-accent/10 focus:bg-accent/20 transition border border-transparent hover:border-accent focus:border-accent shadow-none p-0"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="text-2xl leading-none text-white">&times;</span>
          </button>
          {type === 'video' ? (
            <video src={src} controls autoPlay className="w-full h-auto rounded" />
          ) : (
            <img src={src} alt={alt} className="w-full h-auto rounded" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-16 px-4 bg-gray-100 flex flex-col dark:bg-neutral-900">
      {/* Enhanced Header Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 dark:bg-neutral-800 dark:border dark:border-neutral-700">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img src={logo} alt="Romans Gym Logo" className="w-16 h-16 rounded-lg bg-secondary p-2" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="uppercase text-xs text-accent font-semibold tracking-widest mb-2 dark:text-gray-300">
                Workout Programs
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 dark:text-gray-100">
                Programming Templates
              </h1>
              <p className="text-accent text-lg leading-relaxed max-w-2xl dark:text-gray-300">
                Discover and customize professional workout programs designed to help you achieve your fitness goals.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-col gap-2">
                <span className="bg-primary text-secondary text-sm px-4 py-2 rounded-full font-semibold dark:bg-neutral-700 dark:text-gray-100">
                  {filteredTemplates.length} Templates
                </span>
                <span className="bg-accent text-secondary text-sm px-4 py-2 rounded-full font-semibold dark:bg-neutral-600 dark:text-gray-100">
                  Ready to Use
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border dark:border-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select className="px-4 py-2 rounded border border-accent bg-white text-accent text-base dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-100" value={focus} onChange={e => setFocus(e.target.value)}>
              {focusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select className="px-4 py-2 rounded border border-accent bg-white text-accent text-base dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-100" value={duration} onChange={e => setDuration(e.target.value)}>
              {durationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select className="px-4 py-2 rounded border border-accent bg-white text-accent text-base dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-100" value={gender} onChange={e => setGender(e.target.value)}>
              {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select className="px-4 py-2 rounded border border-accent bg-white text-accent text-base dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-100" value={type} onChange={e => setType(e.target.value)}>
              {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </div>
      {/* Expandable List Layout for Templates */}
      <div className="w-full bg-gray-100 rounded-2xl shadow-lg dark:bg-neutral-800 dark:border dark:border-neutral-700">
        {filteredTemplates.length === 0 ? (
          <div className="text-accent text-center py-12 dark:text-gray-100">No templates found for the selected filters.</div>
        ) : (
          <div className="divide-y divide-accent/20 dark:divide-neutral-700">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className={`cursor-pointer transition-all duration-200 ${expandedId === template.id ? 'bg-secondary/10 dark:bg-neutral-700/40' : 'hover:bg-accent/5 dark:hover:bg-neutral-700/30'}`}
                onClick={() => handleExpand(template.id)}
              >
                {/* Template Header */}
                <div className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-8 h-8 rounded bg-secondary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="uppercase text-xs text-accent font-semibold tracking-widest mb-1 text-left dark:text-gray-300">{template.focus}</div>
                      <div className="font-bold text-primary text-lg leading-tight text-left dark:text-gray-300">{template.name}</div>
                      <div className="mt-2 text-accent text-sm leading-relaxed text-left dark:text-gray-100">{template.description}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="bg-primary text-secondary text-xs px-3 py-1 rounded-full font-medium">{template.duration}</span>
                      <span className="bg-accent text-secondary text-xs px-3 py-1 rounded-full font-medium">{template.gender}</span>
                      <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium dark:bg-gray-400 dark:text-neutral-900">{template.type}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === template.id && (
                  <div className="px-6 pb-6 text-accent text-sm border-t border-accent/20 dark:text-gray-100 dark:border-neutral-700" onClick={e => e.stopPropagation()}>
                    <div className="pt-4">
                      <span className="font-semibold text-primary dark:text-accent">Programming:</span>
                      <div className="mt-3 space-y-4">
                        {template.weeks && template.weeks.length > 0 ? (
                          template.weeks.map(week => (
                            <div key={week.week} className="bg-accent/5 rounded-lg p-4 dark:bg-neutral-900">
                              <div className="font-semibold text-accent mb-3 dark:text-accent">Week {week.week}</div>
                              <div className="space-y-3">
                                {week.days.map(day => (
                                  <div key={day.day} className="bg-gray-200 rounded-lg p-3 border border-accent/10 dark:bg-neutral-800 dark:border-neutral-700">
                                    <div className="font-semibold text-primary mb-2 dark:text-accent">Day {day.day}</div>
                                    <div className="overflow-x-auto">
                                      <table className="min-w-full text-left text-xs md:text-sm dark:text-gray-100">
                                        <thead>
                                          <tr className="bg-accent/10 dark:bg-neutral-700/60">
                                            <th className="p-2">Exercise</th>
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Sets</th>
                                            <th className="p-2">Reps</th>
                                            <th className="p-2">Comments/Details</th>
                                            <th className="p-2">Media</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {day.exercises.map(ex => (
                                            <tr key={ex.id} className="border-b border-accent/10 dark:border-neutral-700">
                                              <td className="p-2">
                                                <img src={defaultExerciseIcon} alt="Exercise icon" className="w-10 h-10 rounded object-cover" />
                                              </td>
                                              <td className="p-2 font-medium text-accent dark:text-gray-100">{ex.name}</td>
                                              <td className="p-2">{ex.sets}</td>
                                              <td className="p-2">{ex.reps}</td>
                                              <td className="p-2 text-accent/80 dark:text-gray-100">{ex.comments || <span className="italic text-accent/40 dark:text-gray-400">No comments</span>}</td>
                                              <td className="p-2">
                                                {ex.video ? (
                                                  <div className="cursor-pointer group" onClick={() => setMediaModal({ open: true, type: 'video', src: ex.video, alt: ex.name })}>
                                                    <video src={ex.video} className="w-24 h-16 rounded group-hover:opacity-80" muted />
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                      <span className="text-white text-2xl bg-black bg-opacity-50 rounded-full px-2">▶</span>
                                                    </div>
                                                  </div>
                                                ) : ex.image ? (
                                                  <img
                                                    src={ex.image}
                                                    alt={ex.name}
                                                    className="w-16 h-16 rounded object-cover cursor-pointer hover:opacity-80"
                                                    onClick={() => setMediaModal({ open: true, type: 'image', src: ex.image, alt: ex.name })}
                                                  />
                                                ) : (
                                                  <span className="italic text-accent/40 dark:text-gray-400">No media available</span>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="italic text-accent text-center py-4 dark:text-gray-400">No programming details available.</div>
                        )}
                      </div>
                    </div>
                    <button
                      className="mt-4 bg-primary text-secondary px-6 py-2 rounded-lg shadow hover:bg-accent transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed dark:bg-accent dark:text-neutral-900 dark:hover:bg-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMyProgramsClick(template);
                      }}
                      disabled={myProgramsIds.includes(template.id)}
                    >
                      {myProgramsIds.includes(template.id) ? 'Added to My Programs' : 'Add to My Programs'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <MediaModal {...mediaModal} onClose={() => setMediaModal({ open: false, type: '', src: '', alt: '' })} />
    </section>
  );
}

export default TemplatesPage; 