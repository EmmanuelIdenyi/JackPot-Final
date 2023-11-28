import {HiddenCard} from './HiddenCard'
import {CrossCard} from './CrossCard'
import {StarCard} from './StarCard'
import {CamoCard} from './CamoCard'
import {CircleCard} from './CircleCard'
import {TriangleCard} from './TriangleCard'
import {SquareCard} from './SquareCard'
import {DiamondCard} from './Diamond'
export const cards = {
    'hidden' : HiddenCard,
    'cross' : CrossCard,
    'star' : StarCard,
    'camo' : CamoCard,
    'circle' : CircleCard,
    'triangle' : TriangleCard,
    'square' : SquareCard,
    "diamond" : DiamondCard
}
export function Card({type, index, layout, onSelect, isUser }){
    const Chosen = {...cards}[type]
    let rotate = ''
    if (index< 2){
        rotate = `${300+20*(index+1)}deg`;
    }
    else{
        rotate = `${ 0+20*(index-1)}deg`;
    }
    return(
    <div className={`${layout}`} style={{zIndex: index, transform: `rotate(${rotate})`}} onClick = {onSelect} disabled={isUser}>
      <Chosen/>
    </div>
    )
}