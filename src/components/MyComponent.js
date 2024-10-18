import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const ballPositionRef = useRef({ x: 500, y: 600 });
  const velocityRef = useRef({ x: 8, y: 8 });
  const paddle1PositionRef = useRef({ x: 450, y: 50 });  
  const paddle2PositionRef = useRef({ x: 450, y: 1100 });  

  const paddleWidth = 100;
  const paddleHeight = 20;
  const ballRadius = 15;

  const paddle1VelocityRef = useRef(0);  
  const paddle2VelocityRef = useRef(0);  

  let scoreP1=0
  let scoreP2=0
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1200;

    let animationId;

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); 

      context.beginPath();
      context.font = "16px Ari";
      context.fillStyle = "0000FF";
      context.fillText(`scoreP1: ${scoreP1}`,8,20)
      context.closePath();

      context.beginPath();
      context.font = "16px Ari";
      context.fillStyle = "0000FF";
      context.fillText(`scoreP2: ${scoreP2}`,8,1180)
      context.closePath();


      context.beginPath();
      context.rect(paddle1PositionRef.current.x, paddle1PositionRef.current.y, paddleWidth, paddleHeight);
      context.fillStyle = '#0000FF';
      context.fill();
      context.closePath();

     
      context.beginPath();
      context.rect(paddle2PositionRef.current.x, paddle2PositionRef.current.y, paddleWidth, paddleHeight);
      context.fillStyle = '#0000FF';
      context.fill();
      context.closePath();

 
      context.beginPath();
      context.arc(ballPositionRef.current.x, ballPositionRef.current.y, ballRadius, 0, Math.PI * 2, false);
      context.fillStyle = '#FF0000';
      context.fill();
      context.closePath();

      
      context.fillStyle = 'green';
      context.fillRect(350, 0, 300, 20);  
      context.fillRect(350, canvas.height - 20, 300, 20);  

      
      paddle1PositionRef.current.x += paddle1VelocityRef.current;
     
      if (paddle1PositionRef.current.x < 0) {
        paddle1PositionRef.current.x = 0;
      }
      if (paddle1PositionRef.current.x + paddleWidth > canvas.width) {
        paddle1PositionRef.current.x = canvas.width - paddleWidth;
      }

    
      paddle2PositionRef.current.x += paddle2VelocityRef.current;
      
      if (paddle2PositionRef.current.x < 0) {
        paddle2PositionRef.current.x = 0;
      }
      if (paddle2PositionRef.current.x + paddleWidth > canvas.width) {
        paddle2PositionRef.current.x = canvas.width - paddleWidth;
      }

    
      ballPositionRef.current.x += velocityRef.current.x;
      ballPositionRef.current.y += velocityRef.current.y;

     
      if (ballPositionRef.current.x + ballRadius > canvas.width || ballPositionRef.current.x - ballRadius < 0) {
        velocityRef.current.x = -velocityRef.current.x;
      }

      
      if (ballPositionRef.current.y - ballRadius <= 0 || ballPositionRef.current.y + ballRadius >= canvas.height) {
        velocityRef.current.y = -velocityRef.current.y;
      }

     
      if (
        ballPositionRef.current.y - ballRadius <= paddle1PositionRef.current.y + paddleHeight &&
        ballPositionRef.current.x > paddle1PositionRef.current.x &&
        ballPositionRef.current.x < paddle1PositionRef.current.x + paddleWidth
      ) {
        velocityRef.current.y = -velocityRef.current.y;
      }

   
      if (
        ballPositionRef.current.y + ballRadius >= paddle2PositionRef.current.y &&
        ballPositionRef.current.x > paddle2PositionRef.current.x &&
        ballPositionRef.current.x < paddle2PositionRef.current.x + paddleWidth
      ) {
        velocityRef.current.y = -velocityRef.current.y;
      }

   
      if (
        ballPositionRef.current.y - ballRadius < 20 && ballPositionRef.current.x >= 350 && ballPositionRef.current.x <= 650
        
      ) {
       
        ballPositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        velocityRef.current = { x: 8, y: 8 };
        scoreP2++  
      }
      else if(ballPositionRef.current.y + ballRadius > canvas.height - 20 && ballPositionRef.current.x >= 350 && ballPositionRef.current.x <= 650

      ) {
       
        ballPositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
        velocityRef.current = { x: 8, y: 8 };
        scoreP1++  
      } 
      

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
  
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'a':
          paddle1VelocityRef.current = -5;  
          break;
        case 'd':
          paddle1VelocityRef.current = 5;  
          break;
        case 'ArrowLeft':
          paddle2VelocityRef.current = -5;  
          break;
        case 'ArrowRight':
          paddle2VelocityRef.current = 5;  
          break;
        default:
          break;
      }
    };

    
    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'a':
        case 'd':
          paddle1VelocityRef.current = 0;  
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          paddle2VelocityRef.current = 0; 
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="center-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasComponent;
