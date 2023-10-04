import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContent: '0'
    }  //Initialize the state

    //Bind keyword 'this' to action handler methods
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.handleSignChange = this.handleSignChange.bind(this);
  }

  handleNumberClick(event) {
    if (this.state.displayContent.length < 11) {
      if (this.state.displayContent === '0') {
        if (event.target.innerText === '.') {
          this.setState((oldState) => ({
            displayContent: (oldState.displayContent + event.target.innerText)
            }))
        } else {
          this.setState({displayContent: event.target.innerText})
          }
      } else if (this.state.displayContent[this.state.displayContent.length - 1] === '.') {
          if (event.target.innerText !== '.') {
            this.setState((oldState) => ({
              displayContent: (oldState.displayContent + event.target.innerText)
              }))
          }
      } else {
        this.setState((oldState) => ({
          displayContent: (oldState.displayContent + event.target.innerText)
          }))
        }
    }
  }
    

  handleClear() {
    this.setState({
      displayContent: '0'
    })
  }

  handlePercent() {
    let temp = Number(this.state.displayContent);
    temp /= 100;
    console.log(temp);
    this.setState({displayContent: String(temp)});
  }

  handleSignChange() {
    console.log("RAN");
    if (this.state.displayContent !== '0') {
      if (this.state.displayContent[0] === '-') {
        this.setState((oldState) => ({
          displayContent: oldState.displayContent.slice(1)
        }))
      } else {
        this.setState((oldState) => ({
          displayContent: '-' + oldState.displayContent
        }))
      }
    }
  }

  render() {
    return(
      <div id="parent-div">
        <div id="display"><div id="display-content">{this.state.displayContent}</div></div>
        <table id='keypad'>
          <tbody>
            <tr>
              <td><button id='clear' className='top-key' onClick={this.handleClear}>AC</button></td>
              <td><button id='change-sign' className='top-key' onClick={this.handleSignChange}>+/-</button></td>
              <td><button id='percent' className='top-key' onClick={this.handlePercent}>%</button></td>
              <td><button id='divide' className='operation-key'>{'\u00F7'}</button></td>
            </tr>
            <tr>
              <td><button id='seven' className='normal-key' onClick={this.handleNumberClick}>7</button></td>
              <td><button id='eight' className='normal-key' onClick={this.handleNumberClick}>8</button></td>
              <td><button id='nine' className='normal-key' onClick={this.handleNumberClick}>9</button></td>
              <td><button id='multiply' className='operation-key'>x</button></td>
            </tr>
            <tr>
              <td><button id='four' className='normal-key' onClick={this.handleNumberClick}>4</button></td>
              <td><button id='five' className='normal-key' onClick={this.handleNumberClick}>5</button></td>
              <td><button id='six' className='normal-key' onClick={this.handleNumberClick}>6</button></td>
              <td><button id='subtract' className='operation-key'>-</button></td>
            </tr>
            <tr>
              <td><button id='one' className='normal-key' onClick={this.handleNumberClick}>1</button></td>
              <td><button id='two' className='normal-key' onClick={this.handleNumberClick}>2</button></td>
              <td><button id='three' className='normal-key' onClick={this.handleNumberClick}>3</button></td>
              <td><button id='add' className='operation-key'>+</button></td>
            </tr>
            <tr>
              <td><button id='zero' className='normal-key' onClick={this.handleNumberClick}>0</button></td>
              <td><button id='decimal' className='normal-key' onClick={this.handleNumberClick}>.</button></td>
              <td><button id='equals' className='operation-key'>=</button></td>
            </tr>
        </tbody>
        </table>
      </div>
    )
  }
}

//Render React app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
