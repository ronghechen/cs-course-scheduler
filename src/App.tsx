import { useState, useEffect } from 'react';

// Types
type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type CourseMap = Record<string, Course>;

type Schedule = {
  title: string;
  courses: CourseMap;
};

type CourseWithId = Course & {
  id: string;
};

// Term selector
const TermSelector = ({
  selection,
  setSelection,
}: {
  selection: string;
  setSelection: (term: string) => void;
}) => (
  <div className="mb-8 flex gap-4">
    {['Fall', 'Winter', 'Spring'].map((term) => (
      <button
        key={term}
        onClick={() => setSelection(term)}
        className={`rounded-full border-2 px-6 py-2 font-bold transition-colors ${
          selection === term
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-gray-300 bg-white text-black'
        }`}
      >
        {term}
      </button>
    ))}
  </div>
);

// Course list
const CourseList = ({
  courses,
  term,
  selectedCourses,
  toggleSelectedCourse,
}: {
  courses: CourseWithId[];
  term: string;
  selectedCourses: string[];
  toggleSelectedCourse: (courseId: string) => void;
}) => {
  const filteredCourses = courses.filter((course) => course.term === term);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {filteredCourses.map((course) => {
        const isSelected = selectedCourses.includes(course.id);

        return (
          <button
            key={course.id}
            onClick={() => toggleSelectedCourse(course.id)}
            className={`flex min-h-[320px] flex-col justify-between rounded-2xl border p-6 text-left shadow-sm transition ${
              isSelected
                ? 'border-blue-600 bg-blue-100 ring-2 ring-blue-400'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-3xl font-medium text-black">
                  {course.term} CS {course.number}
                </h2>
                {isSelected && (
                  <span className="text-2xl" aria-label="selected">
                    ✓
                  </span>
                )}
              </div>

              <p className="text-2xl leading-relaxed text-black">
                {course.title}
              </p>
            </div>

            <div>
              <hr className="mb-6 border-gray-300" />
              <p className="text-2xl text-black">{course.meets}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const App = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [term, setTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(
        'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
      );
      const data = await response.json();
      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  const toggleSelectedCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  if (!schedule) {
    return <p>Loading...</p>;
  }

  const courses: CourseWithId[] = Object.entries(schedule.courses).map(
    ([id, course]) => ({
      id,
      ...course,
    })
  );

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="mb-8 text-4xl font-bold text-black">{schedule.title}</h1>

      <TermSelector selection={term} setSelection={setTerm} />

      <CourseList
        courses={courses}
        term={term}
        selectedCourses={selectedCourses}
        toggleSelectedCourse={toggleSelectedCourse}
      />
    </main>
  );
};

export default App;