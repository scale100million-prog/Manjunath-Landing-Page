export interface Transformation {
  id: string;
  name?: string;
  durationText?: string;
  labelBefore?: string;
  labelAfter?: string;
  imageBefore?: string;
  imageAfter?: string;
  weightBefore?: string;
  weightAfter?: string;
  type: 'three-stage' | 'before-after' | 'detailed';
  images?: string[]; // For three stage
  stages?: string[]; // March, February, January labels
  labelType?: 'before-after-red' | 'before-now-gold' | 'fat-to-fit' | 'weight-tag-yellow' | 'day1-day90-red';
}

export interface BookingDetails {
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  fitnessGoal: string;
  notes?: string;
}
