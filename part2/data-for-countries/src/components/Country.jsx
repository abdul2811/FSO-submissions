const Country = ({country, handleClick}) => {
    return (
        <div>
          {country.name.common} <button onClick={handleClick}>show</button>
        </div>
    )
}

export default Country