import React from 'react'
import TextField from '@mui/material/TextField'
import Output from './Components/Output'

export default class UrlDecode extends React.Component {
  state = {
    input: '',
    result: ''
  }

  async generateText(text) {
    const res = await fetch(`http://opendata.baidu.com/api.php?query=${text}&co=&resource_id=6006&oe=utf8`)
    const json = await res.json()
    return JSON.stringify(json.data, null, 4)
  }

  async componentDidMount() {
    if (this.props.type === 'regex') {
      const input = this.props.payload
      this.setState({ input })
      const result = await this.generateText(input)
      this.setState({ result })
    }
  }

  handleInputChange = async (e) => {
    const input = e.target.value
    this.setState({ input })
    const result = await this.generateText(input)
    this.setState({ result })
  }

  render() {
    const { input, result } = this.state
    return (
      <div>
        <TextField
          label=''
          placeholder='ip'
          autoFocus
          multiline
          rows={1}
          variant='filled'
          fullWidth
          onChange={this.handleInputChange}
          value={input}
        />
        <Output label='结果' value={result} copyIndex={this.props.copyIndex} index={1} />
      </div>
    )
  }
}
