import React from "react";

interface TeamScoreProps {
  score: number | null;
}

export default function TeamScore({ score }: TeamScoreProps): JSX.Element {
  return (
    <section className="relative h-12 landscape:h-28">
      <article className="score w-12 text-center absolute text-white top-6 landscape:top-14 right-[20px] dark:text-dark-red-score">
        {score}
      </article>
    </section>
  );
}
