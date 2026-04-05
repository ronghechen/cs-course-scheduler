const schedule = {
  title: "CS Courses for 2018-2019",
  courses: [
    "Fall CS 101: Computer Science: Concepts, Philosophy",
    "Fall CS 110: Intro Programming for non-majors",
    "Fall CS 111: Fundamentals of Computer Programming I",
    "Winter CS 111: Fundamentals of Computer Programming I",
    "Fall CS 211: Fundamentals of Computer Programming II"
  ]
};

const App = () => (
  <div>
    <h1>{schedule.title}</h1>
    <div className="card-container">
      {schedule.courses.map((course, index) => (
        <li key={index}>{course}</li>
      ))}
    </div>
  </div>
);

export default App;