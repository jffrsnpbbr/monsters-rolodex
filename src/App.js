import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      filteredMonsters: [],
      searchBox: '',
    };

    console.log('[constructor]');
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.monsters.length) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => {
          console.log('setState');
          this.setState(() => ({ monsters: users }));
        });
    }
    console.log('[componentDidMount]');
  }

  handleChange(event) {
    const value = event.target.value.toLocaleLowerCase();
    // console.log(value);
    this.setState({ searchBox: value });

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(value);
    });

    this.setState({ filteredMonsters });
  }

  render() {
    console.log('[render]');

    const monsters =
      this.state.searchBox.length > 0
        ? this.state.filteredMonsters
        : this.state.monsters;

    return (
      <div className="App">
        <h1>{this.state.searchBox}</h1>
        <input
          onChange={this.handleChange}
          className="search-box"
          type="search"
          placeholder="search monsters"
        />
        {monsters.map(({ id, name }) => (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
