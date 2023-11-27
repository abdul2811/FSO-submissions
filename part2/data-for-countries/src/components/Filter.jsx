const Filter = ({handleChange, countryName}) => {
    return (
      <form>
        <div>
          find countries <input value={countryName} onChange={handleChange} />
        </div>
      </form>
    )
}

export default Filter