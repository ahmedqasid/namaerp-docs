<template>
  <div class="dashboard-container">
    <div class="controls">
      <div class="control-group">
        <label>Columns: {{ columnCount }}</label>
        <input type="range" v-model.number="columnCount" min="2" max="12" />
      </div>
      <div class="control-group">
        <label>Rows: {{ rowCount }}</label>
        <input type="range" v-model.number="rowCount" min="2" max="10" />
      </div>
      <div class="control-group">
        <label>Width: {{ screenWidthInPixels }}px</label>
        <input type="range" v-model.number="screenWidthInPixels" min="400" max="1200" />
      </div>
      <div class="control-group">
        <label>Height: {{ screenHeightInPixels }}px</label>
        <input type="range" v-model.number="screenHeightInPixels" min="300" max="800" />
      </div>
      <button @click="addElement" class="add-btn">Add Element</button>
    </div>

    <div class="canvas-container">
      <canvas
          ref="canvas"
          :width="screenWidthInPixels"
          :height="screenHeightInPixels"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'

interface DashboardElement {
  id: string
  row: number
  column: number
  rowSpan: number
  columnSpan: number
  title: string
}

interface Point {
  x: number
  y: number
}

interface ResizeHandle {
  x: number
  y: number
  width: number
  height: number
  direction: 'se' | 'e' | 's'
  elementId: string
}

// Reactive properties
const columnCount = ref(4)
const rowCount = ref(4)
const screenWidthInPixels = ref(800)
const screenHeightInPixels = ref(600)

// Initial elements
const elements = reactive<DashboardElement[]>([
  { id: '1', row: 1, column: 1, rowSpan: 2, columnSpan: 2, title: "Element 1" },
  { id: '2', row: 1, column: 3, rowSpan: 1, columnSpan: 1, title: "Element 2" },
  { id: '3', row: 2, column: 3, rowSpan: 1, columnSpan: 2, title: "Element 3" }
])

// Canvas and interaction state
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let isDragging = false
let isResizing = false
let dragStartPos: Point = { x: 0, y: 0 }
let dragOffset: Point = { x: 0, y: 0 }
let selectedElement: DashboardElement | null = null
let selectedHandle: ResizeHandle | null = null
let resizeHandles: ResizeHandle[] = []
let originalElementState: DashboardElement | null = null
let initialElementRect: { x: number, y: number, width: number, height: number } | null = null

// Computed properties
const cellWidth = () => screenWidthInPixels.value / columnCount.value
const cellHeight = () => screenHeightInPixels.value / rowCount.value

// Helper functions
const getElementRect = (element: DashboardElement) => {
  return {
    x: (element.column - 1) * cellWidth(),
    y: (element.row - 1) * cellHeight(),
    width: element.columnSpan * cellWidth(),
    height: element.rowSpan * cellHeight()
  }
}

const pointInRect = (point: Point, rect: { x: number, y: number, width: number, height: number }) => {
  return point.x >= rect.x && point.x <= rect.x + rect.width &&
      point.y >= rect.y && point.y <= rect.y + rect.height
}

const snapToGrid = (x: number, y: number) => {
  const col = Math.max(1, Math.min(columnCount.value, Math.round(x / cellWidth()) + 1))
  const row = Math.max(1, Math.min(rowCount.value, Math.round(y / cellHeight()) + 1))
  return { row, column: col }
}

const isPositionOccupied = (row: number, col: number, excludeId?: string): boolean => {
  return elements.some(el => {
    if (excludeId && el.id === excludeId) return false
    return row >= el.row && row < el.row + el.rowSpan &&
        col >= el.column && col < el.column + el.columnSpan
  })
}

const findNextAvailablePosition = (rowSpan: number, columnSpan: number, excludeId?: string) => {
  for (let row = 1; row <= rowCount.value - rowSpan + 1; row++) {
    for (let col = 1; col <= columnCount.value - columnSpan + 1; col++) {
      let canPlace = true
      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + columnSpan; c++) {
          if (isPositionOccupied(r, c, excludeId)) {
            canPlace = false
            break
          }
        }
        if (!canPlace) break
      }
      if (canPlace) {
        return { row, column: col }
      }
    }
  }
  return { row: 1, column: 1 }
}

const resolveCollisions = (movedElementId: string) => {
  const movedElement = elements.find(el => el.id === movedElementId)
  if (!movedElement) return

  const conflictingElements = elements.filter(el => {
    if (el.id === movedElementId) return false

    const rowOverlap = !(el.row + el.rowSpan <= movedElement.row || movedElement.row + movedElement.rowSpan <= el.row)
    const colOverlap = !(el.column + el.columnSpan <= movedElement.column || movedElement.column + movedElement.columnSpan <= el.column)

    return rowOverlap && colOverlap
  })

  conflictingElements.forEach(element => {
    const newPos = findNextAvailablePosition(element.rowSpan, element.columnSpan, element.id)
    element.row = newPos.row
    element.column = newPos.column
  })
}

