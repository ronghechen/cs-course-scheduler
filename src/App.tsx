import { useState, useEffect } from 'react';


const App = () => {

  const [schedule, setSchedule] = useState<any>(null);

  useEffect(() => {
    const fetchSchedule = async() => {
      const response = await fetch("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
      const data = await response.json();
      setSchedule(data);
    };
    fetchSchedule();
  }, []);
  if (!schedule) {
    return <p>Loading...</p>;
  }

  return (
  <main className="min-h-screen bg-white p-6">
    <h1 className="mb-8 text-4xl font-bold text-black">{schedule.title}</h1>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Object.values(schedule.courses).map((course: any, index) => (
        <div
          key={index}
          className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
        >
          <div>
            <h2 className="mb-8 text-3xl font-medium text-black">
              {course.term} CS {course.number}
            </h2>

            <p className="text-2xl leading-relaxed text-black">
              {course.title}
            </p>
          </div>

          <div>
            <hr className="mb-6 border-gray-300" />
            <p className="text-2xl text-black">{course.meets}</p>
          </div>
        </div>
      ))}
    </div>
  </main>);
};

export default App;