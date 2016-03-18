import React,{Component} from 'react'
import {render} from 'react-dom'
import './style/index.less'

import Text from './components/text'

const App = () => <Text />

render(<App />,document.getElementById('app'))