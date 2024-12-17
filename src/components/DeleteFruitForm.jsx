import React , {useState} from 'react'

const DeleteFruitForm = ({deleteFruit, setResult, setShowDiv}) => {
  const [fruitName, setFruitName] = useState('')

  const handleSubmit = async (event) =>{
    event.preventDefault()
    if (fruitName){
      try{
        deleteFruit(fruitName)
        setFruitName('')
        setResult('deleted')
        setShowDiv(true)
      } catch (error){
        console.log("Error in deleting fruit:", error)
      }
      
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='input-box'
        type="text"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        placeholder="Enter fruit name"
      />
      <button className='submit-button' type="submit">Delete Fruit</button>
    </form>
  )
}

export default DeleteFruitForm