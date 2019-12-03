import React, { Component } from "react";
import styled from 'styled-components'

import CuteImage from '../cute.png'


const StyledImage = styled.div`
width: 35%;
height: 100%;
margin-right: 24px;
img{
  width: 100%;
  height: 100%;
}
float: left;
`

const StyledInformation = styled.div`
  float: left;
  width: 55%;
  p {
    font-style: italic;
    font-weight: 100;
    font-size: 24px;
    margin-bottom: -2px;
  }
  
`

const Wrapper = styled.div`
  width: 1024px;
  background-color: #f3f4f7;
`

const CardWrapper = styled.div`
  position: relative;
  
  padding: 8px;
  height: 220px;
  &.col-1 {
    width: 65%;
  }
  &.col-2 {
    width: 45%;
  }
  float: left;
  margin: 5px;
`

const StyledRow = styled.div`
  float: left;
  width: 100%;
  postion: relative;
`

const StyledLabel = styled.span`
  float: left;
  width: 15%;

`

const ProgressBar = styled.div`
  width: 80%;
  background-color: #e4e4e4;
  height: 16px;
  float: left;
  margin-top: 4px;
  margin-left: 10px;
  border-radius: 10px;
  &::after {
    content: '';
    display: block;
    background-color: #f3701a;
    height: 16px;
    border-radius: 10px;
    width: ${props => `${props.value  || 0}%`};
  }
  
`

const Icon = styled.img`
  width: 40px;
  margin: 2px;

`

class Card extends Component {

  /**
   * maximum is 100. if value is higher than 100 set it to 100, otherwise 0.
   * @param {*} val 
   */
  calculateHP(val) {
    if(isNaN(val)) return 0;
    if(val > 100) return 100;
    
    return val;
  }

  /**
   * use attacks length to multiply by 50, maximum is 100. e.g. if value is 1 set it to 50, 2 set it to 100, otherwise 0.
   * @param {*} val 
   */
  calculateSTR(val) {
    const level =  val * 50;
    if(isNaN(level)) return 0;
    if(level > 100) return 100;

    return level
  }

  /**
   * use weaknesses length multiply by 100, maximum is 100. e.g. if value is 1 set it to 100, otherwise 0.
   * @param {*} val 
   */
  calculateWeakness(val) {
    const level = val * 100;
    if(isNaN(level)) return 0;
    if(level > 100) return 100;

    return level

  }

  /**
   * use damage value without symbol of all attacks skill. e.g. 50+ set it to 50, 20* set it to 20, otherwise 0.
   * @param  val 
   */
  calculateDamage(val) {
    // damage is belong to the attacks property which is array of many item. So take the damage of first item.
    return val.replace(/[^0-9]/g,'');
  }

  /**
   * ((HP / 10) + (Damage /10 ) + 10 - (Weakness)) / 5
   * @param {*} hp 
   * @param {*} damage 
   * @param {*} weak 
   */
  calculateHappyness(hp, damage, weak) {
    return Math.round(((hp /10) + (damage/10) + 10 - weak/10)) / 5;
  }

  render() {
    const { data, col } = this.props;
    const { hp: iHp, attacks: iAttacks, weaknesses: iWeaknesses   } = data;
    const hp = this.calculateHP(iHp);
    const strength = this.calculateSTR( (iAttacks && iAttacks.length) || 0);
    const weekness = this.calculateWeakness((iWeaknesses && iWeaknesses.length) || 0);
    // const damage = this.calculateDamage(iAttacks[0].damage)
    // const happy = this.calculateHappyness(hp,  damage, weekness)

    return (
      <Wrapper>
        <CardWrapper className={`col-${col}`}>
          <StyledImage>
              <img src={data.imageUrl} alt={data.name} />
          </StyledImage> 
          <StyledInformation>
            <p>{data.name}</p>
            <StyledRow>
              <StyledLabel>HP</StyledLabel>
              <ProgressBar value={hp} />
            </StyledRow>
            <StyledRow>
              <StyledLabel>STR</StyledLabel>
              <ProgressBar value={strength} />
            </StyledRow>
            <StyledRow>
              <StyledLabel>Weak</StyledLabel>
              <ProgressBar value={weekness} />
            </StyledRow>
            {/* <StyledRow>
            {[...Array(happy).keys()].map(item => {
              return <Icon  key={item} src={CuteImage}  alt="" />
            })}
            </StyledRow> */}
        </StyledInformation>
      </CardWrapper>
      </Wrapper>
      
    );
  }
}

export default Card;
