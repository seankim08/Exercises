// Person component
const Person = ({ name, age, hobbies }) => {
  const displayName = name.length > 8 ? name.substring(0, 6) : name;

  return (
    <div className="person">
      <p>Learn some information about this person</p>
      <h2>Name: {displayName}</h2>
      <h3>Age: {age}</h3>
      <h3>{age >= 18 ? "please go vote!" : "you must be 18"}</h3>
      <h4>Hobbies:</h4>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div>
      <Person
        name="Alice Johnson"
        age={25}
        hobbies={["reading", "painting", "yoga"]}
      />
      <Person
        name="Bob Smith"
        age={17}
        hobbies={["gaming", "swimming", "basketball"]}
      />
      <Person
        name="Charlie Brown"
        age={35}
        hobbies={["cooking", "traveling", "photography"]}
      />
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));