import React, {Component} from 'react';
import request from 'superagent';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    const self = this;
    console.log('------- componentWillMount');
    setInterval(function () {
      request.get('/api/messages')
        .end((err, res) => {
          if (err) return console.error(err);
          self.setState({messages: res.body});
        })
    }, 1000);
  }

  render() {
    return <ul>
      {
        this.state.messages.map(message =>
          <li>{message.username}: {message.content}</li>
        )
      }
    </ul>
  }
}