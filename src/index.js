import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContent: '0',
      queue: [],
      queueDisplay: '0'
    }  //Initialize the state

    //Bind keyword 'this' to action handler methods
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.handleSignChange = this.handleSignChange.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  //Handle a normal number key
  handleNumberClick(event) {
    if (this.state.displayContent.length < 11) {  //Only add numbers if the length is less than 11 digits
      //If the display content equals 0, replace it with the input, unless it is a decimal
      if (this.state.displayContent === '0') {  
        if (event.target.innerText === '.') {
          this.setState((oldState) => ({
            displayContent: (oldState.displayContent + event.target.innerText)
            }))
        } else {
          this.setState({displayContent: event.target.innerText});
          }
      //If display content contains a decimal, don't allow another decimal to be added
      } else if (this.state.displayContent.indexOf('.') !== -1) {
          if (event.target.innerText !== '.') {
            this.setState((oldState) => ({
              displayContent: (oldState.displayContent + event.target.innerText)
              }))
          }
      //Otherwise allow any numeral to be added to the end of the string
      } else {
        this.setState((oldState) => ({
          displayContent: (oldState.displayContent + event.target.innerText)
          }))
        }
    }
  }
    
  //When the AC button is clicked, return the display content to 0
  handleClear(event) {
    if (event.target.innerText === 'C') {
      this.setState({
        displayContent: '0'
      })
    } else if (event.target.innerText === 'AC') {
      this.setState({
        displayContent: '0',
        queue: [],
        queueDisplay: '0'
      })
    }
    
  }

  //If the percent button is clicked, divide by 100
  handlePercent() {
    let temp = Number(this.state.displayContent);
    temp /= 100;
    console.log(temp);
    this.setState({displayContent: String(temp)});
  }

  //If the sign change button is clicked, add or remove a negative sign from the front of the display content
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

  handleOperation(event) {
    if (this.state.queueDisplay === '0') {
      this.setState({
        queueDisplay: ''
      })
    }
    if (event.target.innerText === '+') {
        this.setState((oldState) => ({
          queue: oldState.queue.concat(oldState.displayContent).concat("+"),
          queueDisplay: oldState.queueDisplay.concat(oldState.displayContent).concat("+"),
          displayContent: "0"
        }))
    } else if (event.target.innerText === '-') {
      this.setState((oldState) => ({
        queue: oldState.queue.concat(oldState.displayContent).concat("-"),
        queueDisplay: oldState.queueDisplay.concat(oldState.displayContent).concat("-"),
        displayContent: "0"
      }))
    } else if (event.target.innerText === 'x') {
      this.setState((oldState) => ({
        queue: oldState.queue.concat(oldState.displayContent).concat("x"),
        queueDisplay: oldState.queueDisplay.concat(oldState.displayContent).concat("x"),
        displayContent: "0"
      }))
    } else if (event.target.innerText === '\u00F7') {
      this.setState((oldState) => ({
        queue: oldState.queue.concat(oldState.displayContent).concat('\u00F7'),
        queueDisplay: oldState.queueDisplay.concat(oldState.displayContent).concat('\u00F7'),
        displayContent: "0"
      }))
    }
  }

  handleEquals() {
    //Update the queue with whatever is on the display
    this.setState((oldState) => ({
      queue: oldState.queue.concat(oldState.displayContent),
    }));
    var queue = this.state.queue.slice();
    //Perform multiplication and division first
    while (true) {
      var solved = true;
      for (let i = 1; i < queue.length - 1; i++) {
        if (queue[i] === 'x') {
          solved = false;
          queue[i - 1] = Number(queue[i - 1]) * Number(queue[i + 1]);
          queue.splice(i, 2);
        } else if (queue[i] === '\u00F7') {
          solved = false;
          queue[i - 1] = Number(queue[i - 1]) / Number(queue[i + 1]);
          queue.splice(i, 2);
        }
        console.log(queue);
      }
      if (solved) {
        break;
      }
    }

    //Perform addition and subtraction next
    while (true) {
      solved = true;
      for (let i = 1; i < queue.length - 1; i++) {
        if (queue[i] === '+') {
          solved = false;
          queue[i - 1] = Number(queue[i - 1]) + Number(queue[i + 1]);
          queue.splice(i, 2);
        } else if (queue[i] === '-') {
          solved = false;
          queue[i - 1] = Number(queue[i - 1]) - Number(queue[i + 1]);
          queue.splice(i, 2);
        }
        console.log(queue);
      }
      if (solved) {
        break;
      }
    }

    this.setState({
      displayContent: queue[0],
      queue: [],
      queueDisplay: '0'
    })

  }

  updateQueue(symbol) {
    this.setState((oldState) => ({
      queue: oldState.queue.concat(symbol),
      queueDisplay: oldState.queueDisplay.concat(symbol)
    }))
  }

  render() {
    return(
      <div id="parent-div">
        <div id="display-container">
          <div id="queue-display">{this.state.queueDisplay}</div>
          <div id="display">{this.state.displayContent}</div>
        </div>
        <table id='keypad'>
          <tbody>
            <tr>
              <td><button id='clear' className='top-key' onClick={this.handleClear}>AC</button></td>
              <td><button id='change-sign' className='top-key' onClick={this.handleSignChange}>+/-</button></td>
              <td><button id='percent' className='top-key' onClick={this.handlePercent}>%</button></td>
              <td><button id='divide' className='operation-key' onClick={this.handleOperation}>{'\u00F7'}</button></td>
            </tr>
            <tr>
              <td><button id='seven' className='normal-key' onClick={this.handleNumberClick}>7</button></td>
              <td><button id='eight' className='normal-key' onClick={this.handleNumberClick}>8</button></td>
              <td><button id='nine' className='normal-key' onClick={this.handleNumberClick}>9</button></td>
              <td><button id='multiply' className='operation-key' onClick={this.handleOperation}>x</button></td>
            </tr>
            <tr>
              <td><button id='four' className='normal-key' onClick={this.handleNumberClick}>4</button></td>
              <td><button id='five' className='normal-key' onClick={this.handleNumberClick}>5</button></td>
              <td><button id='six' className='normal-key' onClick={this.handleNumberClick}>6</button></td>
              <td><button id='subtract' className='operation-key' onClick={this.handleOperation}>-</button></td>
            </tr>
            <tr>
              <td><button id='one' className='normal-key' onClick={this.handleNumberClick}>1</button></td>
              <td><button id='two' className='normal-key' onClick={this.handleNumberClick}>2</button></td>
              <td><button id='three' className='normal-key' onClick={this.handleNumberClick}>3</button></td>
              <td><button id='add' className='operation-key' onClick={this.handleOperation}>+</button></td>
            </tr>
            <tr>
              <td><button id ='clearCurrent' className='normal-key' onClick={this.handleClear}>C</button></td>
              <td><button id='zero' className='normal-key' onClick={this.handleNumberClick}>0</button></td>
              <td><button id='decimal' className='normal-key' onClick={this.handleNumberClick}>.</button></td>
              <td><button id='equals' className='operation-key' onClick={this.handleEquals}>=</button></td>
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
