import type { IntervalCalculation, ProgressiveOverloadConfig, TargetCalculation } from '$lib/types';

export class ProgressiveOverloadService {
  constructor(private config: ProgressiveOverloadConfig) {}

  /**
   * Calculate how many complete intervals fit into days, and return the remainder
   */
  calculateIntervalsAndRemainder(totalDays: number, intervalSize: number): IntervalCalculation {
    let completedIntervals = 0;
    let currentTotalDays = totalDays;
    let currentIntervalSize = intervalSize;

    while (currentTotalDays >= currentIntervalSize) {
      currentTotalDays -= currentIntervalSize;
      currentIntervalSize += 1;
      completedIntervals += 1;
    }
  
    return { completedIntervals, remainingDays: currentIntervalSize - currentTotalDays };
  }

  /**
   * Calculate current targets based on days since start
   */
  calculateTargets(daysSinceStart: number): TargetCalculation {
    const intervalCalculation = this.calculateIntervalsAndRemainder(daysSinceStart, this.config.daysForIncrease);
    
    const repetitionIncreases = intervalCalculation.completedIntervals * this.config.repetitionIncrease;
    const timeIncreases = intervalCalculation.completedIntervals * this.config.timeIncrease;

    const repetitionTarget = this.config.repetitionBase + repetitionIncreases;
    const timeMinutes = this.config.timeBaseMinutes + Math.floor(timeIncreases / 60);
    const timeSeconds = this.config.timeBaseSeconds + (timeIncreases % 60);

    return {
      repetitionTarget,
      timeMinutes,
      timeSeconds,
      daysUntilNext: intervalCalculation.remainingDays
    };
  }

  /**
   * Calculate days since a given start date
   */
  calculateDaysSinceStart(startDate: Date): number {
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Format time as MM:SS
   */
  formatTime(minutes: number, seconds: number): string {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Get the current configuration
   */
  getConfig(): ProgressiveOverloadConfig {
    return this.config;
  }

  /**
   * Update the configuration
   */
  updateConfig(newConfig: ProgressiveOverloadConfig): void {
    this.config = newConfig;
  }
} 