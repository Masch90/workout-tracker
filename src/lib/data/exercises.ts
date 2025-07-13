// Exercise data structure
export const EXERCISE_DATA = [
  {
    name: 'Push-ups',
    image: '/assets/push-up.png',
    alt: 'Person doing push-ups',
    type: 'repetition' as const
  },
  {
    name: 'Plank',
    image: '/assets/plank.png',
    alt: 'Person doing plank',
    type: 'time' as const
  },
  {
    name: 'Plank sideway left',
    image: '/assets/plank-sideways-left.png',
    alt: 'Person doing side plank left',
    type: 'time' as const
  },
  {
    name: 'Plank sideway right',
    image: '/assets/plank-sideway-right.jpg',
    alt: 'Person doing side plank right',
    type: 'time' as const
  },
  {
    name: 'Wall sit',
    image: '/assets/wallsit.jpg',
    alt: 'Person doing wall sit',
    type: 'time' as const
  },
  {
    name: 'Leg raises',
    image: '/assets/legraise.jpg',
    alt: 'Person doing leg raises',
    type: 'repetition' as const
  },
  {
    name: 'Crunches',
    image: '/assets/crunch.jpg',
    alt: 'Person doing crunches',
    type: 'repetition' as const
  },
  {
    name: 'Crunches sideways left',
    image: '/assets/crunch-side.jpg',
    alt: 'Person doing side crunches left',
    type: 'repetition' as const
  },
  {
    name: 'Crunches sideways right',
    image: '/assets/crunch-side.jpg',
    alt: 'Person doing side crunches right',
    type: 'repetition' as const
  },
  {
    name: 'Alternating single leg raises',
    image: '/assets/alternating-leg-raises.jpg',
    alt: 'Person doing alternating single leg raises',
    type: 'repetition' as const
  }
] as const;

// Default configuration
export const DEFAULT_CONFIG = {
  repetitionBase: 5,
  timeBaseMinutes: 1,
  timeBaseSeconds: 30,
  repetitionIncrease: 1,
  timeIncrease: 5,
  daysForIncrease: 5
} as const; 