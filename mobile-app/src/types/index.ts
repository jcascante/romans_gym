export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  notes: string;
  image?: string;
  video?: string;
  category?: string;
  type?: string;
  comments?: string;
}

export interface ExerciseSet {
  reps: string;
  weight: string;
  rpe: string;
  rir: string;
}

export interface ExerciseLog {
  name: string;
  targetSets: number;
  targetReps: number;
  completedSets: ExerciseSet[];
  notes: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  week: number;
  day: number;
  exercises: ExerciseLog[];
  totalSets: number;
  totalVolume: number;
}

export interface Day {
  day: number;
  exercises: Exercise[];
}

export interface Week {
  week: number;
  days: Day[];
}

export interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  exercises: Exercise[];
  focus?: string;
  duration?: string;
  gender?: string;
  type?: string;
  weeks?: Week[];
}

export interface MyProgram extends Template {
  // Additional properties for saved programs
  dateAdded?: string;
  lastModified?: string;
  status?: ProgramStatus;
  startDate?: string;
  progress?: number;
  isActive?: boolean;
  lastWorkout?: string;
  personalRecords?: Record<string, any>;
  workoutHistory?: WorkoutLog[];
}

export type ProgramStatus = 'New' | 'In Progress' | 'Completed' | 'Cancelled';

export interface FilterOptions {
  focus: string[];
  duration: string[];
  gender: string[];
  type: string[];
} 