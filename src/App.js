import React from "react";
import "./styles.css";

// https://dog.ceo/api/breed/hound/images/random/3

// export default function App() {
class App extends React.Component {
  state = {
    dogs: [], // each item is a string with image url
    newBreed: ""
  };

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/hound/images/random/15")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          this.setState({ dogs: json.message });
        } else {
          console.error("error fetching dogs: ", json);
        }
      })
      .catch((err) => console.error("WOOF: unable to retrieve dogs: ", err));
  }
  /*
   "husky": [],
        "keeshond": [],
        "kelpie": [],
        "komondor": [],
        "kuvasz": [],
        "labrador"
        */
  handleBreedChange = (e) => {
    this.setState({
      newBreed: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dogs !== this.state.dogs) {
      const newDogs = this.state.dogs.filter((dog_url) => {
        return !dog_url.includes("yorkshire");
      });
      console.log(`bk: App.js: CDU: newDogs: `, newDogs);

      console.log(`bk: App.js: CDU: this.state.dogs: `, this.state.dogs);
      if (newDogs.length !== this.state.dogs.length) {
        console.log(`bk: App.js: CDU: setting newDogs: `, newDogs);
        this.setState({
          dogs: newDogs
        });
      }
    }
  }

  handleSetNewBreed = (e) => {
    // yorkshire
    fetch(`https://dog.ceo/api/breed/${this.state.newBreed}/images/random/25`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          this.setState({ dogs: json.message });
        } else {
          console.error("error fetching dogs: ", json);
        }
      })
      .catch((err) => console.error("WOOF: unable to retrieve dogs: ", err));
  };

  render() {
    return (
      <div className="App">
        <h1>Doggies</h1>
        <div>
          breed:{" "}
          <input
            type="text"
            value={this.state.newBreed}
            onChange={this.handleBreedChange}
          />
          <button onClick={this.handleSetNewBreed}>set new breed</button>
        </div>
        <div>{this.state.dogs.length} dogs</div>
        {this.state.dogs.map((dog, i) => {
          return <img key={i} alt="dog" src={dog} width="300px" />;
        })}
      </div>
    );
  }
}

export default App;