const createResizeHandles = (element: DashboardElement): ResizeHandle[] => {
  const rect = getElementRect(element)
  const handleSize = 10

  return [
    {
      x: rect.x + rect.width - handleSize / 2,
      y: rect.y + rect.height - handleSize / 2,
      width: handleSize,
      height: handleSize,
      direction: 'se',
      elementId: element.id
    },
    {
      x: rect.x + rect.width - handleSize / 2,
      y: rect.y + rect.height / 2 - handleSize / 2,
      width: handleSize,
      height: handleSize,
      direction: 'e',
      elementId: element.id
    },
    {
      x: rect.x + rect.width / 2 - handleSize / 2,
      y: rect.y + rect.height - handleSize / 2,
      width: handleSize,
      height: handleSize,
      direction: 's',
      elementId: element.id
    }
  ]
}

// Drawing functions
const drawGrid = () => {
  if (!ctx) return

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1

  // Vertical lines
  for (let i = 0; i <= columnCount.value; i++) {
    const x = i * cellWidth()
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, screenHeightInPixels.value)
    ctx.stroke()
  }

  // Horizontal lines
  for (let i = 0; i <= rowCount.value; i++) {
    const y = i * cellHeight()
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(screenWidthInPixels.value, y)
    ctx.stroke()
  }
}

const drawElement = (element: DashboardElement, isPreview = false) => {
  if (!ctx) return

  const rect = getElementRect(element)

  // Draw shadow (only for non-preview)
  if (!isPreview) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(rect.x + 2, rect.y + 2, rect.width, rect.height)
  }

  // Draw element
  ctx.fillStyle = isPreview ? 'rgba(224, 231, 255, 0.7)' : '#e0e7ff'
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height)

  // Draw border
  ctx.strokeStyle = selectedElement?.id === element.id ? '#3730a3' : (isPreview ? '#9ca3af' : '#4f46e5')
  ctx.lineWidth = selectedElement?.id === element.id ? 3 : 2
  if (isPreview) {
    ctx.setLineDash([5, 5])
  } else {
    ctx.setLineDash([])
  }
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
  ctx.setLineDash([])

  // Draw text
  ctx.fillStyle = isPreview ? '#6b7280' : '#1f2937'
  ctx.font = '14px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(
      element.title,
      rect.x + rect.width / 2,
      rect.y + rect.height / 2
  )
}

const drawResizeHandles = () => {
  if (!ctx || !selectedElement) return

  resizeHandles = createResizeHandles(selectedElement)

  resizeHandles.forEach(handle => {
    // Draw handle background
    ctx!.fillStyle = '#4f46e5'
    ctx!.fillRect(handle.x, handle.y, handle.width, handle.height)

    // Draw handle border
    ctx!.strokeStyle = '#ffffff'
    ctx!.lineWidth = 2
    ctx!.strokeRect(handle.x, handle.y, handle.width, handle.height)

    // Add a small inner highlight for better visibility
    ctx!.fillStyle = '#6366f1'
    ctx!.fillRect(handle.x + 1, handle.y + 1, handle.width - 2, handle.height - 2)
  })
}

const redraw = () => {
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, screenWidthInPixels.value, screenHeightInPixels.value)

  // Draw grid
  drawGrid()

  // Draw elements
  elements.forEach(element => {
    // Don't draw the element being dragged/resized in its original position
    if (isDragging && selectedElement?.id === element.id) return
    if (isResizing && selectedElement?.id === element.id) return
    drawElement(element)
  })

  // Draw preview of dragged/resized element
  if ((isDragging || isResizing) && selectedElement) {
    drawElement(selectedElement, true)
  }

  // Draw resize handles for selected element (always show when element is selected)
  if (selectedElement) {
    drawResizeHandles()
  }
}

// Mouse event handlers
const getMousePos = (event: MouseEvent): Point => {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0 }

  // getBoundingClientRect() returns coordinates relative to the viewport
  // and already accounts for page scroll in modern browsers
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Clamp to canvas bounds to prevent out-of-bounds coordinates
  const clampedX = Math.max(0, Math.min(screenWidthInPixels.value, x))
  const clampedY = Math.max(0, Math.min(screenHeightInPixels.value, y))

  return {
    x: clampedX,
    y: clampedY
  }
}

const getElementAtPoint = (point: Point): DashboardElement | null => {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i]
    const rect = getElementRect(element)
    if (pointInRect(point, rect)) {
      return element
    }
  }
  return null
}

const getResizeHandleAtPoint = (point: Point): ResizeHandle | null => {
  for (const handle of resizeHandles) {
    if (pointInRect(point, handle)) {
      return handle
    }
  }
  return null
}

const setCursor = (point: Point) => {
  if (!canvas.value) return

  const handle = getResizeHandleAtPoint(point)
  if (handle) {
    const cursor = handle.direction === 'se' ? 'se-resize' :
        handle.direction === 'e' ? 'e-resize' : 's-resize'
    canvas.value.style.cursor = cursor
  } else if (getElementAtPoint(point)) {
    canvas.value.style.cursor = 'move'
  } else {
    canvas.value.style.cursor = 'default'
  }
}

