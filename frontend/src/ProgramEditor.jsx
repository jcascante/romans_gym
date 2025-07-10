import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Common exercise database - in a real app, this would come from an API
const EXERCISE_DATABASE = [
  // Upper Body
  { name: 'Bench Press', category: 'Upper Body', type: 'Push' },
  { name: 'Incline Dumbbell Press', category: 'Upper Body', type: 'Push' },
  { name: 'Decline Barbell Press', category: 'Upper Body', type: 'Push' },
  { name: 'Pull Ups', category: 'Upper Body', type: 'Pull' },
  { name: 'Chin Ups', category: 'Upper Body', type: 'Pull' },
  { name: 'Barbell Row', category: 'Upper Body', type: 'Pull' },
  { name: 'Lat Pulldown', category: 'Upper Body', type: 'Pull' },
  { name: 'Overhead Press', category: 'Upper Body', type: 'Push' },
  { name: 'Lateral Raises', category: 'Upper Body', type: 'Push' },
  { name: 'Face Pulls', category: 'Upper Body', type: 'Pull' },
  { name: 'Dips', category: 'Upper Body', type: 'Push' },
  { name: 'Push Ups', category: 'Upper Body', type: 'Push' },
  { name: 'Diamond Push Ups', category: 'Upper Body', type: 'Push' },
  { name: 'Arnold Press', category: 'Upper Body', type: 'Push' },
  { name: 'Seated Cable Row', category: 'Upper Body', type: 'Pull' },
  { name: 'T-Bar Row', category: 'Upper Body', type: 'Pull' },
  { name: 'Rear Delt Fly', category: 'Upper Body', type: 'Pull' },
  { name: 'Cable Face Pull', category: 'Upper Body', type: 'Pull' },
  
  // Lower Body
  { name: 'Squat', category: 'Lower Body', type: 'Push' },
  { name: 'Deadlift', category: 'Lower Body', type: 'Pull' },
  { name: 'Leg Press', category: 'Lower Body', type: 'Push' },
  { name: 'Hip Thrust', category: 'Lower Body', type: 'Push' },
  { name: 'Romanian Deadlift', category: 'Lower Body', type: 'Pull' },
  { name: 'Leg Extensions', category: 'Lower Body', type: 'Push' },
  { name: 'Leg Curls', category: 'Lower Body', type: 'Pull' },
  { name: 'Calf Raises', category: 'Lower Body', type: 'Push' },
  { name: 'Lunges', category: 'Lower Body', type: 'Push' },
  { name: 'Bulgarian Split Squats', category: 'Lower Body', type: 'Push' },
  
  // Core
  { name: 'Plank', category: 'Core', type: 'Stability' },
  { name: 'Crunches', category: 'Core', type: 'Flexion' },
  { name: 'Russian Twists', category: 'Core', type: 'Rotation' },
  { name: 'Mountain Climbers', category: 'Core', type: 'Dynamic' },
  { name: 'Dead Bug', category: 'Core', type: 'Stability' },
  { name: 'Bird Dog', category: 'Core', type: 'Stability' },
  
  // Cardio
  { name: 'Running', category: 'Cardio', type: 'Endurance' },
  { name: 'Cycling', category: 'Cardio', type: 'Endurance' },
  { name: 'Rowing', category: 'Cardio', type: 'Endurance' },
  { name: 'Jump Rope', category: 'Cardio', type: 'Endurance' },
  { name: 'Burpees', category: 'Cardio', type: 'Dynamic' },
  { name: 'Mountain Climbers', category: 'Cardio', type: 'Dynamic' },
];

