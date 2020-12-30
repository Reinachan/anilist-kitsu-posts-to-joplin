import React from 'react';
import NotebookIDs from './NotebookIDs';

interface notebookConstructor {
  notebook: any[],
  value: string
}

export default class JoplinNotebooks extends React.Component<{}, notebookConstructor> {
  constructor(props: any) {
    super(props);
    this.state = {
      notebook: [],
      value: '41184'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event: any) {
    let joplinPort: string = this.state.value;

    fetch(`http://localhost:${joplinPort}/folders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      data = data.items;
      this.setState({notebook: data});
    })

    event.preventDefault();
  }

  
  
  
  render() {
    
    return (
      <form className="list-notebooks" onSubmit={this.handleSubmit}>
        <legend className="section-header">
          <h3 className="section-header-title">
            Get a list of all Notebooks along with their IDs
          </h3>
        </legend>
        <div>
          <input 
            name="joplinPort" 
            type="text" id="joplin-port" 
            value={this.state.value}
            onChange={this.handleChange}
          />
          <p>Requires Joplin to be running</p>
          <input 
            name="submit"
            type="submit"
            value="Get all notebook IDs" 
            id="fetch-notebook-id"
          />
        </div>
        <div>
          <div id="show-notebooks">
          {this.state.notebook.map((notebook: any) => (
            <NotebookIDs notebook={notebook} />
          ))}
          </div>
        </div>
      </form>
    )
  }
}