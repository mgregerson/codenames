/** TeamPlayer
 *
 * Lists a player's name on a specific team (red or blue)
 *
 */

import React from "react";

interface TeamPlayerProps {
  name: string;
}

export default function TeamPlayer({ name }: TeamPlayerProps): JSX.Element {
  return (
    <section className="inline-block py-1 px-1 mr-1 mb-1 truncate text-white dark:text-[#e3e3e3] border border-white/40 dark:border-[#e3e3e3] rounded leading-none font-bold">
      {name}
    </section>
  );
}
