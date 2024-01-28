import React from 'react'

const CategoryForm = ({handleSubmit,value, setValue}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
  <div className="mb-5">
    
    <input type="text" className="form-control" placeholder='Enter new category' 
    value={value}
     onChange={(e)=>setValue(e.target.value)}/>
   
  </div>
  <div className="mb-3">
    
    
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default CategoryForm;