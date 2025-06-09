const CustomInputFields = ({ label, name, value, type = "text", handleChange, target }) => {
    return (
        <div className='w-full  text-light'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                checked={type === "radio" ? target === value : null}
                placeholder={!label ? `Enter your ${name.toLowerCase()}..` : ''}
                className='w-full text-light border-b border-light placeholder-placeholder py-2 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:rounded-xl focus:px-3 transition-all duration-300 bg-transparent mt-2'
                style={type === "radio" ? { transform: "scale(1.25)", cursor: "pointer" } : { transform: "scale(1)" }}
                onFocus={type === "date" ? (e => e.target.showPicker()) : e => e.preventDefault()}
            />
        </div>
    );
};

export default CustomInputFields