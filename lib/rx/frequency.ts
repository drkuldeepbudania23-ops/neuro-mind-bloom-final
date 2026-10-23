/**
 * Prescription frequency → default timing.
 * Choosing TDS / 8 hourly etc. fills a matching timing so the PDF never says
 * "TDS - Night". The doctor can still change the timing afterwards.
 */
export const FREQUENCY_OPTIONS = [
  "OD", "BD", "TDS", "QID", "8 hourly", "12 hourly", "6 hourly", "HS", "SOS", "STAT",
  "1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-1", "1/2-0-1/2", "0-0-1/2",
] as const;

export const TIMING_OPTIONS = [
  "Morning", "Afternoon", "Evening", "Night",
  "Morning & Night",
  "Morning, Afternoon & Night",
  "Morning, Afternoon, Evening & Night",
  "Every 6 hours",
  "Every 8 hours",
  "Every 12 hours",
  "As required",
  "Immediately",
] as const;

const DEFAULT_TIMING: Record<string, string> = {
  "OD": "Morning",
  "BD": "Morning & Night",
  "TDS": "Morning, Afternoon & Night",
  "QID": "Morning, Afternoon, Evening & Night",
  "8 hourly": "Every 8 hours",
  "12 hourly": "Every 12 hours",
  "6 hourly": "Every 6 hours",
  "HS": "Night",
  "SOS": "As required",
  "STAT": "Immediately",
  "1-0-0": "Morning",
  "0-1-0": "Afternoon",
  "0-0-1": "Night",
  "1-0-1": "Morning & Night",
  "1-1-1": "Morning, Afternoon & Night",
  "1/2-0-1/2": "Morning & Night",
  "0-0-1/2": "Night",
};

/** Timing that matches a frequency, or "" when there is no obvious default (keep the doctor's choice). */
export function timingForFrequency(frequency: string): string {
  return DEFAULT_TIMING[frequency.trim()] || "";
}
