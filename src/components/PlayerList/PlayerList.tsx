import React from "react";

/** PlayerList Component
 *
 * Props: redTeam - array of players on the red team {team, role, name, id}
 *        blueTeam - array of players on the blue team  {team, role, name, id}
 *
 *
 */

interface PlayerListProps {
  redTeam: Array<{ team: string; role: string; name: string; id: string }>;
  blueTeam: Array<{ team: string; role: string; name: string; id: string }>;
}

function PlayerList({ redTeam, blueTeam }: PlayerListProps) {
  return (
    <div className="PlayerList">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Red Team</th>
            <th scope="col">Blue Team</th>
          </tr>
        </thead>
        <tbody>
          {redTeam.length > blueTeam.length
            ? redTeam.map((player, index) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{index < blueTeam.length ? blueTeam[index].name : ""}</td>
                </tr>
              ))
            : blueTeam.map((player, index) => (
                <tr key={player.id}>
                  <td>{index < redTeam.length ? redTeam[index].name : ""}</td>
                  <td>{player.name}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
