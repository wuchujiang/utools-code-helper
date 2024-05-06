import React from 'react'
import TextField from '@mui/material/TextField'
import Output from './Components/Output'

export default class UrlDecode extends React.Component {
  state = {
    input: '',
    result: ''
  }

  generateText(text) {
    const url = new URL(text)
    const params = url.searchParams
    const params1 = (
      Array.from(params.entries()).reduce((pre, cur) => {
        pre[cur[0]] = cur[1]
        return pre
      }, {})
    )
    const search = (url.hash || '').split('?')[1] || ''
    const params2 = search.split('&').filter(Boolean).reduce((pre, cur) => {
      const [key, value] = cur.split('=')
      pre[key] = value
      return pre
    }, {})
    const result = JSON.stringify({ ...params1, ...params2 }, null, 4)
    return result
  }

  componentDidMount() {
    if (this.props.type === 'regex') {
      const input = this.props.payload
      const result = this.generateText(input)
      this.setState({ input, result })
    }
  }

  handleInputChange = (e) => {
    const input = e.target.value
    const result = this.generateText(input)
    this.setState({ input, result })
  }

  render() {
    const { input, result } = this.state
    return (
      <div>
        <TextField
          label=''
          placeholder='URL 链接'
          autoFocus
          multiline
          rows={3}
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
