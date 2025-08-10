import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Animation helper
const animateCell = (element, type) => {
  if (!element) return

  if (type === "visited") {
    element.style.transform = "scale(0.8)"
    element.style.opacity = "0.5"
    setTimeout(() => {
      element.style.transform = "scale(1)"
      element.style.opacity = "1"
    }, 50)
  } else if (type === "path") {
    element.style.transform = "scale(1.2)"
    setTimeout(() => {
      element.style.transform = "scale(1)"
    }, 150)
  }
}

// Algorithm implementations with no-path detection
const algorithms = {
  astar: (grid, start, end) => {
    const rows = grid.length
    const cols = grid[0].length
    const visited = []
    const path = []

    const getNeighbors = (row, col) => {
      const neighbors = []
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          neighbors.push([newRow, newCol])
        }
      }
      return neighbors
    }

    const heuristic = (row, col) => {
      return Math.abs(row - end[0]) + Math.abs(col - end[1])
    }

    const openSet = [[...start, 0, heuristic(...start), null]]
    const closedSet = new Set()
    const gScore = {}
    gScore[`${start[0]},${start[1]}`] = 0

    while (openSet.length > 0) {
      openSet.sort((a, b) => a[3] - b[3])
      const current = openSet.shift()
      const [row, col, g, f, parent] = current
      const key = `${row},${col}`

      if (closedSet.has(key)) continue
      closedSet.add(key)
      visited.push([row, col])

      if (row === end[0] && col === end[1]) {
        let curr = current
        while (curr) {
          path.unshift([curr[0], curr[1]])
          curr = curr[4]
        }
        break
      }

      for (const [nRow, nCol] of getNeighbors(row, col)) {
        const nKey = `${nRow},${nCol}`
        if (grid[nRow][nCol] === "wall" || closedSet.has(nKey)) continue

        const tentativeG = g + 1
        if (!gScore[nKey] || tentativeG < gScore[nKey]) {
          gScore[nKey] = tentativeG
          const h = heuristic(nRow, nCol)
          openSet.push([nRow, nCol, tentativeG, tentativeG + h, current])
        }
      }
    }

    return { visited, path, pathFound: path.length > 0 }
  },

  bfs: (grid, start, end) => {
    const rows = grid.length
    const cols = grid[0].length
    const visited = []
    const path = []

    const queue = [{ row: start[0], col: start[1], parent: null }]
    const visitedSet = new Set([`${start[0]},${start[1]}`])
    const parentMap = new Map()

    while (queue.length > 0) {
      const current = queue.shift()
      const { row, col, parent } = current

      visited.push([row, col])

      if (row === end[0] && col === end[1]) {
        const curr = current
        const pathNodes = []
        pathNodes.push([row, col])

        let parentKey = `${row},${col}`
        while (parentMap.has(parentKey)) {
          const parentNode = parentMap.get(parentKey)
          pathNodes.unshift([parentNode.row, parentNode.col])
          parentKey = `${parentNode.row},${parentNode.col}`
        }

        path.push(...pathNodes)
        break
      }

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        const key = `${newRow},${newCol}`

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          grid[newRow][newCol] !== "wall" &&
          !visitedSet.has(key)
        ) {
          visitedSet.add(key)
          const newNode = { row: newRow, col: newCol, parent: current }
          parentMap.set(key, current)
          queue.push(newNode)
        }
      }
    }

    return { visited, path, pathFound: path.length > 0 }
  },

  dijkstra: (grid, start, end) => {
    const rows = grid.length
    const cols = grid[0].length
    const visited = []
    const path = []

    const distances = {}
    const previous = {}
    const unvisited = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`
        distances[key] = r === start[0] && c === start[1] ? 0 : Number.POSITIVE_INFINITY
        previous[key] = null
        if (grid[r][c] !== "wall") {
          unvisited.push([r, c])
        }
      }
    }

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => distances[`${a[0]},${a[1]}`] - distances[`${b[0]},${b[1]}`])
      const [row, col] = unvisited.shift()
      const key = `${row},${col}`

      if (distances[key] === Number.POSITIVE_INFINITY) break

      visited.push([row, col])

      if (row === end[0] && col === end[1]) {
        let curr = key
        while (curr) {
          const [r, c] = curr.split(",").map(Number)
          path.unshift([r, c])
          curr = previous[curr]
        }
        break
      }

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        const newKey = `${newRow},${newCol}`

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] !== "wall") {
          const alt = distances[key] + 1
          if (alt < distances[newKey]) {
            distances[newKey] = alt
            previous[newKey] = key
          }
        }
      }
    }

    return { visited, path, pathFound: path.length > 0 }
  },
}

// Graph visualization component
const PathGraph = ({ path, algorithm }) => {
  if (!path || path.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">📈 Path Flow Graph</h3>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {path.map((node, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full text-sm font-bold shadow-md border-2 border-yellow-300">
                {index + 1}
              </div>
              <div className="text-xs text-gray-300 mt-1 font-medium">
                ({node[0]},{node[1]})
              </div>
            </div>
            {index < path.length - 1 && (
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-sm text-gray-300 space-y-2  p-4 rounded-lg">
        <p>
          <span className="font-semibold">Total Steps:</span> {path.length}
        </p>
        <p>
          <span className="font-semibold">Start Position:</span> ({path[0]?.[0]}, {path[0]?.[1]})
        </p>
        <p>
          <span className="font-semibold">End Position:</span> ({path[path.length - 1]?.[0]},{" "}
          {path[path.length - 1]?.[1]})
        </p>
        <p className="text-xs text-gray-300 mt-2">
          💡 Numbers in circles match the sequence numbers shown in the grid path
        </p>
      </div>
    </motion.div>
  )
}

const AlgorithmVisualizer = () => {
  // State management
  const [algorithm, setAlgorithm] = useState("astar")
  const [speed, setSpeed] = useState(0.5)
  const [isRunning, setIsRunning] = useState(false)
  const [grid, setGrid] = useState([])
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [mode, setMode] = useState("start")
  const [stats, setStats] = useState({ steps: 0, pathLength: 0, time: 0 })
  const [pathFound, setPathFound] = useState(true)
  const [finalPath, setFinalPath] = useState([])
  const [pathNumbers, setPathNumbers] = useState({}) // Store path sequence numbers

  const gridRef = useRef(null)

  // Fixed 7x7 grid
  const rows = 7
  const cols = 7

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill("empty"))
    setGrid(newGrid)
    setStart(null)
    setEnd(null)
    setStats({ steps: 0, pathLength: 0, time: 0 })
    setPathFound(true)
    setFinalPath([])
    setPathNumbers({})
  }, [])

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (isRunning) return

    const newGrid = [...grid]

    if (mode === "start") {
      if (start) {
        newGrid[start[0]][start[1]] = "empty"
      }
      if (end && end[0] === row && end[1] === col) {
        setEnd(null)
      }
      newGrid[row][col] = "start"
      setStart([row, col])
      setMode("end")
    } else if (mode === "end") {
      if (end) {
        newGrid[end[0]][end[1]] = "empty"
      }
      if (start && start[0] === row && start[1] === col) {
        setStart(null)
      }
      newGrid[row][col] = "end"
      setEnd([row, col])
      setMode("wall")
    } else if (mode === "wall") {
      if (start && start[0] === row && start[1] === col) return
      if (end && end[0] === row && end[1] === col) return

      newGrid[row][col] = newGrid[row][col] === "wall" ? "empty" : "wall"
    }

    setGrid(newGrid)
  }

  // Generate random maze
  const generateMaze = () => {
    if (isRunning) return

    const newGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill("empty"))

    // Add random walls (25% density for 7x7 grid)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.25) {
          newGrid[r][c] = "wall"
        }
      }
    }

    // Clear start and end positions if they exist
    if (start) newGrid[start[0]][start[1]] = "start"
    if (end) newGrid[end[0]][end[1]] = "end"

    setGrid(newGrid)
  }

  // Reset grid
  const resetGrid = () => {
    if (isRunning) return

    const newGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill("empty"))
    setGrid(newGrid)
    setStart(null)
    setEnd(null)
    setMode("start")
    setStats({ steps: 0, pathLength: 0, time: 0 })
    setPathFound(true)
    setFinalPath([])
    setPathNumbers({})
  }

  // Run algorithm
  const runAlgorithm = async () => {
    if (!start || !end || isRunning) return

    setIsRunning(true)
    setPathFound(true)
    setFinalPath([])
    setPathNumbers({})
    const startTime = Date.now()

    try {
      // Clear previous visualization
      const newGrid = grid.map((row) => row.map((cell) => (["visited", "path"].includes(cell) ? "empty" : cell)))
      setGrid([...newGrid])

      // Small delay to ensure grid is updated
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Run selected algorithm
      const { visited, path, pathFound: found } = algorithms[algorithm](newGrid, start, end)

      if (!found) {
        setPathFound(false)
        const endTime = Date.now()
        setStats({
          steps: visited.length,
          pathLength: 0,
          time: endTime - startTime,
        })
        setIsRunning(false)
        return
      }

      // Animate visited cells
      for (let i = 0; i < visited.length; i++) {
        const [row, col] = visited[i]
        if ((row !== start[0] || col !== start[1]) && (row !== end[0] || col !== end[1])) {
          newGrid[row][col] = "visited"
          setGrid([...newGrid])

          // Animate cell
          const cellElement = gridRef.current?.children[row * cols + col]
          animateCell(cellElement, "visited")

          await new Promise((resolve) => setTimeout(resolve, speed * 100))
        }
      }

      // Small pause before path animation
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Create path numbers mapping
      const pathNumbersMap = {}
      path.forEach((node, index) => {
        pathNumbersMap[`${node[0]},${node[1]}`] = index + 1
      })
      setPathNumbers(pathNumbersMap)

      // Animate path
      for (let i = 0; i < path.length; i++) {
        const [row, col] = path[i]
        if ((row !== start[0] || col !== start[1]) && (row !== end[0] || col !== end[1])) {
          newGrid[row][col] = "path"
          setGrid([...newGrid])

          // Animate path cell
          const cellElement = gridRef.current?.children[row * cols + col]
          animateCell(cellElement, "path")

          await new Promise((resolve) => setTimeout(resolve, speed * 50))
        }
      }

      const endTime = Date.now()
      setStats({
        steps: visited.length,
        pathLength: path.length,
        time: endTime - startTime,
      })
      setFinalPath(path)
    } catch (error) {
      console.error("Algorithm execution error:", error)
    } finally {
      setIsRunning(false)
    }
  }

  // Get cell content (number for path cells)
  const getCellContent = (rowIndex, colIndex, cellValue) => {
    const key = `${rowIndex},${colIndex}`

    if (cellValue === "start") {
      return <span className="text-white font-bold text-lg">S</span>
    }
    if (cellValue === "end") {
      return <span className="text-white font-bold text-lg">E</span>
    }
    if (cellValue === "path" && pathNumbers[key]) {
      return <span className="text-white font-bold text-lg drop-shadow-md">{pathNumbers[key]}</span>
    }
    return null
  }

  // Get cell style
  const getCellStyle = (cellValue) => {
    const baseStyle =
      "border-2 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg shadow-md flex items-center justify-center"

    switch (cellValue) {
      case "start":
        return `${baseStyle} bg-green-500 border-green-400 shadow-green-200`
      case "end":
        return `${baseStyle} bg-red-500 border-red-400 shadow-red-200`
      case "wall":
        return `${baseStyle} bg-gray-800 border-gray-700 shadow-gray-400`
      case "visited":
        return `${baseStyle} bg-blue-400 border-blue-300 shadow-blue-200`
      case "path":
        return `${baseStyle} bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-300 shadow-yellow-200`
      default:
        return `${baseStyle} bg-white border-gray-300 hover:bg-gray-50 shadow-gray-100`
    }
  }

  // Algorithm descriptions
  const descriptions = {
    astar: {
      title: "A* Search Algorithm",
      emoji: "🧭",
      description: "Smart pathfinding using heuristics to find the optimal path efficiently.",
    },
    bfs: {
      title: "Breadth-First Search",
      emoji: "🔍",
      description: "Explores all neighbors level by level, guaranteeing the shortest path.",
    },
    dijkstra: {
      title: "Dijkstra's Algorithm",
      emoji: "📏",
      description: "Classic algorithm that finds the shortest path by exploring systematically.",
    },
  }

  return (
    <div className="min-h-screen  p-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pathfinding Algorithm Visualizer</h1>
        <p className="text-lg text-[#d1d5dc] max-w-3xl mx-auto">
          Interactive visualization tool to understand how different pathfinding algorithms work. Set start and end
          points, draw obstacles, and watch algorithms find the optimal path in real-time!
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" rounded-xl shadow-lg p-6 mb-8 "
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Algorithm Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black "
              disabled={isRunning}
            >
              <option value="astar">A* Search</option>
              <option value="bfs">BFS</option>
              <option value="dijkstra">Dijkstra's</option>
            </select>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Speed:</label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
              className="w-20 accent-blue-500"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-300">{speed}s</span>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <button
              onClick={runAlgorithm}
              disabled={!start || !end || isRunning}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              {isRunning ? "Running..." : "Find Path"}
            </button>
            <button
              onClick={resetGrid}
              disabled={isRunning}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              Reset
            </button>
            <button
              onClick={generateMaze}
              disabled={isRunning}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              Random Maze
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Grid Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2  rounded-xl shadow-lg p-6 "
        >
          {/* Legend */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <span className="font-medium text-gray-300">Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded border-2 border-red-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <span className="font-medium text-gray-300">End</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-800 rounded border-2 border-gray-700"></div>
                <span className="font-medium text-gray-300">Wall</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded border-2 border-blue-300"></div>
                <span className="font-medium text-gray-300">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded border-2 border-yellow-300 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="font-medium text-gray-300">Path (with sequence)</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                {!start
                  ? "🎯 Click any cell to set your starting point"
                  : !end
                    ? "🏁 Click another cell to set your destination"
                    : "🖱️ Click cells to toggle walls and obstacles"}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="flex justify-center">
            <div
              ref={gridRef}
              className="grid gap-2 p-4  rounded-lg  "
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${getCellStyle(cell)} w-16 h-16 md:w-20 md:h-20`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {getCellContent(rowIndex, colIndex, cell)}
                  </div>
                )),
              )}
            </div>
          </div>

          {/* No Path Found Message */}
          {!pathFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="text-lg font-bold text-red-800">No Path Found!</h3>
                  <p className="text-red-700">
                    The algorithm couldn't find a path to the destination. Try removing some walls or choosing different
                    start/end points.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Algorithm Info */}
             {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className=" rounded-xl shadow-lg p-6 "
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">🎮 How to Use</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-green-600 font-bold">1.</span>
                <p className="text-gray-300">Click to set start point (green with "S")</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold">2.</span>
                <p className="text-gray-300">Click to set end point (red with "E")</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-600 font-bold">3.</span>
                <p className="text-gray-300">Click to toggle walls (obstacles)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">4.</span>
                <p className="text-gray-300">Choose algorithm and click "Find Path"</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold">5.</span>
                <p className="text-gray-300">Path cells show sequence numbers (1, 2, 3...)</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className=" rounded-xl shadow-lg p-6  "
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{descriptions[algorithm].emoji}</span>
              <h3 className="text-xl font-bold text-white">{descriptions[algorithm].title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{descriptions[algorithm].description}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl shadow-lg p-6  "
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">📊 Performance Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3  rounded-lg">
                <span className="text-gray-300 font-medium">Cells Explored:</span>
                <span className="font-bold text-blue-600 text-lg">{stats.steps}</span>
              </div>
              <div className="flex justify-between items-center p-3  rounded-lg">
                <span className="text-gray-300 font-medium">Path Length:</span>
                <span className="font-bold text-yellow-600 text-lg">{stats.pathLength}</span>
              </div>
              <div className="flex justify-between items-center p-3  rounded-lg">
                <span className="text-gray-300 font-medium">Time:</span>
                <span className="font-bold text-green-600 text-lg">{stats.time}ms</span>
              </div>
            </div>
          </motion.div>

       
        </div>
      </div>

      {/* Path Graph */}
      {finalPath.length > 0 && (
        <div className="mt-8">
          <PathGraph path={finalPath} algorithm={algorithm} />
        </div>
      )}
    </div>
  )
}

export default AlgorithmVisualizer
