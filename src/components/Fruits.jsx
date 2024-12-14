import React, { useEffect, useState } from 'react';
import AddFruitForm from './AddFruitForm';
import DeleteFruitForm from './DeleteFruitForm';
import api from '../api';

const FruitList = () => {
  const [fruits, setFruits] = useState([]);
  const [showDiv, setShowDiv] = useState(false)
  const [result, setResult] = useState('')

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
      await api.post('/', { name: fruitName });
      fetchFruits();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error adding fruit", error);
    }
  };

  const deleteFruit = async (fruitName) =>{
    try {
      await api.delete('/', {
        data: {name: fruitName}})
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