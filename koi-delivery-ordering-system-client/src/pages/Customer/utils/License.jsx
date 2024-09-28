// eslint-disable-next-line react/prop-types
const License = ({ handleChange, handleSubmit }) => {
    return (
        <div className="form-container">
            <h3>Fish Information</h3>
            <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Age"
                name="age"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Size"
                name="size"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Weight"
                name="weight"
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default License;