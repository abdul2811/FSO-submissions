import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleChange}) => {
  return (
    <form>
      <div>
        filter shown with <input onChange={handleChange} />
      </div>
    </form>
  )
}

const PersonForm = ({handleNameChange, handleNumberChange, add, nameVal, numVal}) => {
  return (
    <form onSubmit={add}>
      <FormFields label="name: " value={nameVal} handleChange={handleNameChange}/>
      <FormFields label="number: " value={numVal} handleChange={handleNumberChange} />
      <div><button type="submit">add</button></div>
    </form>
  )
}


const FormFields = ({label, value, handleChange}) => {
  return (
    <div>{label} <input value={value} onChange={handleChange} /></div>
  )
}

const Persons = ({filtered}) => {
  return (
    filtered.map((person, i) => <p key={i}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    const isNamePresent = persons.some(person => person.name === newName)
    if (isNamePresent){
      alert(`${newName} is already added to phone book`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setNewFilter(event.target.value)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm add={addName} nameVal={newName} numVal={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filtered={filteredPersons} />
    </div>
  )
}

export default App
