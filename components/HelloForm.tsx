"use client";

import { useState } from "react";

/** Contact form — intentionally not wired to an inbox yet (see the note it shows on submit). */
export default function HelloForm() {
  const [thanks, setThanks] = useState("");
  return (
    <form
      id="helloForm"
      onSubmit={(e) => {
        e.preventDefault();
        setThanks(
          "Thank you — this demo form does not send yet. Connect it to your email before publishing."
        );
      }}
    >
      <label>
        Name
        <input required autoComplete="name" />
      </label>
      <label>
        Email
        <input required type="email" autoComplete="email" />
      </label>
      <label>
        Message
        <textarea required rows={5} />
      </label>
      <button className="send" type="submit">
        Send message
      </button>
      <p id="thanks" role="status">
        {thanks}
      </p>
    </form>
  );
}
