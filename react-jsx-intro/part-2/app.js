// Tweet component
const Tweet = ({ username, name, date, message }) => {
  return (
    <div className="tweet">
      <p>
        <span className="tweet-username">@{username}</span>{" "}
        <span className="tweet-name">{name}</span>{" "}
        <span className="tweet-date">{date}</span>
      </p>
      <p className="tweet-message">{message}</p>
    </div>
  );
};

// App component
const App = () => {
  return (
    <div>
      <Tweet
        username="reactjs"
        name="React"
        date="2024-07-13"
        message="Learn React and build amazing user interfaces!"
      />
      <Tweet
        username="javascript"
        name="JavaScript"
        date="2024-07-12"
        message="JavaScript is the language of the web. Keep coding!"
      />
      <Tweet
        username="webdev"
        name="Web Dev"
        date="2024-07-11"
        message="Responsive design is crucial for modern websites."
      />
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));