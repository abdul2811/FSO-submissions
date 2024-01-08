const Filter = ({handleChange, countryName}) => {
    return (
      <form>
        <div className="filter-container">
          <input className="filter" value={countryName} onChange={handleChange} />
        </div>
      </form>
    )
}

export default Filter