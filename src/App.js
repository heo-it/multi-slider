import './App.css';
import Slider from './components/Slider';

const rainbowColors = ["red", "orange", "green", "blue"];
const pupleColors = ["indigo", "purple"];

function App() {

  return (
    <main>
      <div className='wrapper'>
        <h1>Task</h1>
        <Slider colors={rainbowColors} width='80%' height='60px' />
        <Slider colors={pupleColors} width='50%' height='120px' />
      </div>
    </main>
  );
}

export default App;
