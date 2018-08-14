var ListItem = React.createClass({
    getInitialState: function() {
        return {active: false};
    },
    render: function () {
      return (
        <a
        onClick={() => {
          this.setState(prevState => {
            let newState = !prevState.active;
            this.props.handleClick(newState, this.props.value);
            return {active: newState}
          })
        }}
        className={!this.state.active ? '' : 'selected'}
        href="#">
        {this.props.value}</a>
      )
    }
  });
  
  var Select = React.createClass({
    getInitialState: function() {
      this.handleItemClick = this.handleItemClick.bind(this)
      return {showList: false, value: []};
    },
    
    componentDidMount: function() {
      document.addEventListener('mousedown', (e) => {
        if(!this.node.contains(e.target)) {
          this.setState({showList: false})
        }
      })
    },
    
    componentWillUnmount:function() {
       document.removeEventListener('mousedown');
    },
    
    renderValue:function() {
      let {value} = this.state;
      if(!value.length) return "Select..."
      else return value.join(', ')
    },
    
    toggleList:function() {
      this.setState(prevState => ({showList: !prevState.showList}))
    },
    
    handleItemClick:function(active, val) {
      let {value} = this.state;
      
      if(active) 
        //value = [...value, val]
        value=value.concat(val)
      else 
        value = value.filter(e => e != val);
      
      this.setState({value})
    },
    
    
    render:function() {
      return (
        <div 
        ref={node => this.node = node}
        className="select">
          <button onClick={this.toggleList.bind(this)}>
            <span className="select_value">
              {this.renderValue()}
            </span>
          </button>
          
          <div
          className={"select_list " + (!this.state.showList && 'hide')}>
            <ListItem handleClick={this.handleItemClick} value="Lorem" />
            <ListItem handleClick={this.handleItemClick} value="Ipsum" />
            <ListItem handleClick={this.handleItemClick} value="Dolor" />
          </div>
        </div>
      )
    }  
  });