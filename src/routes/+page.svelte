<script lang="ts">
// TypeScript interfaces for type safety
interface Exercise {
  name: string;
  image: string;
  alt: string;
  type: 'repetition' | 'time';
  get value(): string;
}

interface ProgressiveOverloadConfig {
  repetitionBase: number;
  timeBaseMinutes: number;
  timeBaseSeconds: number;
  repetitionIncrease: number;
  timeIncrease: number;
  daysForIncrease: number;
}

interface TargetCalculation {
  repetitionTarget: number;
  timeMinutes: number;
  timeSeconds: number;
  daysUntilNext: number;
}

// Configuration object - centralize all settings
const CONFIG: ProgressiveOverloadConfig = {
  repetitionBase: 5,
  timeBaseMinutes: 1,
  timeBaseSeconds: 30,
  repetitionIncrease: 1,
  timeIncrease: 5,
  daysForIncrease: 5
};

// Local storage keys
const STORAGE_KEYS = {
  START_DATE: 'workout-tracker-start-date'
} as const;

// Local storage functions
function saveStartDate(date: Date): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.START_DATE, date.toISOString());
  }
}

function loadStartDate(): Date {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.START_DATE);
    if (saved) {
      return new Date(saved);
    }
  }
  // Fallback to default date
  const defaultDate = new Date('2025-07-10');
  saveStartDate(defaultDate); // Save for next time
  return defaultDate;
}

// Calculate how many complete intervals fit into days, and return the remainder
function calculateIntervalsAndRemainder(totalDays: number, intervalSize: number): { 
  completedIntervals: number; 
  remainingDays: number 
} {
  const completedIntervals = Math.floor(totalDays / intervalSize);
  const remainingDays = totalDays % intervalSize;
  
  return { completedIntervals, remainingDays };
}

// Load start date from localStorage or use default
const startDate = loadStartDate();
const startDateFormatted = startDate.toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

// Calculate days since start
const today = new Date();
const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

// Calculate current targets based on days since start
const intervalCalculation = calculateIntervalsAndRemainder(daysSinceStart, CONFIG.daysForIncrease);
const repetitionIncreases = intervalCalculation.completedIntervals * CONFIG.repetitionIncrease;
const timeIncreases = intervalCalculation.completedIntervals * CONFIG.timeIncrease;

const currentRepetitionTarget = CONFIG.repetitionBase + repetitionIncreases;
const currentTimeTargetMinutes = CONFIG.timeBaseMinutes + Math.floor(timeIncreases / 60);
const currentTimeTargetSeconds = CONFIG.timeBaseSeconds + (timeIncreases % 60);

// Calculate days until next increase
const daysUntilNextIncrease = intervalCalculation.remainingDays;

// Helper function to format time
function formatTime(minutes: number, seconds: number): string {
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update start date
function updateStartDate(newDate: Date): void {
  saveStartDate(newDate);
  // Reload the page to recalculate everything with new date
  window.location.reload();
}

// Exercise data structure
const EXERCISE_DATA: Omit<Exercise, 'value'>[] = [
  {
    name: 'Push-ups',
    image: '/assets/push-up.png',
    alt: 'Person doing push-ups',
    type: 'repetition'
  },
  {
    name: 'Plank',
    image: '/assets/plank.png',
    alt: 'Person doing plank',
    type: 'time'
  },
  {
    name: 'Plank sideway left',
    image: '/assets/plank-sideways-left.png',
    alt: 'Person doing side plank left',
    type: 'time'
  },
  {
    name: 'Plank sideway right',
    image: '/assets/plank-sideway-right.jpg',
    alt: 'Person doing side plank right',
    type: 'time'
  },
  {
    name: 'Wall sit',
    image: '/assets/wallsit.jpg',
    alt: 'Person doing wall sit',
    type: 'time'
  },
  {
    name: 'Leg raises',
    image: '/assets/legraise.jpg',
    alt: 'Person doing leg raises',
    type: 'repetition'
  },
  {
    name: 'Crunches',
    image: '/assets/crunch.jpg',
    alt: 'Person doing crunches',
    type: 'repetition'
  },
  {
    name: 'Crunches sideways left',
    image: '/assets/crunch-side.jpg',
    alt: 'Person doing side crunches left',
    type: 'repetition'
  },
  {
    name: 'Crunches sideways right',
    image: '/assets/crunch-side.jpg',
    alt: 'Person doing side crunches right',
    type: 'repetition'
  },
  {
    name: 'Alternating single leg raises',
    image: '/assets/alternating-leg-raises.jpg',
    alt: 'Person doing alternating single leg raises',
    type: 'repetition'
  }
];

// Generate exercises with computed values
const exercises: Exercise[] = EXERCISE_DATA.map(data => ({
  ...data,
  get value() { 
    if (data.name === 'Alternating single leg raises') {
      return `${currentRepetitionTarget * 2} reps`;
    }
    return data.type === 'repetition' 
      ? `${currentRepetitionTarget} reps`
      : formatTime(currentTimeTargetMinutes, currentTimeTargetSeconds);
  }
}));
</script>

<main class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-2">
  <h1 class="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
    Daily Workout Tracker
  </h1>
  <div class="text-center mb-8">
    <p class="text-gray-300 mb-4 text-lg">
      Started your fitness journey on: <span class="font-semibold text-blue-300">{startDateFormatted}</span>
    </p>
    <div class="flex items-center justify-center gap-2">
      <input 
        type="date" 
        value={startDate.toISOString().split('T')[0]}
        class="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white"
      />
      <button 
        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        on:click={() => {
          const input = document.querySelector('input[type="date"]') as HTMLInputElement;
          if (input && input.value) {
            updateStartDate(new Date(input.value));
          }
        }}
      >
        Update Start Date
      </button>
    </div>
  </div>
  
  <!-- Progress tracking info -->
  <div class="max-w-2xl mx-auto mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
    <h2 class="text-xl font-bold text-white mb-4 text-center">Progressive Overload Progress</h2>
    <div class="grid grid-cols-2 gap-4 text-center">
      <div>
        <p class="text-blue-300 font-semibold">Repetition Exercises</p>
        <p class="text-gray-200">Current target: {currentRepetitionTarget} reps</p>
      </div>
      <div>
        <p class="text-blue-300 font-semibold">Time Exercises</p>
        <p class="text-gray-200">Current target: {formatTime(currentTimeTargetMinutes, currentTimeTargetSeconds)}</p>
      </div>
    </div>
    <p class="text-center text-blue-300 mt-4 font-semibold">
      Next increase in: {daysUntilNextIncrease} days
    </p>
    <p class="text-center text-gray-400 mt-2">
      Day {daysSinceStart} of your fitness journey
    </p>
  </div>
  
  <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
    {#each exercises as exercise, i}
      <div class="rounded-3xl shadow-xl p-6 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl bg-gray-800 border border-gray-700 hover:border-blue-400">
        <img
          src={exercise.image}
          alt={exercise.alt}
          loading="lazy"
          class="h-32 bg-white object-cover object-center rounded-2xl mb-4 border-2 border-gray-600 shadow-md"
        />
        <h2 class="text-xl font-bold text-white mb-2 text-center">
          {exercise.name}
        </h2>
        <div class="text-center">
          <span class="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
            {exercise.value}
          </span>
        </div>
      </div>
    {/each}
  </div>
</main>
