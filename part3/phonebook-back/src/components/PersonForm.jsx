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

  export default PersonForm