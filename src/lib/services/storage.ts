import type { StorageKeys } from '$lib/types';

export class StorageService {
  private static readonly STORAGE_KEYS: StorageKeys = {
    START_DATE: 'workout-tracker-start-date'
  } as const;

  /**
   * Check if localStorage is available (client-side only)
   */
  private static isAvailable(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  /**
   * Save start date to localStorage
   */
  static saveStartDate(date: Date): void {
    if (this.isAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEYS.START_DATE, date.toISOString());
      } catch (error) {
        console.warn('Failed to save start date to localStorage:', error);
      }
    }
  }

  /**
   * Load start date from localStorage with fallback
   */
  static loadStartDate(fallbackDate: Date = new Date('2025-07-10')): Date {
    if (this.isAvailable()) {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEYS.START_DATE);
        if (saved) {
          const parsedDate = new Date(saved);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
          }
        }
      } catch (error) {
        console.warn('Failed to load start date from localStorage:', error);
      }
    }
    
    // Fallback to default date and save it
    this.saveStartDate(fallbackDate);
    return fallbackDate;
  }

  /**
   * Clear all stored data
   */
  static clearAll(): void {
    if (this.isAvailable()) {
      try {
        Object.values(this.STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      } catch (error) {
        console.warn('Failed to clear localStorage:', error);
      }
    }
  }

  /**
   * Get all storage keys
   */
  static getStorageKeys(): StorageKeys {
    return this.STORAGE_KEYS;
  }

  /**
   * Check if a specific key exists in storage
   */
  static hasKey(key: keyof StorageKeys): boolean {
    if (this.isAvailable()) {
      try {
        return localStorage.getItem(this.STORAGE_KEYS[key]) !== null;
      } catch (error) {
        console.warn('Failed to check storage key:', error);
        return false;
      }
    }
    return false;
  }
} 