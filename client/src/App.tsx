import React, { useState } from 'react';

import styles from './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <h2>Saylua</h2>
      <p>The starting point for a new virtual pet game.</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increase cat count: {count}
      </button>
      <CatCounter count={count} />
    </div>
  );
}

function CatCounter({ count }: { count: number }) {
  const cats: Array<String> = [];
  for (let i = 0; i < count; i++) {
    cats.push('🐱');
  }
  return <>{cats}</>;
}
