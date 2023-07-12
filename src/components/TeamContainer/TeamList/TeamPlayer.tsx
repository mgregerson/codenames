import React from "react";
import { TeamPlayerProps } from "../../../types/types";

/** TeamPlayer component.
 *
 * This component displays the team's players.
 *
 * Props:
 * - name: a string
 *
 * State:
 * - None
 *
 * App -> GameContainer -> TeamBoard -> TeamPlayer
 *
 */

export default function TeamPlayer({ name }: TeamPlayerProps): JSX.Element {
  return (
    <section className="inline-block py-1 px-1 mr-1 mb-1 truncate text-white dark:text-[#e3e3e3] border border-white/40 dark:border-[#e3e3e3] rounded leading-none font-bold">
      {name}
    </section>
  );
}
