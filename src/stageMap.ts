import { Container, Sprite, utils } from "pixi.js"
import { TILE_SIZE, WIDTH, SCORE_PANEL_HEIGHT } from "./const"

export interface tileInfo {
  id: number
  type: string
  x: number
  y: number
  isExists: boolean
}

export default class StageMap extends Container {
  tiles: any = {
    1: [
      ["0", "0", "0", "B", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "X", "X", "X", "0", "0", "0", "X", "0", "0", "X", "0", "X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "X", "X", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "0", "0", "X", "X", "S",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X",],
      ["0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "B", "0", "0", "0", "0", "0", "X", "X", "0", "X", "0", "0", "0",],
      ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "B",],
      ["X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "X", "0", "0", "0", "0", "0", "X", "X",],
    ],
    2: [
      ["0", "0", "0", "B", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "X", "X", "X", "0", "0", "0", "X", "0", "0", "X", "0", "X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "X", "X", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "0", "0", "X", "X", "S",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X",],
      ["0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "B", "0", "0", "0", "0", "0", "X", "X", "0", "X", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "B",],
      ["X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "X", "0", "0", "0", "0", "0", "X", "X",],
    ],
    3: [
      ["0", "0", "0", "B", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "X", "X", "X", "0", "0", "0", "X", "0", "0", "X", "0", "X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "X", "X", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "0", "0", "X", "X", "S",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X",],
      ["0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "0", "0", "X", "0", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0",],
      ["0", "0", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "B", "0", "0", "0", "0", "0", "X", "X", "0", "X", "0", "0", "0",],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "B",],
      ["X", "X", "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "0", "X", "0", "0", "0", "0", "0", "X", "X",]
    ]
  }
  tileInfos: tileInfo[] = []
  sprites: Sprite[] = []
  bananas = 0
  maxBananas = 0
  currentStage = 0
  isCleared = false

  constructor(stage: Container) {
    super()
    stage.addChild(this)
    this.position.set(0, SCORE_PANEL_HEIGHT)
    this.currentStage = 1
    this.setMap()
  }

  setMap() {
    this.isCleared = false
    let x = 0
    let y = 0
    let id = 0
    for (const row of this.tiles[this.currentStage]) {
      for (const col of row) {
        if (col === "0") {
          x += TILE_SIZE
          continue
        }

        let spriteName = ""
        let isExists = true

        if (col === "X") {
          spriteName = "block"
        } else if (col === "S") {
          spriteName = "star"
          isExists = false
        } else if (col === "B") {
          this.maxBananas++
          spriteName = "banana"
        } else {
          continue
        }

        const sprite = new Sprite(utils.TextureCache[spriteName])
        sprite.width = TILE_SIZE
        sprite.height = TILE_SIZE
        sprite.position.set(x, y)
        sprite.visible = isExists
        this.addChild(sprite)
        this.sprites.push(sprite)

        this.tileInfos.push({ id: id, type: col, x: x, y: y, isExists: isExists })

        id++

        x += TILE_SIZE
      }
      x = 0
      y += TILE_SIZE
    }
  }

  removeItem(i: number) {
    this.tileInfos[i].isExists = false
    this.sprites[i].parent.removeChild(this.sprites[i])
  }

  getItem(i: number) {
    const t = this.tileInfos[i].type
    if (t === "B") {
      this.bananas++
      if (this.bananas === this.maxBananas) {
        this.toVisibleStar()
      }
    } else if (t === "S") {
      this.clear()
    }
  }

  private toVisibleStar() {
    for (let i = 0; i < this.tileInfos.length; i++) {
      const t = this.tileInfos[i]
      if (t.type === "S" && !t.isExists) {
        this.tileInfos[i].isExists = true
        this.sprites[i].visible = true
      }
    }
  }

  dead() {
    this.init(true)
  }

  init(isDead = false) {
    for (let i = 0; i < this.tileInfos.length; i++) {
      if (this.tileInfos[i].isExists || (isDead && this.tileInfos[i].type === "S")) {
        this.sprites[i].parent.removeChild(this.sprites[i])
      }
    }

    this.sprites = []
    this.tileInfos = []
    this.bananas = 0
    this.maxBananas = 0
    this.setMap()
    this.initCamera()
  }

  private initCamera() {
    this.pivot.x = 0
  }

  updateCamera(charX: number, charVX: number) {
    let cameraX = this.pivot.x

    const margin = charX - cameraX

    if (margin > WIDTH / 2) {
      cameraX += charVX
    } else if (margin < WIDTH / 4) {
      cameraX -= charVX
    }

    if (cameraX > 0 && cameraX + WIDTH < this.width) {
      this.pivot.x = cameraX
    }
  }

  getStartYPos(stage: number) {
    if (stage === 1) {
      return TILE_SIZE * 7
    }

    return 0
  }

  clear() {
    this.isCleared = true
  }
}
