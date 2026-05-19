import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Schedule = {
  title: string;
  courses: Record<string, Course>;
};

export const Route = createFileRoute('/courses/$courseId/edit')({
  component: CourseForm,
});

function CourseForm() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(
        'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
      );
      const data: Schedule = await response.json();
      setCourse(data.courses[courseId]);
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-xl rounded-2xl border p-6 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">
          Edit CS {course.number}
        </h1>

        <label className="mb-4 block">
          <span className="mb-2 block font-bold">Title</span>
          <input
            type="text"
            defaultValue={course.title}
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-2 block font-bold">Meeting Times</span>
          <input
            type="text"
            defaultValue={course.meets}
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <button
          type="button"
          onClick={() => navigate({ to: '/' })}
          className="rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-800"
        >
          Cancel
        </button>
      </form>
    </main>
  );
}