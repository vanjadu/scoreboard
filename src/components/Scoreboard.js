import React, { useState } from 'react'

const Scoreboard = () => {
  const [games, setGames] = useState([])
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')

  const startGame = () => {
    setGames(
      games.concat({
        home: homeTeam,
        away: awayTeam,
        homeScore: 0,
        awayScore: 0,
      })
    )
    setHomeTeam('')
    setAwayTeam('')
  }

  const finishGame = (game) => {
    setGames(games.filter((g) => g !== game))
  }

  const updateScore = (game, homeScore, awayScore) => {
    setGames(
      games.map((g) => {
        if (g !== game) return g
        return { ...g, homeScore, awayScore }
      })
    )
  }

  const getSummary = () => {
    return [...games].sort((a, b) => {
      if (a.homeScore + a.awayScore === b.homeScore + b.awayScore) {
        return b.startTime - a.startTime
      }
      return b.homeScore + b.awayScore - (a.homeScore + a.awayScore)
    })
  }

  return (
    <div>
      <div>
        <label htmlFor='homeTeam'>Home team:</label>
        <input
          name='homeTeam'
          id='homeTeam'
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='awayTeam'>Away team:</label>
        <input
          name='awayTeam'
          id='awayTeam'
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
      </div>
      <button onClick={startGame}>Start game</button>
      <br />
      {games.map((game) => (
        <div key={`${game.home}-${game.away}`}>
          {game.home} {game.homeScore} - {game.awayScore} {game.away}
          <button
            onClick={() =>
              updateScore(game, game.homeScore + 1, game.awayScore)
            }
          >
            {game.home} scores!
          </button>
          <button
            onClick={() =>
              updateScore(game, game.homeScore, game.awayScore + 1)
            }
          >
            {game.away} scores!
          </button>
          <button onClick={() => finishGame(game)}>Finish game</button>
        </div>
      ))}
      <button onClick={() => console.log(getSummary())}>Get summary</button>
    </div>
  )
}

export default Scoreboard
