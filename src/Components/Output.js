import React from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-one_dark';

export default class Output extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMode: props.mode,
      currentValue: props.value,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ currentValue: this.props.value })
    }
  }

  handleCopy = () => {
    window.utools.hideMainWindow()
    window.utools.copyText(String(this.state.currentValue))
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.copyIndex !== this.props.copyIndex) {
      if (nextProps.copyIndex[0] === this.props.index && this.props.value) {
        this.handleCopy()
      }
      return false
    }
    return true
  }

  toJson = () => {
    try {
      const json = JSON.stringify(JSON.parse(this.state.currentValue), null, 4)
      this.setState({ currentMode: 'json', currentValue: json })
    } catch (e) {
    }
  }

  render() {
    const { label } = this.props
    const { currentMode, currentValue } = this.state
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
          <div className='components-output-label'>{label || '结果'}</div>
          {currentValue && (
            <div className='components-output-handle'>
              <Button onClick={this.handleCopy} color='primary' size='small'>复制</Button>
              <Button onClick={this.toJson} color='primary' size='small'>转JSON</Button>
            </div>)}
        </div>
        <Paper className='components-output'>
          {
            currentMode
              ? <AceEditor
                mode={currentMode}
                value={currentValue}
                fontSize={14}
                theme="one_dark"
                showGutter={true}
                highlightActiveLine={true}
                debounceChangePeriod={300}
                style={{ height: '350px', width: '100%', overflow: 'auto' }}
                setOptions={{
                  showLineNumbers: true,
                  useWorker: false,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  // 自动提词此项必须设置为true
                  enableSnippets: true,
                  tabSize: 4
                }}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
              />
              : <pre className='components-output-value'>
                {currentValue && currentValue.length > 10000 ? currentValue.substr(0, 10000) + '......' : currentValue}
              </pre>
          }

        </Paper>
      </>
    )
  }
}
