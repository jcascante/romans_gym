import React, { useState, useEffect, useRef } from 'react';
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

const focusOptions = ['Upper Body', 'Whole Body', 'Glutes & Abs', 'Chest & Triceps', 'Back & Biceps'];
const durationOptions = ['5/WEEK', '6/WEEK'];
const genderOptions = ['MALE', 'FEMALE'];
const typeOptions = ['Strength', 'Hypertrophy', 'Conditioning', 'Rehab'];

function TemplatesPage({ onAddToMyPrograms }) {
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [myProgramsIds, setMyProgramsIds] = useState([]);
  const [mediaModal, setMediaModal] = useState({ open: false, type: '', src: '', alt: '' });
  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      const dropdowns = document.querySelectorAll('[data-dropdown]');
      let clickedInside = false;
      
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
          clickedInside = true;
        }
      });
      
      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredTemplates = templates.filter(t =>
    (selectedFocus.length === 0 || selectedFocus.includes(t.focus)) &&
    (selectedDuration.length === 0 || selectedDuration.includes(t.duration)) &&
    (selectedGender.length === 0 || selectedGender.includes(t.gender)) &&
    (selectedType.length === 0 || selectedType.includes(t.type))
  );

  const handleFilterToggle = (filterType, value) => {
    const setterMap = {
      focus: setSelectedFocus,
      duration: setSelectedDuration,
      gender: setSelectedGender,
      type: setSelectedType
    };
    
    const currentValues = {
      focus: selectedFocus,
      duration: selectedDuration,
      gender: selectedGender,
      type: selectedType
    };
    
    const setter = setterMap[filterType];
    const current = currentValues[filterType];
    
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedFocus([]);
    setSelectedDuration([]);
    setSelectedGender([]);
    setSelectedType([]);
  };

  const getActiveFiltersCount = () => {
    return selectedFocus.length + selectedDuration.length + selectedGender.length + selectedType.length;
  };

  const handleDropdownToggle = (dropdownType) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  const handleCheckboxChange = (filterType, value) => {
    const setterMap = {
      focus: setSelectedFocus,
      duration: setSelectedDuration,
      gender: setSelectedGender,
      type: setSelectedType
    };
    
    const currentValues = {
      focus: selectedFocus,
      duration: selectedDuration,
      gender: selectedGender,
      type: selectedType
    };
    
    const setter = setterMap[filterType];
    const current = currentValues[filterType];
    
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  const FilterDropdown = ({ type, label, options, selectedValues }) => {
    const isOpen = openDropdown === type;
    const hasSelections = selectedValues.length > 0;
    
    return (
      <div className="relative" data-dropdown>
        <button
          onClick={() => handleDropdownToggle(type)}
          className={`w-full px-3 py-2 text-sm rounded-lg border transition-all flex items-center justify-between ${
            hasSelections
              ? 'bg-primary/10 border-primary text-primary dark:bg-primary/20 dark:border-primary dark:text-white'
              : 'bg-white border-accent/30 text-accent hover:bg-accent/5 dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-600'
          }`}
        >
          <span className="truncate">
            {hasSelections ? `${selectedValues.length} selected` : label}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-neutral-700 border border-accent/30 dark:border-neutral-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map(option => (
              <label
                key={option}
                className="flex items-center px-3 py-2 hover:bg-accent/5 dark:hover:bg-neutral-600 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleCheckboxChange(type, option)}
                  className="mr-2 w-4 h-4 text-primary border-accent/30 rounded focus:ring-primary/20 dark:bg-neutral-600 dark:border-neutral-500"
                />
                <span className="text-sm text-accent dark:text-gray-200">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

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
    <section className="w-full py-16 px-4 bg-gray-50 flex flex-col dark:bg-neutral-900">
      {/* Enhanced Header Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-8 dark:bg-neutral-800 dark:border dark:border-neutral-700">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img src={logo} alt="Romans Gym Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-secondary p-2" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="uppercase text-xs text-accent font-semibold tracking-widest mb-2 dark:text-gray-300">
                Workout Programs
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-3 dark:text-gray-100">
                Programming Templates
              </h1>
              <p className="text-accent text-base sm:text-lg leading-relaxed max-w-2xl dark:text-gray-300">
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
      {/* Compact Dynamic Filter Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 dark:bg-neutral-800 dark:border dark:border-neutral-700">
          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-primary dark:text-white">Filters</h3>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-secondary text-xs px-2 py-1 rounded-full font-medium dark:bg-primary dark:text-secondary">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-1 rounded dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-500 transition-colors font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Compact Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FilterDropdown
              type="focus"
              label="Focus Area"
              options={focusOptions}
              selectedValues={selectedFocus}
            />
            <FilterDropdown
              type="duration"
              label="Duration"
              options={durationOptions}
              selectedValues={selectedDuration}
            />
            <FilterDropdown
              type="gender"
              label="Gender"
              options={genderOptions}
              selectedValues={selectedGender}
            />
            <FilterDropdown
              type="type"
              label="Workout Type"
              options={typeOptions}
              selectedValues={selectedType}
            />
          </div>

          {/* Active Filters Display */}
          {(selectedFocus.length > 0 || selectedDuration.length > 0 || selectedGender.length > 0 || selectedType.length > 0) && (
            <div className="mt-4 pt-3 border-t border-accent/20 dark:border-neutral-700">
              <div className="flex flex-wrap gap-2">
                {selectedFocus.map(option => (
                  <span key={`focus-${option}`} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full dark:bg-primary/20 dark:text-white">
                    Focus: {option}
                  </span>
                ))}
                {selectedDuration.map(option => (
                  <span key={`duration-${option}`} className="bg-blue-500/20 text-blue-600 text-xs px-2 py-1 rounded-full border border-blue-300 dark:bg-blue-400/30 dark:text-white dark:border-blue-400/50">
                    Duration: {option}
                  </span>
                ))}
                {selectedGender.map(option => (
                  <span key={`gender-${option}`} className="bg-gray-500/10 text-gray-600 text-xs px-2 py-1 rounded-full dark:bg-gray-400/20 dark:text-white">
                    Gender: {option}
                  </span>
                ))}
                {selectedType.map(option => (
                  <span key={`type-${option}`} className="bg-purple-500/10 text-purple-600 text-xs px-2 py-1 rounded-full dark:bg-purple-400/20 dark:text-white">
                    Type: {option}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Expandable List Layout for Templates */}
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700">
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
                <div className="px-4 sm:px-6 py-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="logo" className="w-8 h-8 rounded bg-secondary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="uppercase text-xs text-accent font-semibold tracking-widest mb-1 text-left dark:text-gray-300">{template.focus}</div>
                        <div className="font-bold text-primary text-lg leading-tight text-left dark:text-gray-300">{template.name}</div>
                        <div className="mt-2 text-accent text-sm leading-relaxed text-left dark:text-gray-100">{template.description}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
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
                                        <thead className="hidden sm:table-header-group">
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
                                      
                                      {/* Mobile-friendly exercise cards */}
                                      <div className="sm:hidden space-y-3 mt-4">
                                        {day.exercises.map(ex => (
                                          <div key={ex.id} className="bg-white dark:bg-neutral-700 rounded-lg p-4 border border-accent/10 dark:border-neutral-600">
                                            <div className="flex items-center gap-3 mb-3">
                                              <img src={defaultExerciseIcon} alt="Exercise icon" className="w-12 h-12 rounded object-cover" />
                                              <div className="flex-1">
                                                <h4 className="font-semibold text-accent dark:text-gray-100">{ex.name}</h4>
                                                <div className="flex gap-4 text-sm text-accent/70 dark:text-gray-300">
                                                  <span>{ex.sets} sets</span>
                                                  <span>{ex.reps} reps</span>
                                                </div>
                                              </div>
                                            </div>
                                            {ex.comments && (
                                              <p className="text-sm text-accent/80 dark:text-gray-100 mb-3">{ex.comments}</p>
                                            )}
                                            {ex.video && (
                                              <div className="cursor-pointer" onClick={() => setMediaModal({ open: true, type: 'video', src: ex.video, alt: ex.name })}>
                                                <video src={ex.video} className="w-full h-32 rounded object-cover" muted />
                                              </div>
                                            )}
                                            {ex.image && !ex.video && (
                                              <img
                                                src={ex.image}
                                                alt={ex.name}
                                                className="w-full h-32 rounded object-cover cursor-pointer"
                                                onClick={() => setMediaModal({ open: true, type: 'image', src: ex.image, alt: ex.name })}
                                              />
                                            )}
                                          </div>
                                        ))}
                                      </div>
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