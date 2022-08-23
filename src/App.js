import React, {useState} from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import SearchBar from './components/SearchBar';



function App() {
  const [map, setMap] = useState(null);
  const prov = OpenStreetMapProvider();
  const [selectPosition, setSelectPosition] = useState(null)
  console.log(selectPosition)
  return (
    <div className='App'>
      <div>
      <UserMap setMap={setMap} />
      </div>
    <SearchBar selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
    </div>
  );
}

export default App;
