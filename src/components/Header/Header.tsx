import React from "react";

export default function Header(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-40 w-screen">
      <img
        src="https://czechgames.com/for-press/codenames/codenames-14.jpg"
        alt="Codenames"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
