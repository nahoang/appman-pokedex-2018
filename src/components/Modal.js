import React, { Component } from "react";
import styled from 'styled-components'

import Card from './Card'



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
    // create a ref to store the textInput DOM element
    this.modalRef = React.createRef();
  }

  closeModal(e) {
    if(this.modalRef.current === e.target) {
      this.props.onClose()
    }
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
            this.props.data.map((item) => 
              <Card 
                data={item}
                col={1}
                key={item.id}
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
