import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  useForm,
  type UseFormTrigger,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { courseResolver, type Course } from '../types/courses';

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

  if (!course) return <p className="p-6">Loading...</p>;

  return <CourseEditor course={course} onCancel={() => navigate({ to: '/' })} />;
}

function CourseEditor({
  course,
  onCancel,
}: {
  course: Course;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: course,
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    resolver: courseResolver,
  });

  const onSubmit: SubmitHandler<Course> = () => {};

  const onError: SubmitErrorHandler<Course> = () => {};

  return (
    <main className="min-h-screen bg-white p-6">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mx-auto max-w-xl rounded-2xl border p-6 shadow"
      >
        <h1 className="mb-6 text-3xl font-bold">Edit CS {course.number}</h1>

        <CourseField name="title" label="Title" errors={errors} register={register} trigger={trigger}/>
        <CourseField name="term" label="Term" errors={errors} register={register} trigger={trigger}/>
        <CourseField name="number" label="Course Number" errors={errors} register={register} trigger={trigger}/>
        <CourseField name="meets" label="Meeting Times" errors={errors} register={register} trigger={trigger}/>

        <button
          type="button"
          onClick={onCancel}
          className="mt-6 rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-800"
        >
          Cancel
        </button>
      </form>
    </main>
  );
}

type CourseFieldProps = {
  name: keyof Course;
  label: string;
  errors: any;
  register: any;
  trigger: UseFormTrigger<Course>;
};

function CourseField({ name, label, errors, register, trigger }: CourseFieldProps) {
  return (
    <label className="mb-4 block">
      <p className="mb-2 font-bold">
        {label}
        {errors[name] && (
          <span className="pl-2 text-sm italic text-red-500">
            {errors[name]?.message}
          </span>
        )}
      </p>

      <input
        {...register(name, {
          onChange: () => trigger(name),
        })}
        className={`w-full rounded border px-3 py-2 ${
          errors[name] ? 'border-red-500' : 'border-gray-400'
        }`}
      />
    </label>
  );
}