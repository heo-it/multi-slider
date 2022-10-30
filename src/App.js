import './App.css';
import SliderBlock from './components/SliderBlock';

function App() {
  const rainbowColors = ["red", "orange", "green", "blue"];
  const pupleColors = ["indigo", "purple"];

  return (
    <main>
      <div>
        <h1>Task</h1>
        <SliderBlock colors={rainbowColors} />
        <SliderBlock colors={pupleColors}/>
      </div>
    </main>
  );
}

export default App;
