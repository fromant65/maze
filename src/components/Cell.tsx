export interface CellParameters{
    dim: number,
    player: boolean|'win',
    left: boolean,
    right:boolean,
    top:boolean,
    bottom:boolean
  }

export function Cell({dim, player,left, right, top, bottom }:CellParameters) {
  
    const cellStyle = {
       position:'relative',
       width: `${dim}px`,
       height: `${dim}px`,
       boxSizing: 'border-box' as 'border-box',
       background: `${player==='win'?"green":player?"yellow":"white"}`
    };
   
    const borderStyle = {
       position: 'absolute',
       border: '1px solid black',
    };

    return (
       <div style={cellStyle}>
         {left && <div style={{ ...borderStyle, left: 0, top: 0, height: '100%' }} />}
         {right && <div style={{ ...borderStyle, right: 0, top: 0, height: '100%' }} />}
         {top && <div style={{ ...borderStyle, left: 0, top: 0, width: '100%' }} />}
         {bottom && <div style={{ ...borderStyle, left: 0, bottom: 0, width: '100%' }} />}
       </div>
    );
   }
   