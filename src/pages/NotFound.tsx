import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const NotFound = () => {
  const location = useLocation();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const gameLoopRef = useRef<number | null>(null);
  const directionRef = useRef<Direction>("RIGHT");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Load high score from localStorage
    const saved = localStorage.getItem("snake-high-score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, [location.pathname]);

  const generateFood = useCallback(
    (currentSnake: Position[]): Position => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        currentSnake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y
        )
      );
      return newFood;
    },
    []
  );

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 7, y: 7 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  }, [generateFood]);

  const gameLoop = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameStarted(false);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameStarted(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snake-high-score", newScore.toString());
          }
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, highScore]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = window.setInterval(gameLoop, INITIAL_SPEED);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver && e.code === "Space") {
        resetGame();
        return;
      }

      if (!gameStarted) return;

      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        KeyW: "UP",
        KeyS: "DOWN",
        KeyA: "LEFT",
        KeyD: "RIGHT",
      };

      const newDirection = keyMap[e.code];
      if (!newDirection) return;

      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposites[newDirection] !== directionRef.current) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, resetGame]);

  // Mobile touch controls
  const handleTouch = (dir: Direction) => {
    if (!gameStarted && !gameOver) {
      resetGame();
      return;
    }

    if (!gameStarted) return;

    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (opposites[dir] !== directionRef.current) {
      directionRef.current = dir;
      setDirection(dir);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="text-center mb-6">
        <pre className="text-lg sm:text-xl font-mono text-primary mb-2">
          $ cd {location.pathname}
        </pre>
        <p className="text-muted-foreground font-mono text-sm">
          bash: cd: {location.pathname}: No such file or directory
        </p>
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold mb-2 font-mono text-primary">
        404
      </h1>
      <p className="text-muted-foreground mb-6">
        Page not found. Play some Snake while you're here?
      </p>

      {/* Game Container */}
      <div className="relative mb-4">
        <div
          className="border-2 border-border rounded-lg bg-card relative overflow-hidden"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm ${index === 0 ? "bg-primary" : "bg-primary/70"
                }`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-green-500 rounded-full"
            style={{
              left: food.x * CELL_SIZE + 2,
              top: food.y * CELL_SIZE + 2,
              width: CELL_SIZE - 4,
              height: CELL_SIZE - 4,
            }}
          />

          {/* Start/Game Over Overlay */}
          {!gameStarted && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
              {gameOver ? (
                <>
                  <p className="text-xl font-bold text-primary mb-2">
                    Game Over!
                  </p>
                  <p className="text-muted-foreground mb-4">Score: {score}</p>
                </>
              ) : (
                <p className="text-muted-foreground mb-4">Ready to play?</p>
              )}
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                {gameOver ? "Play Again" : "Start Game"}
              </button>
              <p className="text-xs text-muted-foreground mt-3 hidden sm:block">
                Press SPACE or use WASD / Arrow keys
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="flex gap-6 font-mono text-sm mb-4">
        <span className="text-muted-foreground">
          Score: <span className="text-foreground">{score}</span>
        </span>
        <span className="text-muted-foreground">
          Best: <span className="text-primary">{highScore}</span>
        </span>
      </div>

      {/* Mobile Controls */}
      <div className="sm:hidden grid grid-cols-3 gap-2 mb-6" style={{ width: 150 }}>
        <div />
        <button
          onClick={() => handleTouch("UP")}
          className="p-3 bg-muted rounded-md active:bg-muted/70"
        >
          ▲
        </button>
        <div />
        <button
          onClick={() => handleTouch("LEFT")}
          className="p-3 bg-muted rounded-md active:bg-muted/70"
        >
          ◀
        </button>
        <button
          onClick={() => handleTouch("DOWN")}
          className="p-3 bg-muted rounded-md active:bg-muted/70"
        >
          ▼
        </button>
        <button
          onClick={() => handleTouch("RIGHT")}
          className="p-3 bg-muted rounded-md active:bg-muted/70"
        >
          ▶
        </button>
      </div>

      <Link
        to="/"
        className="text-primary hover:underline underline-offset-2 font-medium"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
