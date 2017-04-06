import React from 'react'

import Index from './component/Index.jsx'
import Carte from './component/Carte.jsx'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Index />
        <Carte />
      </div>
    )
  }
}

export default App
