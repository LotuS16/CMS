import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import './App.css'

const supabaseUrl = 'https://vrxosrpduizrysqndnrn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyeG9zcnBkdWl6cnlzcW5kbnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MDkxMDAsImV4cCI6MjA1NDk4NTEwMH0.h0vsmYt11VzUloH4E-9BkfKcuAXsFJ5OGETCgCvktpk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Instrument {
  name: string;  
}

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data, error } = await supabase.from("instruments").select();

    if (error) {
      console.error(error); 
    } else {
      setInstruments(data as Instrument[]); 
    }
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li> 
      ))}
    </ul>
  );
}

export default App
