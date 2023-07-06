import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../../context/socketContext";
import { PlayerRegistrationData } from "../../../types/types";

/** TeamSelect Component
 *  This component is used to select a team - red or blue.
 *
 *  Props: handleTeamSelect - function to handle team selection
 *  team - the team that is currently selected
 *  role - The role of the user - spymaster or player
 *
 *  State:
 *        - team - the team that is currently selected
 *        - role - The role of the user - spymaster or player
 */

interface PlayerRegistrationProps {
  handlePlayerRegistration: Function;
}

const PlayerRegistration = ({
  handlePlayerRegistration,
}: PlayerRegistrationProps) => {
  const socket = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerRegistrationData>();

  const onSubmit = (data: PlayerRegistrationData) => {
    // Emit player registration data to the server
    socket.emit("registerPlayer", data);
    handlePlayerRegistration(data);
  };

  return (
    <div>
      <h2>Player Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Player Name:
          <input {...register("playerName", { required: true })} />
          {errors.playerName && <span>This field is required</span>}
        </label>
        <br />
        <label>
          Team:
          <select {...register("team", { required: true })}>
            <option value="">Select Team</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
          {errors.team && <span>This field is required</span>}
        </label>
        <br />
        <label>
          Role:
          <select {...register("role", { required: true })}>
            <option value="">Select Role</option>
            <option value="spymaster">Spymaster</option>
            <option value="guesser">Guesser</option>
          </select>
          {errors.role && <span>This field is required</span>}
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          Join Game
        </button>
      </form>
    </div>
  );
};

export default PlayerRegistration;
