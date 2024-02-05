export interface CellParameters{
    w:number,
    h:number,
    left: boolean,
    right:boolean,
    top:boolean,
    bottom:boolean
  }

export function Cell({ w,h,left, right, top, bottom }:CellParameters) {
  
    const cellStyle = {
       position:'relative',
       width: `${Math.min(40, Math.floor(500/((w+h)/2)))}px`,
       height: `${Math.min(40, Math.floor(500/((w+h)/2)))}px`,
       boxSizing: 'border-box' as 'border-box',
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
   