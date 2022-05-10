import { useState, FormEventHandler } from "react";

export function App() {
  const [input, setInput] = useState<string>();

  const hoursOnInput: FormEventHandler<HTMLSelectElement> = (event) => {
    const value = parseInt(event.currentTarget.value);

    const now = new Date();

    now.setHours(now.getHours() - value);

    setInput(now.toLocaleString());
  };

  return (
    <main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
      <h1>How many Hours ago?</h1>
      <select onInput={hoursOnInput}>
        {Array.from({ length: 25 }, (_value, index) => {
          return (
            <option key={index} value={index}>
              {index}
            </option>
          );
        })}
      </select>

      <p>{input}</p>

      <footer className="text-cyan-500">Eliaz Bobadilla</footer>
    </main>
  );
}
