import { useState } from 'react';
import { Button } from "@/components/ui/button"
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center">
      {count}
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}

export default App;
