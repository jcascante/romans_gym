import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialExercises = [
  { id: '1', name: 'Squat', sets: 3, reps: 8, notes: '' },
  { id: '2', name: 'Bench Press', sets: 3, reps: 8, notes: '' },
  { id: '3', name: 'Deadlift', sets: 2, reps: 5, notes: '' },
];

const feedbackTips = [
  'Tip: Balance push and pull exercises.',
  "Tip: Don't forget to warm up!",
  'Tip: Adjust sets/reps to your level.',
];

function TemplateCustomizer({ templateName = 'Beginner Strength', category = 'Strength' }) {
  const [exercises, setExercises] = useState(initialExercises);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [tipIndex, setTipIndex] = useState(0);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(exercises);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setHistory([...history, exercises]);
    setFuture([]);
    setExercises(reordered);
  };

  const handleAdd = () => {
    const newExercise = { id: Date.now().toString(), name: '', sets: 3, reps: 8, notes: '' };
    setHistory([...history, exercises]);
    setFuture([]);
    setExercises([...exercises, newExercise]);
  };

  const handleDelete = (id) => {
    setHistory([...history, exercises]);
    setFuture([]);
    setExercises(exercises.filter(e => e.id !== id));
  };

  const handleChange = (id, field, value) => {
    setHistory([...history, exercises]);
    setFuture([]);
    setExercises(exercises.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setFuture([exercises, ...future]);
    setExercises(prev);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory([...history, exercises]);
    setFuture(future.slice(1));
    setExercises(next);
  };

  const nextTip = () => setTipIndex((tipIndex + 1) % feedbackTips.length);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-8 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mt-10">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-[#fff5f5] border-l-4 border-primary rounded-lg p-4 mb-4 lg:mb-0 flex flex-col items-center">
        <h3 className="text-primary font-bold mb-2">Feedback & Tips</h3>
        <div className="text-accent text-center mb-4">{feedbackTips[tipIndex]}</div>
        <button onClick={nextTip} className="bg-primary text-secondary px-4 py-1 rounded hover:bg-accent transition">Next Tip</button>
      </aside>
      {/* Main Customizer */}
      <div className="flex-1">
        <header className="mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-primary mb-1">{templateName}</h2>
          <div className="text-accent font-semibold">Category: {category}</div>
        </header>
        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={handleUndo} className="bg-accent text-secondary px-3 py-1 rounded hover:bg-primary transition disabled:opacity-50" disabled={history.length === 0}>Undo</button>
          <button onClick={handleRedo} className="bg-accent text-secondary px-3 py-1 rounded hover:bg-primary transition disabled:opacity-50" disabled={future.length === 0}>Redo</button>
          <button onClick={handleAdd} className="bg-primary text-secondary px-4 py-1 rounded hover:bg-accent transition">Add Exercise</button>
        </div>
        {/* Draggable Exercise List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="exercises">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {exercises.map((ex, idx) => (
                  <Draggable key={ex.id} draggableId={ex.id} index={idx}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} className="bg-white border border-primary rounded-lg p-4 shadow">
                        {/* Mobile Layout */}
                        <div className="lg:hidden space-y-3">
                          <div className="flex items-center gap-3">
                            <span {...provided.dragHandleProps} className="cursor-move text-primary text-xl">☰</span>
                            <input
                              className="border-b-2 border-primary px-2 py-1 flex-1 text-accent font-semibold bg-transparent focus:outline-none"
                              value={ex.name}
                              onChange={e => handleChange(ex.id, 'name', e.target.value)}
                              placeholder="Exercise Name"
                            />
                            <button onClick={() => handleDelete(ex.id)} className="text-red-600 hover:text-red-800 font-bold text-lg">✕</button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-accent/70 mb-1">Sets</label>
                              <input
                                type="number"
                                className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none"
                                value={ex.sets}
                                min={1}
                                onChange={e => handleChange(ex.id, 'sets', e.target.value)}
                                placeholder="Sets"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-accent/70 mb-1">Reps</label>
                              <input
                                type="number"
                                className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none"
                                value={ex.reps}
                                min={1}
                                onChange={e => handleChange(ex.id, 'reps', e.target.value)}
                                placeholder="Reps"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-accent/70 mb-1">Notes</label>
                            <input
                              className="w-full border-b-2 border-primary px-2 py-1 text-accent bg-transparent focus:outline-none"
                              value={ex.notes}
                              onChange={e => handleChange(ex.id, 'notes', e.target.value)}
                              placeholder="Notes"
                            />
                          </div>
                        </div>
                        
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex items-center gap-4">
                          <span {...provided.dragHandleProps} className="cursor-move text-primary text-xl">☰</span>
                          <input
                            className="border-b-2 border-primary px-2 py-1 mr-2 flex-1 text-accent font-semibold bg-transparent focus:outline-none"
                            value={ex.name}
                            onChange={e => handleChange(ex.id, 'name', e.target.value)}
                            placeholder="Exercise Name"
                          />
                          <input
                            type="number"
                            className="w-16 border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none"
                            value={ex.sets}
                            min={1}
                            onChange={e => handleChange(ex.id, 'sets', e.target.value)}
                            placeholder="Sets"
                          />
                          <input
                            type="number"
                            className="w-16 border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none"
                            value={ex.reps}
                            min={1}
                            onChange={e => handleChange(ex.id, 'reps', e.target.value)}
                            placeholder="Reps"
                          />
                          <input
                            className="border-b-2 border-primary px-2 py-1 mr-2 text-accent bg-transparent focus:outline-none"
                            value={ex.notes}
                            onChange={e => handleChange(ex.id, 'notes', e.target.value)}
                            placeholder="Notes"
                          />
                          <button onClick={() => handleDelete(ex.id)} className="text-red-600 hover:text-red-800 font-bold text-lg ml-2">✕</button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default TemplateCustomizer; 