function ProgramEditor({ program, onSave, onCancel }) {
  const [programData, setProgramData] = useState(program);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  // Get unique categories for filtering
  const categories = ['All', ...new Set(EXERCISE_DATABASE.map(ex => ex.category))];

  // Filter exercises based on search and category
  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current exercises for the selected week and day
  const getCurrentExercises = () => {
    if (!programData.weeks || !programData.weeks[selectedWeek]) return [];
    if (!programData.weeks[selectedWeek].days || !programData.weeks[selectedWeek].days[selectedDay]) return [];
    return programData.weeks[selectedWeek].days[selectedDay].exercises || [];
  };

  // Update exercises for the selected week and day
  const updateCurrentExercises = (newExercises) => {
    setHistory([...history, programData]);
    setFuture([]);
    
    const updatedProgram = { ...programData };
    
    // Ensure weeks array exists
    if (!updatedProgram.weeks) updatedProgram.weeks = [];
    if (!updatedProgram.weeks[selectedWeek]) {
      updatedProgram.weeks[selectedWeek] = { week: selectedWeek + 1, days: [] };
    }
    
    // Ensure days array exists
    if (!updatedProgram.weeks[selectedWeek].days) updatedProgram.weeks[selectedWeek].days = [];
    if (!updatedProgram.weeks[selectedWeek].days[selectedDay]) {
      updatedProgram.weeks[selectedWeek].days[selectedDay] = { day: selectedDay + 1, exercises: [] };
    }
    
    // Update exercises
    updatedProgram.weeks[selectedWeek].days[selectedDay].exercises = newExercises;
    
    setProgramData(updatedProgram);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const currentExercises = getCurrentExercises();
    const reordered = Array.from(currentExercises);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    
    updateCurrentExercises(reordered);
  };

  const handleAddExercise = (exerciseName) => {
    const newExercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 3,
      reps: 8,
      notes: '',
      image: '',
      video: ''
    };
    
    const currentExercises = getCurrentExercises();
    updateCurrentExercises([...currentExercises, newExercise]);
    setShowExerciseModal(false);
    setSearchTerm('');
  };

  const handleDeleteExercise = (id) => {
    const currentExercises = getCurrentExercises();
    updateCurrentExercises(currentExercises.filter(e => e.id !== id));
  };

  const handleChangeExercise = (id, field, value) => {
    const currentExercises = getCurrentExercises();
    const updatedExercises = currentExercises.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    );
    updateCurrentExercises(updatedExercises);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setFuture([programData, ...future]);
    setProgramData(prev);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory([...history, programData]);
    setFuture(future.slice(1));
    setProgramData(next);
  };

  const handleAddWeek = () => {
    setHistory([...history, programData]);
    setFuture([]);
    
    const newWeek = {
      week: (programData.weeks?.length || 0) + 1,
      days: [{ day: 1, exercises: [] }]
    };
    
    const updatedProgram = {
      ...programData,
      weeks: [...(programData.weeks || []), newWeek]
    };
    
    setProgramData(updatedProgram);
    setSelectedWeek(updatedProgram.weeks.length - 1);
    setSelectedDay(0);
  };

  const handleAddDay = () => {
    setHistory([...history, programData]);
    setFuture([]);
    
    const updatedProgram = { ...programData };
    const currentWeek = updatedProgram.weeks[selectedWeek];
    const newDay = {
      day: (currentWeek.days?.length || 0) + 1,
      exercises: []
    };
    
    currentWeek.days = [...(currentWeek.days || []), newDay];
    
    setProgramData(updatedProgram);
    setSelectedDay(currentWeek.days.length - 1);
  };

  const handleDeleteWeek = (weekIndex) => {
    if (programData.weeks.length <= 1) return; // Keep at least one week
    
    setHistory([...history, programData]);
    setFuture([]);
    
    const updatedProgram = {
      ...programData,
      weeks: programData.weeks.filter((_, index) => index !== weekIndex)
    };
    
    setProgramData(updatedProgram);
    
    // Adjust selected week if necessary
    if (selectedWeek >= weekIndex) {
      setSelectedWeek(Math.max(0, selectedWeek - 1));
    }
  };

  const handleDeleteDay = (dayIndex) => {
    const currentWeek = programData.weeks[selectedWeek];
    if (currentWeek.days.length <= 1) return; // Keep at least one day
    
    setHistory([...history, programData]);
    setFuture([]);
    
    const updatedProgram = { ...programData };
    updatedProgram.weeks[selectedWeek].days = currentWeek.days.filter((_, index) => index !== dayIndex);
    
    setProgramData(updatedProgram);
    
    // Adjust selected day if necessary
    if (selectedDay >= dayIndex) {
      setSelectedDay(Math.max(0, selectedDay - 1));
    }
  };

  const handleSave = () => {
    onSave(programData);
  };

  const ExerciseModal = () => {
    if (!showExerciseModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowExerciseModal(false)}>
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden dark:bg-neutral-800" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary dark:text-gray-100">Add Exercise</h3>
            <button
              onClick={() => setShowExerciseModal(false)}
              className="text-accent hover:text-primary dark:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-4 space-y-3">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Exercise List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredExercises.length === 0 ? (
              <p className="text-center text-accent py-8 dark:text-gray-300">No exercises found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredExercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddExercise(exercise.name)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-neutral-600 dark:hover:bg-neutral-700 dark:text-gray-100"
                  >
                    <div className="font-medium">{exercise.name}</div>
                    <div className="text-sm text-accent dark:text-gray-400">
                      {exercise.category} • {exercise.type}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentExercises = getCurrentExercises();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden dark:bg-neutral-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-gray-100">Edit Program: {program.name}</h2>
              <p className="text-accent dark:text-gray-300">Customize your workout routine by week and day</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-accent border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="px-3 py-2 bg-accent text-secondary rounded-lg hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={future.length === 0}
              className="px-3 py-2 bg-accent text-secondary rounded-lg hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Redo
            </button>
            <button
              onClick={handleAddWeek}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add Week
            </button>
            <button
              onClick={handleAddDay}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Add Day
            </button>
          </div>

          {/* Week and Day Navigation */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-semibold text-primary dark:text-gray-100">Weeks:</h3>
              {programData.weeks?.map((week, weekIndex) => (
                <button
                  key={weekIndex}
                  onClick={() => {
                    setSelectedWeek(weekIndex);
                    setSelectedDay(0);
                  }}
                  className={`px-2 py-0.5 text-xs rounded transition flex items-center gap-1 ${
                    selectedWeek === weekIndex
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-500'
                  }`}
                >
                  <span>W{week.week}</span>
                  {programData.weeks.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWeek(weekIndex);
                      }}
                      className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-[10px] flex items-center justify-center transition-colors"
                    >
                      ×
                    </button>
                  )}
                </button>
              ))}
            </div>
            
            {programData.weeks?.[selectedWeek] && (
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-primary dark:text-gray-100">Days:</h3>
                {programData.weeks[selectedWeek].days?.map((day, dayIndex) => (
                  <button
                    key={dayIndex}
                    onClick={() => setSelectedDay(dayIndex)}
                    className={`px-2 py-0.5 text-xs rounded transition flex items-center gap-1 ${
                      selectedDay === dayIndex
                        ? 'bg-accent text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-500'
                    }`}
                  >
                    <span>D{day.day}</span>
                    {programData.weeks[selectedWeek].days.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDay(dayIndex);
                        }}
                        className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 text-[10px] flex items-center justify-center transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current Week/Day Info */}
          {programData.weeks?.[selectedWeek] && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-neutral-700">
              <h4 className="font-semibold text-primary dark:text-gray-100 mb-2">
                Week {programData.weeks[selectedWeek].week}, Day {programData.weeks[selectedWeek].days?.[selectedDay]?.day}
              </h4>
              <p className="text-sm text-accent dark:text-gray-300">
                {currentExercises.length} exercises • {currentExercises.reduce((total, ex) => total + (ex.sets || 0), 0)} total sets
              </p>
            </div>
          )}

          {/* Exercise List */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-primary dark:text-gray-100">Exercises</h4>
              <button
                onClick={() => setShowExerciseModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add Exercise
              </button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="exercises">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {currentExercises.length === 0 ? (
                      <div className="text-center py-12 text-accent dark:text-gray-300">
                        <p className="text-lg mb-2">No exercises for this day</p>
                        <p className="text-sm">Click "Add Exercise" to get started</p>
                      </div>
                    ) : (
                      currentExercises.map((exercise, index) => (
                        <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm dark:bg-neutral-700 dark:border-neutral-600"
                            >
                              {/* Mobile Layout */}
                              <div className="lg:hidden space-y-3">
                                <div className="flex items-center gap-3">
                                  <span {...provided.dragHandleProps} className="cursor-move text-primary text-xl">☰</span>
                                  <input
                                    className="border-b-2 border-primary px-2 py-1 flex-1 text-accent font-semibold bg-transparent focus:outline-none dark:text-gray-100"
                                    value={exercise.name}
                                    onChange={e => handleChangeExercise(exercise.id, 'name', e.target.value)}
                                    placeholder="Exercise Name"
                                  />
                                  <button
                                    onClick={() => handleDeleteExercise(exercise.id)}
                                    className="text-red-600 hover:text-red-800 font-bold text-lg"
                                  >
                                    ✕
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs text-accent/70 mb-1 dark:text-gray-400">Sets</label>
                                    <input
                                      type="number"
                                      className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                      value={exercise.sets}
                                      min={1}
                                      onChange={e => handleChangeExercise(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-accent/70 mb-1 dark:text-gray-400">Reps</label>
                                    <input
                                      type="number"
                                      className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                      value={exercise.reps}
                                      min={1}
                                      onChange={e => handleChangeExercise(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs text-accent/70 mb-1 dark:text-gray-400">Notes</label>
                                  <input
                                    className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                    value={exercise.notes}
                                    onChange={e => handleChangeExercise(exercise.id, 'notes', e.target.value)}
                                    placeholder="Notes"
                                  />
                                </div>
                              </div>
                              
                              {/* Desktop Layout */}
                              <div className="hidden lg:flex items-center gap-4">
                                <span {...provided.dragHandleProps} className="cursor-move text-primary text-xl">☰</span>
                                <input
                                  className="border-b-2 border-primary px-2 py-1 mr-2 flex-1 text-accent font-semibold bg-transparent focus:outline-none dark:text-gray-100"
                                  value={exercise.name}
                                  onChange={e => handleChangeExercise(exercise.id, 'name', e.target.value)}
                                  placeholder="Exercise Name"
                                />
                                <input
                                  type="number"
                                  className="w-16 border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                  value={exercise.sets}
                                  min={1}
                                  onChange={e => handleChangeExercise(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                                  placeholder="Sets"
                                />
                                <input
                                  type="number"
                                  className="w-16 border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                  value={exercise.reps}
                                  min={1}
                                  onChange={e => handleChangeExercise(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                                  placeholder="Reps"
                                />
                                <input
                                  className="border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none dark:text-gray-100"
                                  value={exercise.notes}
                                  onChange={e => handleChangeExercise(exercise.id, 'notes', e.target.value)}
                                  placeholder="Notes"
                                />
                                <button
                                  onClick={() => handleDeleteExercise(exercise.id)}
                                  className="text-red-600 hover:text-red-800 font-bold text-lg ml-2"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Exercise Modal */}
        <ExerciseModal />
      </div>
    </div>
  );
}

export default ProgramEditor; 