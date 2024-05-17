import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './style.css'


const Canvas = ( { positionsToDraw } ) => {
    const canvasRef = useRef(undefined);
    const [context, setContext] = useState(undefined)

    useEffect(() => {
      if(canvasRef.current){
        canvasRef.current.width = 300; 
        canvasRef.current.height = 300;
        setContext(canvasRef.current.getContext("2d"));
      }


      if(positionsToDraw.winner !== undefined){
        // { winner: 'X', startLine: x, y, endLine: x, y}
        // 100px to eachDiv
        // X = column Y = linha
        let counterX = 50 + positionsToDraw.startLine.x * 100
        let counterY = 50 + positionsToDraw.startLine.y * 100
        let multiplier = 1
        context.beginPath();

        const animate = () => {
          // console.log('x: ', parseInt(counterX),' para => ', 50 + positionsToDraw.endLine.x * 100, 'y: ',parseInt(counterY),' para => ', 50 + positionsToDraw.endLine.y * 100,)
          // console.log(positionsToDraw)
          // console.log(multiplier)

          context.moveTo(50 + (positionsToDraw.startLine.x * 100), 50 + (positionsToDraw.startLine.y * 100)); // X, Y - End
          context.lineTo(parseInt(counterX), parseInt(counterY));
          context.strokeStyle = "white";
          context.lineWidth = 3;
          context.stroke();

          const request = requestAnimationFrame(animate);
          if(counterX >= 50 + positionsToDraw.endLine.x * 100 && counterY >= 50 + positionsToDraw.endLine.y * 100  || (parseInt(counterY) == 49 && (positionsToDraw.startLine.x === 0 && positionsToDraw.startLine.y === 2))){
            console.log("here")
            cancelAnimationFrame(request)
          }
          else {
            if(counterX < 50 + (positionsToDraw.endLine.x * 100)){
              counterX = counterX + 1 * multiplier
            }
            if(counterY < 50 + (positionsToDraw.endLine.y * 100)){
              counterY = counterY + 1 * multiplier
            }

            if(counterY > 50 + (positionsToDraw.endLine.y * 100) && (positionsToDraw.startLine.x === 0 && positionsToDraw.startLine.y === 2)){
              counterY = counterY - 1 * multiplier
            }
            multiplier = 5
          }
        }
        animate()
      }
    },[positionsToDraw])
    
    return (
      <canvas ref={canvasRef} id='grid-canvas'/>
    )
}

export function App() {
  const [matriz, setMatriz] = useState(Array(3).fill().map(() => Array(3).fill('')))
  const [XorO, setXorO] = useState(true) // true for X and False for O 
  const [WhoWinAndPosition , setWhoWinAndPosition] = useState({ winner: undefined, startLine: {x: 0, y:0}, endLine: {x: 0, y:0} })
  const [Njogadas, setNjogadas] = useState(0)

  const CheckingWinningPositions = () => {
    for(let line = 0; line < matriz.length ; line++){
      let somaColuna = ''
      let somaLinha = ''
      let somaDiagonalDireita = ''
      let somaDiagonalEsquerda = ''

      for(let colum = 0; colum < matriz[line].length ; colum++){
        somaLinha += matriz[line][colum]
        // inverted for sum of the coluns
        somaColuna += matriz[colum][line]

        // Diagonal sums
        somaDiagonalDireita += matriz[colum][colum]
        somaDiagonalEsquerda += matriz[colum][matriz.length - 1 - colum];

        if(somaLinha === 'XXX'){
          let updatedPositionsAndWinner = { winner: 'X', startLine: {x: 0, y: line}, endLine: {x: colum, y: line}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaColuna === 'XXX'){
          // inverteded because o the colum sum
          let updatedPositionsAndWinner = { winner: 'X', startLine: {x: line, y: 0}, endLine: {x: line, y: colum}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaDiagonalDireita === 'XXX'){
          let updatedPositionsAndWinner = { winner: 'X', startLine: {x: 0, y: 0}, endLine: {x: 2, y: 2}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaDiagonalEsquerda === 'XXX'){
          let updatedPositionsAndWinner = { winner: 'X', startLine: {x: 0, y: 2}, endLine: {x: 2, y: 0}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }




        



        if(somaLinha === 'OOO'){
          let updatedPositionsAndWinner = { winner: 'O', startLine: {x: 0, y: line}, endLine: {x: colum, y: line}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaColuna === 'OOO'){
          // invertido para soma de colunas
          let updatedPositionsAndWinner = { winner: 'O', startLine: {x: line, y: 0}, endLine: {x: line, y: colum}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaDiagonalDireita === 'OOO'){
          let updatedPositionsAndWinner = { winner: 'O', startLine: {x: 0, y: 0}, endLine: {x: 2, y: 2}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        else if(somaDiagonalEsquerda === 'OOO'){
          let updatedPositionsAndWinner = { winner: 'O', startLine: {x: 0, y: 2}, endLine: {x: 2, y: 0}}; 
          setWhoWinAndPosition(WhoWinAndPosition => ({
            ...WhoWinAndPosition,
            ...updatedPositionsAndWinner
          }));
          return null
        }
        
      }
    }
  }

  const CheckingIfDraw = () => {
    //After checking if have winners, check if it's a draw
    if(Njogadas === 8 && WhoWinAndPosition.winner === undefined){
      let newValue = { winner: 'draw'}
      setWhoWinAndPosition({
        ...WhoWinAndPosition,
        ...newValue
      })
    }
  }

  //Getting position of click
  const handleClick = (lineIndex, colIndex) => {
    if (WhoWinAndPosition.winner === undefined && matriz[lineIndex][colIndex] === ''){
      setNjogadas(Njogadas + 1)
      const newMatriz = [...matriz];
      newMatriz[lineIndex][colIndex] = XorO ? 'X' : "O" 
      setXorO(!XorO)
      setMatriz(newMatriz)

      CheckingWinningPositions()
      
      CheckingIfDraw()
    }
  }

  const resetEverything = () => {
    setMatriz(Array(3).fill().map(() => Array(3).fill('')));
    setXorO(true)
    let originalValues = { winner: undefined, startLine: {x: 0, y:0}, endLine: {x: 0, y:0} }
    setWhoWinAndPosition({
      ...WhoWinAndPosition,
      ...originalValues
    })
    setNjogadas(0)
  }

  return (
    <div className='container'>
      <AnimatePresence initial={false} mode='wait'>
        {
          WhoWinAndPosition.winner === undefined && Njogadas < 9 ?
            <motion.h2
              key={matriz}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration : 0.2}}
            >
              {XorO ? 'X' : 'O'} Turn
            </motion.h2>
            :
            <motion.h2
              key={matriz}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration : 0.2}}
            >
              { WhoWinAndPosition.winner !== 'draw' ? WhoWinAndPosition.winner+" has won" : 'Draw' }
            </motion.h2>
        }
      </AnimatePresence>
      <div>
        <Canvas positionsToDraw={WhoWinAndPosition}/>
        <div className='tic-tac-toe-container'>
          {matriz.map((line, lineIndex) => 
            line.map((colum, colIndex) => 
              <div 
                className='position-box'
                key={colIndex}
                onClick={() => handleClick(lineIndex, colIndex)}
              >
                {colum}
              </div>
          ))}
        </div>
      </div>
      <AnimatePresence mode='wait'>
        {
          WhoWinAndPosition.winner !== undefined && 
            <motion.div
              className='button'
              key={matriz}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration : 0.2}}
              whileHover={{
                scale: (1.1)
              }}
              onClick={resetEverything}
            >
              <h1>Play again?</h1>
            </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default App
