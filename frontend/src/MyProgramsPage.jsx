import React from 'react';

function MyProgramsPage({ myPrograms = [] }) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-extrabold text-primary mb-6">My Programs</h1>
      {myPrograms.length === 0 ? (
        <p className="text-accent text-lg mb-8 max-w-2xl text-center">
          You haven't added any programs yet. Browse templates and add your favorites here!
        </p>
      ) : (
        <ul className="w-full max-w-4xl bg-white rounded-xl shadow divide-y divide-accent">
          {myPrograms.map(program => (
            <li key={program.id} className="px-4 py-3">
              <div className="font-semibold text-primary text-base">{program.name}</div>
              <div className="text-accent text-sm">{program.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyProgramsPage; 