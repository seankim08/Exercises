// FirstComponent
const FirstComponent = () => {
  return <h1>My very first component</h1>;
};

// NamedComponent
const NamedComponent = ({ name }) => {
  return <p>My name is {name}</p>;
};

// App component
const App = () => {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name="John Doe" />
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));