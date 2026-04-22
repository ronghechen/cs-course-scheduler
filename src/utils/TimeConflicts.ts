export type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

const dayPatterns = ['Tu', 'Th', 'M', 'W', 'F', 'Sa', 'Su'];

type MeetingInfo = {
  days: string[];
  start: number;
  end: number;
};

const hasMeeting = (meets: string) => meets.trim() !== '';

const parseDays = (meetingDays: string): string[] => {
  const days: string[] = [];
  let remaining = meetingDays;

  while (remaining.length > 0) {
    const day = dayPatterns.find((d) => remaining.startsWith(d));
    if (!day) 
    {
        break;
    }
    days.push(day);
    remaining = remaining.slice(day.length);
  }

  return days;
};

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const parseMeeting = (meets: string): MeetingInfo | null => {
  if (!hasMeeting(meets)) {
    return null;
  }

  const [daysPart, timePart] = meets.split(' ');
  const [start, end] = timePart.split('-');

  return {
    days: parseDays(daysPart),
    start: parseTime(start),
    end: parseTime(end),
  };
};

const haveCommonDays = (days1: string[], days2: string[]) =>
  days1.some((day) => days2.includes(day));

const timesOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => start1 < end2 && start2 < end1;

export const coursesConflict = (course1: Course, course2: Course): boolean => {
  if (course1.term !== course2.term) {
    return false;
  }
  if (!hasMeeting(course1.meets) || !hasMeeting(course2.meets)) {
    return false;
  }

  const meeting1 = parseMeeting(course1.meets);
  const meeting2 = parseMeeting(course2.meets);

  if (!meeting1 || !meeting2) 
  {
    return false;
  }
  if (!haveCommonDays(meeting1.days, meeting2.days)) {
    return false;
  }

  return timesOverlap(
    meeting1.start,
    meeting1.end,
    meeting2.start,
    meeting2.end
  );
};

export const courseConflictsWithSelected = (
  course: Course,
  selectedCourses: Course[]
): boolean => selectedCourses.some((selectedCourse) => coursesConflict(course, selectedCourse));