import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const terms = ['Fall', 'Winter', 'Spring', 'Summer'] as const;

export const Course = z.object({
  term: z.enum(terms, {
    message: 'must be Fall, Winter, Spring, or Summer',
  }),

  number: z
    .string()
    .regex(/^\d+(-\d+)?$/, 'must be a number with optional section, e.g., 213-2'),

  title: z
    .string()
    .trim()
    .min(2, 'must be at least 2 characters'),

  meets: z
    .string()
    .trim()
    .regex(
      /^$|^[MTuWThF]+ \d{1,2}:\d{2}-\d{1,2}:\d{2}$/,
      'must contain days and start-end, e.g., MWF 12:00-13:20'
    ),
});

export type Course = z.infer<typeof Course>;

export const courseResolver = zodResolver(Course);