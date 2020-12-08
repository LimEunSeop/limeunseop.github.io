import React, { useEffect } from 'react'

interface Props extends React.HTMLAttributes<HTMLCanvasElement> {
  count: number
}

const HistoryBackground = ({ count, ...props }: Props) => {
  useEffect(() => {
    var canvas: HTMLCanvasElement = document.getElementById('historybackground__canvas__madeby__seop') as HTMLCanvasElement
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d')
      if (ctx !== null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height) // 덧대어지는것 방지 지우기
        ctx.strokeStyle = '#5353D4'
        ctx.beginPath()
        // init circle
        ctx.lineWidth = 8
        ctx.arc(25, 35, 15, 0, Math.PI * 2, true)
        ctx.stroke()

        for (let i = 0; i < count; i++) {
          if (i % 2 === 0) {
            ctx.beginPath()
            ctx.lineWidth = 6
            ctx.moveTo(25, 50 + i * 130)
            ctx.lineTo(25, 75 + i * 130)
            ctx.quadraticCurveTo(25, 100 + i * 130, 50, 100 + i * 130)
            ctx.lineTo(285, 100 + i * 130)
            ctx.quadraticCurveTo(310, 100 + i * 130, 310, 125 + i * 130)
            ctx.lineTo(310, 150 + i * 130)
            ctx.stroke()
            ctx.beginPath()
            ctx.lineWidth = 8
            ctx.arc(310, 165 + i * 130, 15, Math.PI / -2, Math.PI * 2, false)
            ctx.stroke()
          } else {
            ctx.beginPath()
            ctx.lineWidth = 6
            ctx.moveTo(310, 180 + (i - 1) * 130)
            ctx.lineTo(310, 205 + (i - 1) * 130)
            ctx.quadraticCurveTo(310, 230 + (i - 1) * 130, 285, 230 + (i - 1) * 130)
            ctx.lineTo(50, 230 + (i - 1) * 130)
            ctx.quadraticCurveTo(25, 230 + (i - 1) * 130, 25, 255 + (i - 1) * 130)
            ctx.lineTo(25, 280 + (i - 1) * 130)
            ctx.stroke()
            ctx.beginPath()
            ctx.lineWidth = 8
            ctx.arc(25, 295 + (i - 1) * 130, 15, Math.PI / -2, Math.PI * 2, false)
            ctx.stroke()
          }
        }

        ctx.stroke()
      }
    }
  }, [count])

  return <canvas id="historybackground__canvas__madeby__seop" width="335" height={200 + (count - 1) * 130} {...props}></canvas>
}

export default HistoryBackground
