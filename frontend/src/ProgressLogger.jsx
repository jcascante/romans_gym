import React, { useState } from 'react';

function ProgressLogger({ program, onSave, onCancel }) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [exerciseLogs, setExerciseLogs] = useState({});
  const [useRIR, setUseRIR] = useState(false); // Toggle between RPE and RIR

  // Get current exercises for the selected week and day
  const getCurrentExercises = () => {
    if (!program.weeks || !program.weeks[selectedWeek]) return [];
    if (!program.weeks[selectedWeek].days || !program.weeks[selectedWeek].days[selectedDay]) return [];
    return program.weeks[selectedWeek].days[selectedDay].exercises || [];
  };

  const currentExercises = getCurrentExercises();

  // Initialize exercise logs when exercises change
  React.useEffect(() => {
    const newLogs = {};
    currentExercises.forEach(exercise => {
      if (!exerciseLogs[exercise.id]) {
        // Initialize with the suggested number of sets
        const initialSets = [];
        for (let i = 0; i < exercise.sets; i++) {
          initialSets.push({
            reps: exercise.reps.toString(),
            weight: '',
            rpe: '',
            rir: ''
          });
        }
        
        newLogs[exercise.id] = {
          name: exercise.name,
          targetSets: exercise.sets,
          targetReps: exercise.reps,
          completedSets: initialSets,
          notes: ''
        };
      } else {
        newLogs[exercise.id] = exerciseLogs[exercise.id];
      }
    });
    setExerciseLogs(newLogs);
  }, [currentExercises]);

  const handleAddSet = (exerciseId) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completedSets: [
          ...prev[exerciseId].completedSets,
          { reps: '', weight: '', rpe: '', rir: '' }
        ]
      }
    }));
  };

  const handleRemoveSet = (exerciseId, setIndex) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completedSets: prev[exerciseId].completedSets.filter((_, index) => index !== setIndex)
      }
    }));
  };

  const handleUpdateSet = (exerciseId, setIndex, field, value) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        completedSets: prev[exerciseId].completedSets.map((set, index) => 
          index === setIndex ? { ...set, [field]: value } : set
        )
      }
    }));
  };

  const handleUpdateNotes = (exerciseId, notes) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        notes
      }
    }));
  };

  const toggleRIR = () => {
    setUseRIR(!useRIR);
    // Clear RPE/RIR values when switching
    setExerciseLogs(prev => {
      const updated = {};
      Object.keys(prev).forEach(exerciseId => {
        updated[exerciseId] = {
          ...prev[exerciseId],
          completedSets: prev[exerciseId].completedSets.map(set => ({
            ...set,
            rpe: useRIR ? set.rpe : '',
            rir: useRIR ? '' : set.rir
          }))
        };
      });
      return updated;
    });
  };

  const handleSave = () => {
    const workoutLog = {
      id: Date.now().toString(),
      date: workoutDate,
      week: selectedWeek + 1,
      day: selectedDay + 1,
      exercises: Object.values(exerciseLogs),
      totalSets: Object.values(exerciseLogs).reduce((total, ex) => total + ex.completedSets.length, 0),
      totalVolume: Object.values(exerciseLogs).reduce((total, ex) => {
        return total + ex.completedSets.reduce((setTotal, set) => {
          const reps = parseInt(set.reps) || 0;
          const weight = parseFloat(set.weight) || 0;
          return setTotal + (reps * weight);
        }, 0);
      }, 0)
    };

    onSave(workoutLog);
  };

  const getCompletedSetsCount = (exerciseId) => {
    return exerciseLogs[exerciseId]?.completedSets?.length || 0;
  };

  const getTargetSetsCount = (exerciseId) => {
    return exerciseLogs[exerciseId]?.targetSets || 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden dark:bg-neutral-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-gray-100">Log Workout Progress</h2>
              <p className="text-accent dark:text-gray-300">Track your performance for {program.name}</p>
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
                Save Workout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Workout Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">Workout Date</label>
                <input
                  type="date"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">Week</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => {
                    setSelectedWeek(parseInt(e.target.value));
                    setSelectedDay(0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                >
                  {program.weeks?.map((week, index) => (
                    <option key={index} value={index}>Week {week.week}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">Day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                >
                  {program.weeks?.[selectedWeek]?.days?.map((day, index) => (
                    <option key={index} value={index}>Day {day.day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">Intensity Measure</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleRIR}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      useRIR 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-500'
                    }`}
                  >
                    RIR
                  </button>
                  <button
                    onClick={toggleRIR}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !useRIR 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-500'
                    }`}
                  >
                    RPE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Logging */}
          <div className="space-y-6">
            {currentExercises.length === 0 ? (
              <div className="text-center py-12 text-accent dark:text-gray-300">
                <p className="text-lg mb-2">No exercises for this day</p>
                <p className="text-sm">Select a different week or day</p>
              </div>
            ) : (
              currentExercises.map((exercise) => (
                <div key={exercise.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm dark:bg-neutral-700 dark:border-neutral-600">
                                     {/* Exercise Header */}
                   <div className="flex justify-between items-center mb-4">
                     <div>
                       <h3 className="font-semibold text-primary dark:text-gray-100">{exercise.name}</h3>
                       <div className="flex items-center gap-2">
                         <p className="text-sm text-accent dark:text-gray-300">
                           Target: {getTargetSetsCount(exercise.id)} sets × 
                         </p>
                         <input
                           type="number"
                           value={exerciseLogs[exercise.id]?.targetReps || exercise.reps}
                           onChange={(e) => {
                             const newTargetReps = parseInt(e.target.value) || 0;
                             setExerciseLogs(prev => ({
                               ...prev,
                               [exercise.id]: {
                                 ...prev[exercise.id],
                                 targetReps: newTargetReps,
                                 completedSets: prev[exercise.id].completedSets.map(set => ({
                                   ...set,
                                   reps: set.reps === exerciseLogs[exercise.id]?.targetReps?.toString() ? newTargetReps.toString() : set.reps
                                 }))
                               }
                             }));
                           }}
                           className="w-12 px-1 py-0.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                         />
                         <span className="text-sm text-accent dark:text-gray-300">reps</span>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-sm text-accent dark:text-gray-300">
                         {getCompletedSetsCount(exercise.id)} sets
                       </span>
                       <button
                         onClick={() => handleAddSet(exercise.id)}
                         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                       >
                         Add Set
                       </button>
                     </div>
                   </div>

                                     {/* Completed Sets */}
                   {exerciseLogs[exercise.id]?.completedSets?.length > 0 && (
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-accent mb-2 dark:text-gray-300">
                         Sets ({exerciseLogs[exercise.id].completedSets.length} total)
                       </h4>
                      <div className="space-y-2">
                        {exerciseLogs[exercise.id].completedSets.map((set, setIndex) => (
                          <div key={setIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded dark:bg-neutral-600">
                            <span className="text-sm font-medium text-accent dark:text-gray-300 w-8">#{setIndex + 1}</span>
                            <input
                              type="number"
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) => handleUpdateSet(exercise.id, setIndex, 'reps', e.target.value)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                            />
                            <span className="text-sm text-accent dark:text-gray-300">×</span>
                            <input
                              type="number"
                              placeholder="Weight (kg)"
                              value={set.weight}
                              onChange={(e) => handleUpdateSet(exercise.id, setIndex, 'weight', e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                            />
                            <span className="text-sm text-accent dark:text-gray-300">kg</span>
                            <input
                              type="number"
                              placeholder={useRIR ? "RIR" : "RPE"}
                              value={useRIR ? set.rir : set.rpe}
                              onChange={(e) => handleUpdateSet(exercise.id, setIndex, useRIR ? 'rir' : 'rpe', e.target.value)}
                              className="w-12 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                              min={useRIR ? "0" : "1"}
                              max={useRIR ? "5" : "10"}
                            />
                            <span className="text-sm text-accent dark:text-gray-300">{useRIR ? "RIR" : "RPE"}</span>
                            <button
                              onClick={() => handleRemoveSet(exercise.id, setIndex)}
                              className="ml-auto text-red-500 hover:text-red-700 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-accent mb-2 dark:text-gray-300">Notes</label>
                    <textarea
                      value={exerciseLogs[exercise.id]?.notes || ''}
                      onChange={(e) => handleUpdateNotes(exercise.id, e.target.value)}
                      placeholder="Add notes about this exercise..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-100"
                      rows="2"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          {currentExercises.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
              <h4 className="font-semibold text-primary mb-2 dark:text-gray-100">Workout Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-accent dark:text-gray-300">Total Sets: </span>
                  <span className="font-medium text-primary dark:text-gray-100">
                    {Object.values(exerciseLogs).reduce((total, ex) => total + ex.completedSets.length, 0)}
                  </span>
                </div>
                <div>
                  <span className="text-accent dark:text-gray-300">Total Volume: </span>
                  <span className="font-medium text-primary dark:text-gray-100">
                    {Object.values(exerciseLogs).reduce((total, ex) => {
                      return total + ex.completedSets.reduce((setTotal, set) => {
                        const reps = parseInt(set.reps) || 0;
                        const weight = parseFloat(set.weight) || 0;
                        return setTotal + (reps * weight);
                      }, 0);
                    }, 0).toFixed(1)} kg
                  </span>
                </div>
                <div>
                  <span className="text-accent dark:text-gray-300">Exercises: </span>
                  <span className="font-medium text-primary dark:text-gray-100">
                    {currentExercises.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressLogger; 