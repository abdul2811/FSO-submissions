import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phoneService from './services/phone'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filteredPersons = persons.filter(person => person.name && person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    const isNamePresent = persons.some(person => person.name === newName)
    const personObject = {name: newName, number: newNumber}
    if (isNamePresent){
      const shouldReplace = window.confirm(`${newName} is already added to phone book, replace the old number with a new one?`)
      if (shouldReplace) {
        const foundPerson = persons.find(person => person.name === newName)
        phoneService
        .update(foundPerson.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : response.data))
        })
      }
    }
    else{
      phoneService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setNewFilter(event.target.value)

  const handleDelete = (person, id)=> {
    const shouldDelete = window.confirm(`Delete ${person}`);
    if (shouldDelete){
      phoneService.deletion(id).then(
        setPersons(persons.filter(person => person.id !== id))
      )
    }
  }

  const hook = () => {
    console.log('effect')
    phoneService
      .getAll()
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
      <div>
        {filteredPersons.map(person =>
          <Persons key={person.id} persons={person} handleClick={() => handleDelete(person.name, person.id)} />
        )}
      </div>
    </div>
  )
}

export default App

