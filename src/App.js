import './App.css';
import SliderBlock from './components/SliderBlock';

function App() {
  const rainbowColors = ["red", "orange", "green", "blue"];
  const pupleColors = ["indigo", "purple"];

  return (
    <main>
      <div className='wrapper'>
        <h1>Task</h1>
        <SliderBlock colors={rainbowColors} width='80%' height='60px' />
        <SliderBlock colors={pupleColors} width='50%' height='120px' />
      </div>
    </main>
  );
}

export default App;
