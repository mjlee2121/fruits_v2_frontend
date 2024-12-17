import React, { useEffect, useState } from 'react';
import AddFruitForm from './AddFruitForm';
import DeleteFruitForm from './DeleteFruitForm';
import api from '../api';

const FruitList = () => {
  const [fruits, setFruits] = useState([]);
  const [showDiv, setShowDiv] = useState(false)
  const [result, setResult] = useState('')
  const [currentPhoto, setCurrentPhoto] = useState('')

  const fetchFruits = async () => {
    try {
      const response = await api.get('/');
      setFruits(response.data.fruits);
    } catch (error) {
      console.error("Error fetching fruits", error);
    }
  };

  const addFruit = async (fruitName) => {
    try {
      const photoPath = `http://localhost:8000/images/${fruitName.toLowerCase()}.jpeg`

      const response = await api.post('/', { name: fruitName, photo_path: photoPath });

      fetchFruits();  // Refresh the list after adding a fruit
      setCurrentPhoto(response.data.photo_path)
      console.log(currentPhoto); 

    } catch (error) {
      console.error("Error adding fruit", error);
    }
  };

  const deleteFruit = async (fruitName) =>{
    try {
      const photoPath = `http://localhost:8000/images/${fruitName.toLowerCase()}.jpeg`

      await api.delete('/', {
        data: {name: fruitName, photo_path: photoPath}})
      fetchFruits()
    } catch (error){
      console.error("Error deleting fruit", error)
    }
  }

  setTimeout(()=>{
    setShowDiv(false)
  }, 3000)

  useEffect(() => { 
    // show the list of fruits on each refresh
    fetchFruits();
    setResult(false)
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>
      <div className='photo'>
        {currentPhoto && <img src={`http://localhost:8000${currentPhoto}`} alt="Fruit image unavailable" />}
      </div>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit.name}</li>
        ))}
      </ul>
      <AddFruitForm addFruit={addFruit} setResult={setResult} setShowDiv={setShowDiv}/>
      <DeleteFruitForm deleteFruit={deleteFruit} setResult={setResult} setShowDiv={setShowDiv}/>
      <div className={showDiv ? 'visible':'hidden'}>
        {(result === 'added'? 'You added a fruit' : 'You deleted a fruit')}
      </div>
        
    </div>
  );
};

export default FruitList;