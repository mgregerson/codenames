import React from "react";
import { useForm } from "react-hook-form";

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

type TeamSelectProps = {
  handleTeamSelect: (team: string, role: string) => void;
};

type TeamFormData = {
  team: string;
  role: string;
};

function TeamSelect({ handleTeamSelect }: TeamSelectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>();

  const onSubmit = handleSubmit((data) => {
    handleTeamSelect(data.team, data.role);
  });

  return (
    <div className="TeamSelect">
      <form className="TeamSelect-form" onSubmit={onSubmit}>
        <div className="TeamSelect-form-team">
          <label htmlFor="team">Team</label>
          <select {...register("team")} id="team">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
          {errors.team && <span className="error">Team is required</span>}
        </div>
        <div className="TeamSelect-form-role">
          <label htmlFor="role">Role</label>
          <select {...register("role")} id="role">
            <option value="player">Player</option>
            <option value="spymaster">Spymaster</option>
          </select>
          {errors.role && <span className="error">Role is required</span>}
        </div>
        <button type="submit" className="TeamSelect-form-submit">
          Let's play!
        </button>
      </form>
    </div>
  );
}

export default TeamSelect;
