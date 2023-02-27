import './App.css';
import Main from './components/Main';
import YAML from 'yaml';
import dummyData from './dummyData';

function App() {

  return (
    <>
    <div style={{padding: "50px"}}>
      <h1 style={{marginBott : "20px"}}>Trello風アプリ</h1>
      <Main />
    </div>

    </>
  );
}

export default App;
