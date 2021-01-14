import React, { useState } from "react";

import styles from "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <h2>React minimal starter kit</h2>
      <p>
        This is a simple starter kit to help you bootstrap your React project
        with few frills.
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increase cat count: {count}
      </button>
      <CatCounter count={count} />
    </div>
  );
}

function CatCounter({ count }: { count: number }) {
  const cats: Array<String> = [];
  for (let i = 0; i < count; i += 1) {
    cats.push("🐱");
  }
  return <>{cats}</>;
}
