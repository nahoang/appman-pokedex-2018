import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}



const Wrapper = styled.div`
  heigth: 100%
`

const Footer = styled.div`
  position: absolute;  
  height: 100px;
  background-color: ${COLORS.Fire};
  width: 100%;
  bottom: 0;
  opacity: 0.9;
`

const StyledButton = styled.div`
  background-color: ${COLORS.Fire};
  position: absolute;
  bottom: 0;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto
  text-align: center;
  p {
    font-size: 100px;
    color: #ffffff;
    margin: 0 auto;
  }
`

class App extends Component {

  openModal() {
    
  }

  render() {
    return (
      <Wrapper className="App">
        <Footer>
          <StyledButton onClick={this.openModal.bind(this)}>
              <p>+</p>
          </StyledButton>
        </Footer>
      </Wrapper>
    )
  }
}

export default App
