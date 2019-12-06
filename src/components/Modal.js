import React, { Component } from "react";
import styled from 'styled-components'
import _ from 'lodash'

import Card from './Card'
import SearchIcon from '../search.png'


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
  position: relative;
`

const StyledInput = styled.input`
height: 35px;
width: 98%;
margin-bottom: 10px;
font-size: 20px;
padding-left: 10px;
`

const StyledIcon = styled.div`
  height: 40px;
  width: 40px;
  img{
    width: 100%;
    height: 100%;
  }
  position: absolute
  top: 0;
  right: 10px;
`

const CardWrapper = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 630px;
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

  /**
   * The search function should be queried from the server but it is temporatily hard code the data 
   * @param {*} e 
   */
  searchPokemon(e) {
    const upperName = e.target.value
    if(_.isEmpty(upperName)) {
      fetch("http://localhost:3030/api/cards")
      .then(res => res.json())
      .then(data => this.setState({ cards: data.cards }));
    } else {
      fetch("http://localhost:3030/api/cards")
      .then(res => res.json())
      .then(data => {
        const newCards = data.cards.filter((val, i) => (val.name.indexOf(upperName) > 0))
        this.setState({ cards: newCards });
      })
    }
  }

  render() {
    return (
      <OverLay onClick={(e) => this.closeModal(e)} ref={this.modalRef}>
        <Contianer>
          <SeachBar >
            <StyledInput placeholder="Find Pokemon" onChange={(e) => this.searchPokemon(e)}/>
          <StyledIcon>
            <img src={SearchIcon} alt='' />
          </StyledIcon>
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
