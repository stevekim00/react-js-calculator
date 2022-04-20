const initialState = {
    display: '0',
    formula: ''
  }
  
  const operators = ["+", "-", "*", "/"];
  const operatorsExceptMinus = ["+", "*", "/"];
  
  class Calculator extends React.Component {
    state = initialState;
    
    handleNumbers = value => () => {
      const stringValue = value.toString();
      if (this.state.formula.includes("=")) {
        this.setState({
          display: stringValue,
          formula: stringValue
        });
      } else if (this.state.display === '0' && value === 0) {
        return;
      } else if (this.state.display === "0" || operators.indexOf(this.state.display) > -1) {
        this.setState({
          display: stringValue,
          formula: this.state.formula + stringValue
        });
      } else {
        this.setState({
          display: this.state.display + stringValue,
          formula: this.state.formula + stringValue
        }); 
      }
    }
    
    handleOperators = value => () => {
      const removedOperators = this.state.formula.replace(/[^\d]*$/,"");
      const currentValue = this.state.display;
      const hasConsecutiveOperators = /.+[^\d][^\d]$/; 
      if (this.state.formula.includes("=")) {
        this.setState({
          display: value,
          formula: currentValue + value
        });
      } else if (this.state.display === value){
        console.log('cannot have consecutive, same operators');
        return;
      } else if (hasConsecutiveOperators.test(this.state.formula)) {
        console.log('removed consecutive operators');
        this.setState({
          display: value,
          formula: removedOperators + value
        });
      } else if (operatorsExceptMinus.includes(currentValue) && value !== "-") {
        this.setState({
          display: value,
          formula: removedOperators + value
        });
      } else { 
        this.setState({
          display: value,
          formula: this.state.formula + value
        });
      }
    }
    
    handleClear = () => () => {
      this.setState(initialState); 
    }
    
    handleDecimal = () => () => {
      if (this.state.display.includes(".")) {
        return;
      } else if (this.state.display === "0") {
        this.setState({
          display: this.state.display + ".",
          formula: this.state.formula + "0."
        });
      } else {
        this.setState({
          display: this.state.display + ".",
          formula: this.state.formula + "."
        });
      }
    }
    
    handleEquals = () => () => {
      try {
        eval(this.state.formula); 
      } catch (error) {
        this.setState({display: error.name});
      }
      const solution = eval(this.state.formula);
      const roundedSolution = Math.round(solution * 100000) / 100000;
      this.setState({
        display: roundedSolution,
        formula: this.state.formula + "=" + " " + roundedSolution
      })
    }
    
    render() {
      return (
        <div className="calculator">
          <div className="display-container">
            <div class="display" id="formula">{this.state.formula}</div>
            <div class="display" id="display">{this.state.display}</div>
          </div>  
          <div className="buttons container">
            <div className="row">
              <button onClick={() => this.setState(initialState)} id="clear" class="col">AC</button>
              <button onClick={this.handleOperators("+")} id="add" class="col">+</button>
              <button onClick={this.handleOperators("-")} id="subtract" class="col">-</button>
              <button onClick={this.handleOperators("*")} id="multiply" class="col">*</button>
              <button onClick={this.handleOperators("/")} id="divide" class="col">/</button>
            </div>
            <div class="row">
              <button onClick={this.handleNumbers(9)} id="nine" class="col">9</button>
              <button onClick={this.handleNumbers(8)} id="eight" class="col">8</button>
              <button onClick={this.handleNumbers(7)} id="seven" class="col">7</button>
            </div>
            <div class="row">
              <button onClick={this.handleNumbers(6)} id="six" class="col">6</button>
              <button onClick={this.handleNumbers(5)} id="five" class="col">5</button>
              <button onClick={this.handleNumbers(4)} id="four" class="col">4</button>
            </div>
            <div class="row">
              <button onClick={this.handleNumbers(3)} id="three" class="col">3</button>
              <button onClick={this.handleNumbers(2)} id="two" class="col">2</button>
              <button onClick={this.handleNumbers(1)} id="one" class="col">1</button>
            </div>
            <div class="row">
              <button onClick={this.handleNumbers(0)} id="zero" class="col">0</button>
              <button onClick={this.handleDecimal()}id="decimal" class="col">.</button>
              <button onClick={this.handleEquals()} id="equals" class="col">=</button>
            </div>
          </div>
        </div>
      );
    }
  };
  
  ReactDOM.render(<Calculator />, document.getElementById('root'));