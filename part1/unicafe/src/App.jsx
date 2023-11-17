import { useState } from 'react'

const Statistics = ({good, neutral, bad, all}) => {
  if (all !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <tr><td>all</td><td>{all}</td></tr>
              <tr><td>average</td><td>{(good-bad)/all}</td></tr>
              <tr><td>positive</td><td>{(good/all)*100}%</td></tr>
            </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>Nothing to see here</p>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, allClicks] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    allClicks(all+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    allClicks(all+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    allClicks(all+1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App