import React, { Component } from "react";
import styled from 'styled-components'

import Card from './Card'
import { throwStatement } from "@babel/types";



const OverLay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 999;
  top: 0;
`

const Contianer = styled.div`
  background-color: #ffffff;
  margin: 40px;
  height: 675px;
  position: relative;
  padding: 8px;
`

const SeachBar = styled.div`
  height: 15%;

`

const CardWrapper = styled.div`
  overflow: scroll;
  width: 100%;
  height: 85%;
`

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then(res => res.json())
      .then(data => this.setState({ cards: data.cards }));
  }

  closeModal(e) {
    if(this.modalRef.current === e.target) {
      this.props.onClose()
    }
  }

  addPokemon(item) {
    let arr = localStorage.getItem("pokemon")
    if(arr !== null) {
      const poke = JSON.parse(arr)
      poke.push(item)
      localStorage.setItem("pokemon", JSON.stringify(poke))
    } else {
      arr = []
      arr.push(item)
      localStorage.setItem("pokemon", JSON.stringify(arr))
    }
    const newCards = this.state.cards.filter((val, i) => (val.id !== item.id))
    this.setState({cards: newCards})
  }



  render() {
    return (
      <OverLay onClick={(e) => this.closeModal(e)} ref={this.modalRef}>
        <Contianer>
          <SeachBar>
            <input />
          </SeachBar>
          <CardWrapper>
          {
            this.state.cards.map((item) => 
              <Card 
                data={item}
                col={1}
                key={item.id}
                onAdd={this.addPokemon.bind(this, item)}
            />
            )
          }
          </CardWrapper>
        
        </Contianer>
        
      </OverLay>
    );
  }
}

export default Modal;
