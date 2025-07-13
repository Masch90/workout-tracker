// Exercise-related types
export interface Exercise {
  name: string;
  image: string;
  alt: string;
  type: 'repetition' | 'time';
  get value(): string;
}

export type ExerciseType = 'repetition' | 'time';

// Progressive overload configuration
export interface ProgressiveOverloadConfig {
  repetitionBase: number;
  timeBaseMinutes: number;
  timeBaseSeconds: number;
  repetitionIncrease: number;
  timeIncrease: number;
  daysForIncrease: number;
}

// Target calculation results
export interface TargetCalculation {
  repetitionTarget: number;
  timeMinutes: number;
  timeSeconds: number;
  daysUntilNext: number;
}

// Interval calculation results
export interface IntervalCalculation {
  completedIntervals: number;
  remainingDays: number;
}

// Storage-related types
export interface StorageKeys {
  START_DATE: string;
}

// Exercise data without computed values
export type ExerciseData = Omit<Exercise, 'value'>;

// Configuration for special exercise rules
export interface ExerciseSpecialRule {
  multiplier?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  customValue?: string;
} 