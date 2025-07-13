<script lang="ts">
import { EXERCISE_DATA, DEFAULT_CONFIG } from '$lib/data/exercises';
import { ProgressiveOverloadService } from '$lib/services/progressiveOverload';
import { StorageService } from '$lib/services/storage';
import type { 
  Exercise, 
  ProgressiveOverloadConfig, 
  TargetCalculation,
  IntervalCalculation,
  StorageKeys 
} from '$lib/types';

// Initialize progressive overload service
const progressiveOverloadService = new ProgressiveOverloadService(DEFAULT_CONFIG);

// Reactive start date using Svelte 5 runes
let startDate = $state(StorageService.loadStartDate());

// Derived values using Svelte 5 runes
const startDateFormatted = $derived(startDate.toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}));

const daysSinceStart = $derived(progressiveOverloadService.calculateDaysSinceStart(startDate));
const targets = $derived(progressiveOverloadService.calculateTargets(daysSinceStart));

const currentRepetitionTarget = $derived(targets.repetitionTarget);
const currentTimeTargetMinutes = $derived(targets.timeMinutes);
const currentTimeTargetSeconds = $derived(targets.timeSeconds);
const daysUntilNextIncrease = $derived(targets.daysUntilNext);

// Function to update start date - now reactive with runes!
function updateStartDate(newDate: Date): void {
  StorageService.saveStartDate(newDate);
  startDate = newDate; // This triggers all derived values
}

// Generate exercises with computed values using runes
const exercises = $derived(EXERCISE_DATA.map(data => ({
  ...data,
  get value() { 
    if (data.name === 'Alternating single leg raises') {
      return `${currentRepetitionTarget * 2} reps`;
    }
    return data.type === 'repetition' 
      ? `${currentRepetitionTarget} reps`
      : progressiveOverloadService.formatTime(currentTimeTargetMinutes, currentTimeTargetSeconds);
  }
})));
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
        <p class="text-gray-200">Current target: {progressiveOverloadService.formatTime(currentTimeTargetMinutes, currentTimeTargetSeconds)}</p>
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
