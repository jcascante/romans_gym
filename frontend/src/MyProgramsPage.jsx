import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import ProgramEditor from './ProgramEditor';
import ProgressLogger from './ProgressLogger';

// Program status options
const PROGRAM_STATUSES = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

// Status colors for visual indicators
const STATUS_COLORS = {
  [PROGRAM_STATUSES.NEW]: 'bg-blue-500',
  [PROGRAM_STATUSES.IN_PROGRESS]: 'bg-green-500',
  [PROGRAM_STATUSES.COMPLETED]: 'bg-purple-500',
  [PROGRAM_STATUSES.CANCELLED]: 'bg-red-500'
};

// Progress colors based on completion percentage
const getProgressColor = (percentage) => {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-yellow-500';
  if (percentage >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

function MyProgramsPage({ myPrograms = [] }) {
  const [programs, setPrograms] = useState(myPrograms.map(program => ({
    ...program,
    status: PROGRAM_STATUSES.NEW,
    startDate: null,
    progress: 0,
    isActive: false,
    lastWorkout: null,
    personalRecords: {},
    // Ensure programs have the correct week/day structure
    weeks: program.weeks || [{
      week: 1,
      days: [{
        day: 1,
        exercises: program.exercises || []
      }]
    }],
    workoutHistory: program.workoutHistory || []
  })));
  
  const [expandedId, setExpandedId] = useState(null);
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [showProgramEditor, setShowProgramEditor] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [showProgressLogger, setShowProgressLogger] = useState(false);
  const [loggingProgram, setLoggingProgram] = useState(null);

  // Ensure only one program is active at a time
  useEffect(() => {
    const activeCount = programs.filter(p => p.isActive).length;
    if (activeCount > 1) {
      console.warn('Multiple active programs detected, this should not happen');
    }
  }, [programs]);

  // Update programs when myPrograms prop changes
  useEffect(() => {
    setPrograms(myPrograms.map(program => ({
      ...program,
      status: PROGRAM_STATUSES.NEW,
      startDate: null,
      progress: 0,
      isActive: false,
      lastWorkout: null,
      personalRecords: {},
      // Ensure programs have the correct week/day structure
      weeks: program.weeks || [{
        week: 1,
        days: [{
          day: 1,
          exercises: program.exercises || []
        }]
      }]
    })));
  }, [myPrograms]);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleActivateProgram = (programId) => {
    setSelectedProgramId(programId);
    setShowStartDateModal(true);
  };

  const confirmActivateProgram = () => {
    if (!startDate) return;

    setPrograms(prev => prev.map(program => ({
      ...program,
      isActive: program.id === selectedProgramId,
      status: program.id === selectedProgramId ? PROGRAM_STATUSES.IN_PROGRESS : 
              program.status === PROGRAM_STATUSES.IN_PROGRESS ? PROGRAM_STATUSES.NEW : program.status,
      startDate: program.id === selectedProgramId ? startDate : program.startDate
    })));

    setShowStartDateModal(false);
    setSelectedProgramId(null);
    setStartDate('');
  };

  const updateProgramStatus = (programId, newStatus) => {
    setPrograms(prev => prev.map(program => {
      if (program.id === programId) {
        return {
          ...program,
          status: newStatus,
          isActive: newStatus === PROGRAM_STATUSES.IN_PROGRESS ? true : 
                   program.isActive && newStatus !== PROGRAM_STATUSES.IN_PROGRESS ? false : program.isActive
        };
      }
      // If setting a program to IN_PROGRESS, deactivate others
      if (newStatus === PROGRAM_STATUSES.IN_PROGRESS && program.isActive) {
        return { ...program, isActive: false, status: PROGRAM_STATUSES.NEW };
      }
      return program;
    }));
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setShowProgramEditor(true);
  };

  const handleSaveProgram = (updatedProgram) => {
    setPrograms(prev => prev.map(program => 
      program.id === updatedProgram.id ? updatedProgram : program
    ));
    setShowProgramEditor(false);
    setEditingProgram(null);
  };

  const handleCancelEdit = () => {
    setShowProgramEditor(false);
    setEditingProgram(null);
  };

  const handleLogProgress = (program) => {
    setLoggingProgram(program);
    setShowProgressLogger(true);
  };

  const handleSaveProgress = (workoutLog) => {
    setPrograms(prev => prev.map(program => {
      if (program.id === loggingProgram.id) {
        return {
          ...program,
          workoutHistory: [...(program.workoutHistory || []), workoutLog],
          lastWorkout: workoutLog.date,
          progress: calculateProgressFromHistory([...(program.workoutHistory || []), workoutLog])
        };
      }
      return program;
    }));
    setShowProgressLogger(false);
    setLoggingProgram(null);
  };

  const handleCancelProgress = () => {
    setShowProgressLogger(false);
    setLoggingProgram(null);
  };

  const calculateProgressFromHistory = (workoutHistory) => {
    if (!workoutHistory || workoutHistory.length === 0) return 0;
    
    // Calculate progress based on completed workouts vs total program duration
    const totalWorkouts = workoutHistory.reduce((total, workout) => {
      return total + workout.exercises.reduce((exTotal, exercise) => {
        return exTotal + exercise.completedSets.length;
      }, 0);
    }, 0);
    
    // This is a simplified calculation - in a real app you'd have more sophisticated logic
    return Math.min(100, Math.round((totalWorkouts / 50) * 100)); // Assuming 50 total sets = 100% progress
  };

  const calculateProgress = (program) => {
    // Calculate progress from workout history if available, otherwise use stored progress
    if (program.workoutHistory && program.workoutHistory.length > 0) {
      return calculateProgressFromHistory(program.workoutHistory);
    }
    return program.progress || 0;
  };

  const getActiveFiltersCount = () => {
    return 0; // We'll add filters later
  };

  const clearAllFilters = () => {
    // We'll implement filters later
  };

  const FilterDropdown = ({ type, label, options, selectedValues }) => {
    return (
      <div className="relative" data-dropdown>
        <button
          className="w-full px-3 py-2 text-left bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-600"
          onClick={() => {/* We'll implement dropdown logic later */}}
        >
          <span className="block truncate">
            {selectedValues.length === 0 ? label : `${label} (${selectedValues.length})`}
          </span>
        </button>
      </div>
    );
  };

  const StartDateModal = ({ open, onClose, onConfirm, programName }) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 dark:bg-neutral-800" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-semibold text-primary mb-4 dark:text-gray-100">
            Activate Program
          </h3>
          <p className="text-accent mb-4 dark:text-gray-300">
            Set a start date for "{programName}" to begin tracking your progress.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-accent border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!startDate}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Activate
            </button>
          </div>
        </div>
      </div>
    );
  };

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

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
                Personal Programs
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-3 dark:text-gray-100">
                My Programs
              </h1>
              <p className="text-accent text-base sm:text-lg leading-relaxed max-w-2xl dark:text-gray-300">
                Manage your workout programs, track progress, and achieve your fitness goals.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-col gap-2">
                <span className="bg-primary text-secondary text-sm px-4 py-2 rounded-full font-semibold dark:bg-neutral-700 dark:text-gray-100">
                  {programs.length} Programs
                </span>
                <span className="bg-accent text-secondary text-sm px-4 py-2 rounded-full font-semibold dark:bg-neutral-600 dark:text-gray-100">
                  {programs.filter(p => p.isActive).length} Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Program Highlight Section */}
      {programs.filter(p => p.isActive).length > 0 && (
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl border border-green-200 p-6 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Active Program: {programs.find(p => p.isActive)?.name}
                  </h3>
                  <p className="text-green-100 text-sm">
                    Started on {programs.find(p => p.isActive)?.startDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-2xl">
                  {calculateProgress(programs.find(p => p.isActive))}%
                </div>
                <div className="text-green-100 text-sm">Progress</div>
              </div>
            </div>
            <div className="mt-4 w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(calculateProgress(programs.find(p => p.isActive)))}`}
                style={{ width: `${calculateProgress(programs.find(p => p.isActive))}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

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
              type="status"
              label="Status"
              options={Object.values(PROGRAM_STATUSES)}
              selectedValues={[]}
            />
            <FilterDropdown
              type="focus"
              label="Focus Area"
              options={['Upper Body', 'Whole Body', 'Glutes & Abs', 'Chest & Triceps', 'Back & Biceps']}
              selectedValues={[]}
            />
            <FilterDropdown
              type="duration"
              label="Duration"
              options={['5/WEEK', '6/WEEK']}
              selectedValues={[]}
            />
            <FilterDropdown
              type="type"
              label="Workout Type"
              options={['Strength', 'Hypertrophy', 'Conditioning', 'Rehab']}
              selectedValues={[]}
            />
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700">
        {programs.length === 0 ? (
          <div className="text-accent text-center py-12 dark:text-gray-100">
            You haven't added any programs yet. Browse templates and add your favorites here!
          </div>
        ) : (
          <div className="divide-y divide-accent/20 dark:divide-neutral-700">
            {programs.map(program => (
              <div
                key={program.id}
                className={`cursor-pointer transition-all duration-200 ${
                  expandedId === program.id ? 'bg-secondary/10 dark:bg-neutral-700/40' : 
                  program.isActive ? 'bg-green-50 dark:bg-green-900/20' : 'hover:bg-accent/5 dark:hover:bg-neutral-700/30'
                }`}
                onClick={() => handleExpand(program.id)}
              >
                {/* Program Header */}
                <div className="px-4 sm:px-6 py-3">
                  <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="w-8 h-8 rounded bg-secondary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="uppercase text-xs text-accent font-semibold tracking-widest dark:text-gray-300">
                          {program.focus}
                        </div>
                        {program.isActive && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-primary text-lg leading-tight dark:text-gray-300">
                        {program.name}
                      </div>
                      <div className="mt-2 text-accent text-sm leading-relaxed dark:text-gray-100">
                        {program.description}
                      </div>
                      {program.startDate && (
                        <div className="mt-1 text-xs text-accent/70 dark:text-gray-400">
                          Started: {program.startDate}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <div className="flex gap-2">
                        <span className="bg-primary text-secondary text-xs px-3 py-1 rounded-full font-medium">
                          {program.duration}
                        </span>
                        <span className="bg-accent text-secondary text-xs px-3 py-1 rounded-full font-medium">
                          {program.gender}
                        </span>
                        <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-medium dark:bg-gray-400 dark:text-neutral-900">
                          {program.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${STATUS_COLORS[program.status]}`}></span>
                        <span className="text-xs text-accent dark:text-gray-300">{program.status}</span>
                      </div>
                      {program.isActive && (
                        <div className="text-right">
                          <div className="text-xs font-medium text-green-600 dark:text-green-400">
                            {calculateProgress(program)}% Complete
                          </div>
                          <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                            <div 
                              className={`h-1 rounded-full ${getProgressColor(calculateProgress(program))}`}
                              style={{ width: `${calculateProgress(program)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === program.id && (
                  <div className="px-6 pb-6 text-accent text-sm border-t border-accent/20 dark:text-gray-100 dark:border-neutral-700" onClick={e => e.stopPropagation()}>
                    <div className="pt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {!program.isActive && program.status === PROGRAM_STATUSES.NEW && (
                          <button
                            onClick={() => handleActivateProgram(program.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                          >
                            Activate Program
                          </button>
                        )}
                        <select
                          value={program.status}
                          onChange={(e) => updateProgramStatus(program.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                        >
                          {Object.values(PROGRAM_STATUSES).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                                                 <button 
                           onClick={() => handleEditProgram(program)}
                           className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                         >
                           Edit Program
                         </button>
                                                 <button 
                           onClick={() => handleLogProgress(program)}
                           className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                         >
                           Log Progress
                         </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                 {/* Program Details */}
                         <div className="bg-accent/5 rounded-lg p-4 dark:bg-neutral-900">
                           <h4 className="font-bold text-lg text-accent mb-3 dark:text-gray-100 border-b border-accent/20 pb-2">Program Details</h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Status:</span> {program.status}</div>
                            <div><span className="font-medium">Start Date:</span> {program.startDate || 'Not started'}</div>
                            <div><span className="font-medium">Progress:</span> {calculateProgress(program)}%</div>
                            <div><span className="font-medium">Last Workout:</span> {program.lastWorkout || 'No workouts logged'}</div>
                          </div>
                        </div>

                                                 {/* Personal Records */}
                         <div className="bg-accent/5 rounded-lg p-4 dark:bg-neutral-900">
                           <h4 className="font-bold text-lg text-accent mb-3 dark:text-gray-100 border-b border-accent/20 pb-2">Personal Records</h4>
                          {Object.keys(program.personalRecords).length === 0 ? (
                            <p className="text-sm text-accent/70 dark:text-gray-400">No PRs set yet</p>
                          ) : (
                            <div className="space-y-2 text-sm">
                              {Object.entries(program.personalRecords).map(([exercise, record]) => (
                                <div key={exercise} className="flex justify-between">
                                  <span>{exercise}</span>
                                  <span className="font-medium">{record.weight}kg x {record.reps}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

             {/* Start Date Modal */}
       <StartDateModal
         open={showStartDateModal}
         onClose={() => setShowStartDateModal(false)}
         onConfirm={confirmActivateProgram}
         programName={selectedProgram?.name}
       />

       {/* Program Editor Modal */}
       {showProgramEditor && editingProgram && (
         <ProgramEditor
           program={editingProgram}
           onSave={handleSaveProgram}
           onCancel={handleCancelEdit}
         />
       )}

       {/* Progress Logger Modal */}
       {showProgressLogger && loggingProgram && (
         <ProgressLogger
           program={loggingProgram}
           onSave={handleSaveProgress}
           onCancel={handleCancelProgress}
         />
       )}
     </section>
   );
 }

export default MyProgramsPage; 