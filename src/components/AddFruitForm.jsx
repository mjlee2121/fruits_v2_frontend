import React, { useState } from 'react';

const AddFruitForm = ({ addFruit, setResult, setShowDiv }) => {
  const [fruitName, setFruitName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    if (fruitName) {
      addFruit(fruitName)
      setFruitName('')
      setShowDiv(true)
      setResult('added')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        placeholder="Enter fruit name"
      />
      <button type="submit">Add Fruit</button>
    </form>
  );
};

export default AddFruitForm;