const onMouseDown = (event: MouseEvent) => {
  const mousePos = getMousePos(event)
  dragStartPos = mousePos

  // Check for resize handle first
  const handle = getResizeHandleAtPoint(mousePos)
  if (handle) {
    isResizing = true
    selectedHandle = handle
    selectedElement = elements.find(el => el.id === handle.elementId) || null
    if (selectedElement) {
      // Store original state and initial rect dimensions
      originalElementState = { ...selectedElement }
      initialElementRect = getElementRect(selectedElement)
    }
    return
  }

  // Check for element
  const element = getElementAtPoint(mousePos)
  if (element) {
    isDragging = true
    selectedElement = element
    // Store original state and initial rect dimensions
    originalElementState = { ...element }
    initialElementRect = getElementRect(element)

    // Calculate offset from element's top-left corner
    dragOffset = {
      x: mousePos.x - initialElementRect.x,
      y: mousePos.y - initialElementRect.y
    }
    redraw()
  } else {
    selectedElement = null
    redraw()
  }
}

const onMouseMove = (event: MouseEvent) => {
  const mousePos = getMousePos(event)

  if (isResizing && selectedHandle && selectedElement) {
    const deltaX = mousePos.x - dragStartPos.x
    const deltaY = mousePos.y - dragStartPos.y

    const rect = initialElementRect
    let newWidth = rect.width
    let newHeight = rect.height

    if (selectedHandle.direction === 'se' || selectedHandle.direction === 'e') {
      newWidth = Math.max(cellWidth(), rect.width + deltaX)
    }
    if (selectedHandle.direction === 'se' || selectedHandle.direction === 's') {
      newHeight = Math.max(cellHeight(), rect.height + deltaY)
    }

    // Snap to grid
    const newColumnSpan = Math.max(1, Math.round(newWidth / cellWidth()))
    const newRowSpan = Math.max(1, Math.round(newHeight / cellHeight()))

    // Check bounds
    const maxColumnSpan = columnCount.value - selectedElement.column + 1
    const maxRowSpan = rowCount.value - selectedElement.row + 1

    selectedElement.columnSpan = Math.min(newColumnSpan, maxColumnSpan)
    selectedElement.rowSpan = Math.min(newRowSpan, maxRowSpan)

    redraw()
  } else if (isDragging && selectedElement) {
    const deltaX = mousePos.x - dragStartPos.x
    const deltaY = mousePos.y - dragStartPos.y

    const rect = initialElementRect
    const newPos = snapToGrid(rect.x + deltaX, rect.y + deltaY)

    // Check bounds
    const maxColumn = columnCount.value - selectedElement.columnSpan + 1
    const maxRow = rowCount.value - selectedElement.rowSpan + 1

    selectedElement.column = Math.min(newPos.column, maxColumn)
    selectedElement.row = Math.min(newPos.row, maxRow)

    redraw()
  } else {
    setCursor(mousePos)
  }
}

const onMouseUp = () => {
  if (isResizing && selectedElement && originalElementState) {
    // Snap to grid on mouse up
    resolveCollisions(selectedElement.id)
    redraw()
  } else if (isDragging && selectedElement && originalElementState) {
    // Snap to grid on mouse up
    const rect = getElementRect(selectedElement)
    const gridPos = snapToGrid(rect.x, rect.y)

    // Check bounds
    const maxColumn = columnCount.value - selectedElement.columnSpan + 1
    const maxRow = rowCount.value - selectedElement.rowSpan + 1

    selectedElement.column = Math.min(gridPos.column, maxColumn)
    selectedElement.row = Math.min(gridPos.row, maxRow)

    resolveCollisions(selectedElement.id)
    redraw()
  }

  isDragging = false
  isResizing = false
  selectedHandle = null
  originalElementState = null
  initialElementRect = null
}

const addElement = () => {
  const newElement: DashboardElement = {
    id: Date.now().toString(),
    row: 1,
    column: 1,
    rowSpan: 1,
    columnSpan: 1,
    title: `Element ${elements.length + 1}`
  }

  const pos = findNextAvailablePosition(1, 1)
  newElement.row = pos.row
  newElement.column = pos.column

  elements.push(newElement)
  redraw()
}

const initCanvas = () => {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  redraw()
}

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

watch([columnCount, rowCount, screenWidthInPixels, screenHeightInPixels], () => {
  // Validate elements fit in new grid
  elements.forEach(element => {
    element.column = Math.min(element.column, columnCount.value - element.columnSpan + 1)
    element.row = Math.min(element.row, rowCount.value - element.rowSpan + 1)
    element.columnSpan = Math.min(element.columnSpan, columnCount.value - element.column + 1)
    element.rowSpan = Math.min(element.rowSpan, rowCount.value - element.row + 1)
  })

  nextTick(() => {
    redraw()
  })
})
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.control-group input[type="range"] {
  width: 100px;
}

.add-btn {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  background-color: #4338ca;
}

.canvas-container {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

canvas {
  display: block;
  cursor: default;
}
</style>