import React, {Component} from 'react';
import request from 'superagent';

export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
    };
  }

  render() {
    return <form onSubmit={this._onSubmit.bind(this)}>
      <div>
        <input type="text" placeholder="Username"
               value={this.state.username}
               onChange={this._onUsernameChange.bind(this)}/>
        <input type="text" placeholder="Message Content"
               value={this.state.content}
               onChange={this._onContentChange.bind(this)}/>
        <button type="submit">Send</button>
      </div>
    </form>;
  }

  _onUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  _onContentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/messages')
      .send({
        username: this.state.username,
        content: this.state.content
      })
      .end((err, res) => {
        if (err) return console.error(err);
        this.setState({content: ''});
        console.log('sent');
      })
  }

}