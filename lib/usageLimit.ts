export const DAILY_FREE_LIMIT = 5;

const STORAGE_KEY = 'vhs_daily_usage_v1';

export interface DailyUsageState {
  used: number;
  remaining: number;
  max: number;
  isLimitReached: boolean;
  resetsAt: string;
}

/**
 * Reads the current user's daily usage from browser LocalStorage.
 * Automatically resets when the local calendar date changes.
 */
export function getDailyUsage(): DailyUsageState {
  if (typeof window === 'undefined') {
    return {
      used: 0,
      remaining: DAILY_FREE_LIMIT,
      max: DAILY_FREE_LIMIT,
      isLimitReached: false,
      resetsAt: 'Midnight',
    };
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        used: 0,
        remaining: DAILY_FREE_LIMIT,
        max: DAILY_FREE_LIMIT,
        isLimitReached: false,
        resetsAt: 'Midnight',
      };
    }

    const parsed = JSON.parse(raw);

    // If day rolled over, reset counter for the new day
    if (parsed.date !== today) {
      const fresh = { date: today, count: 0 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return {
        used: 0,
        remaining: DAILY_FREE_LIMIT,
        max: DAILY_FREE_LIMIT,
        isLimitReached: false,
        resetsAt: 'Midnight',
      };
    }

    const used = Math.min(DAILY_FREE_LIMIT, Math.max(0, Number(parsed.count) || 0));
    const remaining = Math.max(0, DAILY_FREE_LIMIT - used);

    return {
      used,
      remaining,
      max: DAILY_FREE_LIMIT,
      isLimitReached: remaining <= 0,
      resetsAt: 'Midnight',
    };
  } catch {
    return {
      used: 0,
      remaining: DAILY_FREE_LIMIT,
      max: DAILY_FREE_LIMIT,
      isLimitReached: false,
      resetsAt: 'Midnight',
    };
  }
}

/**
 * Increments the user's daily usage count after a successful evaluation.
 */
export function incrementDailyUsage(): DailyUsageState {
  if (typeof window === 'undefined') {
    return getDailyUsage();
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const current = getDailyUsage();
    const newCount = current.used + 1;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: today, count: newCount })
    );

    return getDailyUsage();
  } catch {
    return getDailyUsage();
  }
}
