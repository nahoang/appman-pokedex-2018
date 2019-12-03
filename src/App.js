import React, { Component } from 'react'
import styled from 'styled-components'

import './App.css'
import Card from './components/Card'
import Modal from './components/Modal'

export const COLORS = {
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

const Header = styled.div`
  background-color: #ffffff;
  p {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    z-index: 1;
  }
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

const ListItem = styled.div`
  height: 590px;
  overflow: scroll;
  width: 100%;
`



class App extends Component {
  state = {
    cards: [],
    isOpen: false
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then(res => res.json())
      .then(data => this.setState({ cards: data.cards }));
  }

  openModal() {
    this.setState({ isOpen: true })
  }

  closeModal() {
    this.setState({isOpen: false})
  }


  render() {
    return (
      <Wrapper className="App" >
        <Header>
          <p>My Pokedex</p>
        </Header>
        <ListItem>
        {this.state.cards.map((item) => 
          <Card 
          data={item}
          col={2}
          key={item.id}
        />
        )}
        </ListItem>
        <Footer>
          <StyledButton onClick={this.openModal.bind(this)}>
              <p>+</p>
          </StyledButton>
        </Footer>
        <div  >
        {
          this.state.isOpen && <Modal  data={this.state.cards}  onClose={() => this.closeModal() } />
        }
        </div>
        
      </Wrapper>
    )
  }
}

export default App
