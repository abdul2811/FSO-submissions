const Course = ({course}) => {
    console.log(course)
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Content = ({course}) => {
    console.log(course)
    return (
      <div>
        {course.parts.map((partElem) => <Part part={partElem} key={partElem.id} />)}
      </div>
      )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({course}) => {
    return (
      <div><h4>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h4></div>
    )
  }
  

  export default Course