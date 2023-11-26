const Persons = ({persons, handleClick}) => {
  return (
    <div >
      {persons.name} {persons.number}  
      <button onClick={handleClick}>delete</button>
    </div>
   )
}

export default Persons