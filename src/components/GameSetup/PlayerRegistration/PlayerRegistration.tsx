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
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/5">
        <h2 className="text-2xl font-bold mb-4">Let's Play Codenames!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col mb-4">
            <span className="mb-1">Player Name:</span>
            <input
              {...register("playerName", { required: true })}
              className="border border-gray-300 px-2 py-1 shadow-sm rounded"
            />
            {errors.playerName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </label>
          <label className="flex flex-col mb-4">
            <span className="mb-1">Team:</span>
            <select
              {...register("team", { required: true })}
              className="border border-gray-300 px-2 py-1 shadow-sm rounded"
            >
              <option value="">Select Team</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
            {errors.team && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </label>
          <label className="flex flex-col mb-4">
            <span className="mb-1">Role:</span>
            <select
              {...register("role", { required: true })}
              className="border border-gray-300 px-2 py-1 shadow-sm rounded"
            >
              <option value="">Select Role</option>
              <option value="spymaster">Spymaster</option>
              <option value="guesser">Guesser</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </label>
          <button
            className="bg-emerald-700 py-2 px-4 rounded shadow text-white font-bold"
            type="submit"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration;
