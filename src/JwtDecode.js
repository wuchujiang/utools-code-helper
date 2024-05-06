import React from 'react'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Paper from '@mui/material/Paper'
import Output from './Components/Output'
import { jwtDecode } from "jwt-decode";

export default class Base64Decode extends React.Component {
  state = {
    input: '',
    result: '',
    isBase64Img: false,
    isImageCopy: true
  }

  validateText = (str) => {
    return /^[0-9a-zA-Z-_]+\.[0-9a-zA-Z-_]+\.[0-9a-zA-Z-_]+$/.test(str)
  }

  componentDidMount() {
    if (this.props.type === 'regex') {
      if (this.validateText(this.props.payload)) {
        const result = JSON.stringify(jwtDecode(this.props.payload), null, 4)
        this.setState({ input: this.props.payload, result })
      }
    }
  }

  handleInputChange = (e) => {
    const input = e.target.value
    this.setState({ input })
    if (this.validateText(input)) {
      this.setState({ result: JSON.stringify(jwtDecode(input), null, 4) })
    } else {
      this.setState({ result: '' })
    }
  }

  handleSaveImg = () => {
    window.services.imageBase64ToFile(this.state.input)
  }

  render() {
    const { result, input } = this.state
    return (
      <div className='base64decode-page'>
        <TextField
          label=''
          placeholder='jwt token'
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
