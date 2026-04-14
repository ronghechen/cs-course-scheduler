const schedule = {
  title: "CS Courses for 2018-2019",
  courses: {
    F101: {
      term: "Fall",
      number: "101",
      meets: "MWF 11:00–11:50",
      title: "Computer Science: Concepts, Philosophy, and Connections",
    },
    F110: {
      term: "Fall",
      number: "110",
      meets: "MWF 10:00–10:50",
      title: "Intro Programming for non-majors",
    },
    F111: {
      term: "Fall",
      number: "111",
      meets: "MWF 13:00–13:50",
      title: "Fundamentals of Computer Programming I",
    },
    F211: {
      term: "Fall",
      number: "211",
      meets: "MWF 12:30–13:50",
      title: "Fundamentals of Computer Programming II",
    },
  },
};

const App = () => (
  <main className="min-h-screen bg-white p-6">
    <h1 className="mb-8 text-4xl font-bold text-black">{schedule.title}</h1>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {Object.values(schedule.courses).map((course, index) => (
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
  </main>
);

export default App;