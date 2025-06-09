import React from 'react'

const CustomSelectInputField = (
  { name, value, handleChange, data = [], label = null, nested = false }
) => {

  return (
    <div className='w-full bg-transparent'>
      {
        label !== null &&
        <label >{label}</label>
      }
      <input
        name={name}
        value={value}
        list={name}
        onChange={handleChange}
        placeholder={label == null ? `Select your ${name.toLowerCase()}..` : ""}
        multiple
        className='w-full bg-secondary text-text border-b border-light placeholder-placeholder py-2  focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:rounded-xl focus:px-3 transition-all duration-300 bg-transparent mt-2 relative'
      />
      {
        nested == false ?
          <datalist id={name} onClick={handleChange}>
            {
              data.map((v, i) => {
                return <option key={i} value={v}>{v}</option>
              })
            }
          </datalist>
          :
          <datalist id={name} onClick={handleChange}>
            {
              data.map((v, i) => {
                return <option key={i} value={v.type}>{v.type}</option>
              })
            }
          </datalist>
      }
    </div>
  )
}

export default CustomSelectInputField