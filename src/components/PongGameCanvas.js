"use client";
import React, { useState, useEffect, useRef } from 'react';

const PongBackground = ({ onBallPositionChange }) => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const ballRef = useRef({ x: 50, y: 50, speedX: 0.3, speedY: 0.3, size: 1 });
    const leftPaddleRef = useRef({ x: 2, y: 50, width: 1.5, height: 15, vy: 0 });
    const rightPaddleRef = useRef({ x: 98, y: 50, width: 1.5, height: 15, vy: 0 });
    const lastTimeRef = useRef(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const isMobile = window.innerWidth <= 768;
            ballRef.current.size = isMobile ? 2.4 : 1;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        startGame();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const startGame = () => {
        if (gameStarted) return;
        setGameStarted(true);
        const randomY =  42 +(Math.random() - 0.5) * 10;
        const initialSpeedX = Math.random() > 0.5 ? 0.4 : -0.4;
        const initialSpeedY = (Math.random() - 0.5) * 0.6;
        const isMobile = window.innerWidth <= 768;
        ballRef.current = {
            x: 50,
            y: randomY,
            speedX: isMobile ? initialSpeedX * 1.5 : initialSpeedX,
            speedY: isMobile ? initialSpeedY * 1.5 : initialSpeedY,
            size: isMobile ? 2.4 : 1
        };
        leftPaddleRef.current.vy = 0;
        rightPaddleRef.current.vy = 0;
        lastTimeRef.current = 0;
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    };


    const gameLoop = (currentTime) => {
        if (!lastTimeRef.current) {
            lastTimeRef.current = currentTime;
            animationFrameRef.current = requestAnimationFrame(gameLoop);
            return;
        }
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;
        updateGameState(deltaTime);
        drawGame();
        animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    const updateGameState = (deltaTime) => {
        const dt = deltaTime / 16;
        const ball = ballRef.current;
        const leftPaddle = leftPaddleRef.current;
        const rightPaddle = rightPaddleRef.current;

        const actualBallSize = ball.size * 2;

        // Aktualizacja pozycji piłki
        const newX = ball.x + ball.speedX * dt;
        const newY = ball.y + ball.speedY * dt;

        // Kolizja z lewą paletką
        if (ball.speedX < 0) {
            const ballLeft = newX - actualBallSize/2;
            const paddleRight = leftPaddle.x + leftPaddle.width / 2;
            const paddleLeft = leftPaddle.x - leftPaddle.width / 2;
            const ballTop = newY - actualBallSize/2;
            const ballBottom = newY + actualBallSize/2;
            const paddleTop = leftPaddle.y - leftPaddle.height / 2;
            const paddleBottom = leftPaddle.y + leftPaddle.height / 2;

            if (ballLeft <= paddleRight &&
                ballLeft >= paddleLeft &&
                ballBottom >= paddleTop &&
                ballTop <= paddleBottom) {
                ball.speedX = Math.abs(ball.speedX);
                const relativeIntersectY = (leftPaddle.y - newY) / (leftPaddle.height / 2);
                ball.speedY = -relativeIntersectY * Math.abs(ball.speedX) * 0.8;
                ball.x = paddleRight + actualBallSize/2;
            }
        }

        // Kolizja z prawą paletką
        if (ball.speedX > 0) {
            const ballRight = newX + actualBallSize/2;
            const paddleLeft = rightPaddle.x - rightPaddle.width / 2;
            const paddleRight = rightPaddle.x + rightPaddle.width / 2;
            const ballTop = newY - actualBallSize/2;
            const ballBottom = newY + actualBallSize/2;
            const paddleTop = rightPaddle.y - rightPaddle.height / 2;
            const paddleBottom = rightPaddle.y + rightPaddle.height / 2;

            if (ballRight >= paddleLeft &&
                ballRight <= paddleRight &&
                ballBottom >= paddleTop &&
                ballTop <= paddleBottom) {
                ball.speedX = -Math.abs(ball.speedX);
                const relativeIntersectY = (rightPaddle.y - newY) / (rightPaddle.height / 2);
                ball.speedY = -relativeIntersectY * Math.abs(ball.speedX) * 0.8;
                ball.x = paddleLeft - actualBallSize/2;
            }
        }

        // Aktualizacja pozycji piłki
        ball.x += ball.speedX * dt;
        ball.y += ball.speedY * dt;

        // Kolizje ze ścianami (góra/dół)
        if (ball.y - actualBallSize/2 <= 0) {
            ball.speedY = Math.abs(ball.speedY);
            ball.y = actualBallSize/2;
        }
        if (ball.y + actualBallSize/2 >= 100) {
            ball.speedY = -Math.abs(ball.speedY);
            ball.y = 100 - actualBallSize/2;
        }


        // AI dla paletek
        const updatePaddleAI = (paddle, isLeftPaddle) => {
            const paddleCenter = paddle.y;
            const paddleHeight = paddle.height;
            const reactionDelay = 0.15; // Opóźnienie reakcji w sekundach
            const precision = 0.7; // Im wyższa wartość, tym większa precyzja (0-1)
            const maxSpeedMultiplier = 1.2; // Maksymalna prędkość względem podstawowej

            // Oblicz przewidywaną pozycję piłki
            const ballSpeed = Math.sqrt(ball.speedX ** 2 + ball.speedY ** 2);
            const distanceToIntercept = isLeftPaddle
                ? ball.x - paddle.x - paddle.width/2
                : paddle.x - ball.x - paddle.width/2;

            const timeToIntercept = Math.abs(distanceToIntercept / ball.speedX);
            const predictedY = ball.y + (ball.speedY * timeToIntercept);

            // Oblicz docelową pozycję z uwzględnieniem opóźnienia reakcji
            const targetY = predictedY + (ball.speedY * reactionDelay * 100);

            // Ogranicz target do obszaru gry uwzględniając wielkość paletki
            const minTarget = paddleHeight/2 + 2;
            const maxTarget = 100 - paddleHeight/2 - 2;
            const clampedTarget = Math.min(Math.max(targetY, minTarget), maxTarget);

            // Oblicz potrzebną zmianę pozycji
            let diff = clampedTarget - paddleCenter;

            // Dodaj "ludzki" błąd przewidywania
            const errorMagnitude = Math.abs(diff) * (1 - precision);
            diff += (Math.random() - 0.5) * errorMagnitude * 2;

            // Dynamiczne dostosowanie parametrów ruchu
            const acceleration = 0.02 * (1 + Math.abs(diff)/50);
            const maxSpeed = 0.4 * Math.min(1 + Math.abs(diff)/30, maxSpeedMultiplier);

            // Płynna akceleracja
            paddle.vy += diff * acceleration * dt;

            // Ograniczenie prędkości z histerezą
            if (Math.abs(paddle.vy) > maxSpeed) {
                paddle.vy = maxSpeed * Math.sign(paddle.vy);
            }

            // Tłumienie prędkości gdy blisko celu
            if (Math.abs(diff) < 2) {
                paddle.vy *= 0.92;
            }

            // Aktualizacja pozycji
            paddle.y += paddle.vy * dt;

            // Dodatkowe tłumienie przy krawędziach
            if (paddle.y < minTarget + 5 || paddle.y > maxTarget - 5) {
                paddle.vy *= 0.85;
            }
        };

        // Aktualizuj obie paletki
        updatePaddleAI(leftPaddleRef.current, true);
        updatePaddleAI(rightPaddleRef.current, false);

        // Ograniczenie ruchu paletek
        leftPaddle.y = Math.max(leftPaddle.height / 2, Math.min(100 - leftPaddle.height / 2, leftPaddle.y));
        rightPaddle.y = Math.max(rightPaddle.height / 2, Math.min(100 - rightPaddle.height / 2, rightPaddle.y));
    };

    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.fillStyle = 'rgba(60,60,60,1)';
        ctx.fill();
    };

    const drawGame = () => {
        const canvas = canvasRef.current;
        const isMobile = window.innerWidth <= 768;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Rysuj piłkę
        ctx.fillStyle = 'rgba(60,60,60,1)';
        const ball = ballRef.current;
        const ballX = (ball.x / 100) * canvas.width;
        const ballY = (ball.y / 100) * canvas.height;
        let ballSize = (ball.size / 100) * canvas.width
        if (isMobile) {
            ballSize *= 2;
        }

        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();

        if (onBallPositionChange) {
            onBallPositionChange({
                x: ballX,
                y: ballY,
                radius: ballSize
            });
        }

        // Rysuj paletki
        const drawPaddle = (paddle) => {
            const paddleWidth = (canvas.width * paddle.width) / 100;
            const paddleHeight = (canvas.height * paddle.height) / 100;
            const xCoord = (canvas.width * paddle.x) / 100 - paddleWidth / 2;
            const yCoord = (canvas.height * paddle.y) / 100 - paddleHeight / 2;
            const radius = paddleWidth * 0.4;
            drawRoundedRect(ctx, xCoord, yCoord, paddleWidth, paddleHeight, radius);
        };

        drawPaddle(leftPaddleRef.current);
        drawPaddle(rightPaddleRef.current);
    };


    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default PongBackground;