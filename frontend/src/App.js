import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="App">
      <RecipeList/>
      <RecipeForm/>
    </div>
  );
}

export default App;
