import { Sprite, Container, utils } from "pixi.js"
import { TILE_SIZE, GAME_HEIGHT } from "./const"
import { tileInfo } from "./stageMap"

export default class Character extends Sprite {
  readonly size = 26
  vx = 2
  vy = 0
  readonly gravity = 0.3
  readonly maxVy = 7
  keys: any = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false
  }
  isAsc = false
  isDesc = false
  gotItemID: number | false = false

  constructor(stage: Container) {
    super()
    stage.addChild(this)


    this.texture = utils.TextureCache["character"]
    this.width = this.size
    this.height = this.size
    this.position.set(0, 0)
    this.visible = false
  }

  init() {
    this.position.set(0, 0)
  }

  isDead(): boolean {
    const bottom = this.y + this.size
    return bottom > GAME_HEIGHT
  }

  setKey(k: string) {
    this.keys[k] = true
  }

  unsetKey(k: string) {
    this.keys[k] = false
  }

  private isCollisionX(tileInfos: tileInfo[], x: number): number | false {
    const left = x
    const top = this.y
    const right = left + this.size
    const bottom = top + this.size

    return this.checkTileCollision(tileInfos, top, right, bottom, left)
  }

  private isCollisionY(tileInfos: tileInfo[], y: number): number | false {
    const left = this.x
    const top = y
    const right = left + this.size
    const bottom = top + this.size

    return this.checkTileCollision(tileInfos, top, right, bottom, left)
  }

  // 返り値はnumber | falseだが、基本的にbool値での判別しかしない。返ったnumberをnumberとして使うのはisDesc()のみ。
  private checkTileCollision(ts: tileInfo[], top: number, right: number, bottom: number, left: number): number | false {
    for (const t of ts) {
      if (t.type === "0" || !t.isExists) {
        continue
      }

      const tTop = t.y
      const tRight = t.x + TILE_SIZE
      const tBottom = t.y + TILE_SIZE
      const tLeft = t.x

      if (bottom > tTop && right > tLeft && left < tRight && top < tBottom) {
        if (t.type === "X") {
          return tTop
        } else if (t.type === "B" || t.type === "S") {
          this.gotItemID = t.id
        }
      }
    }

    return false
  }

  move(tileInfos: tileInfo[], stageWidth: number) {
    this.gotItemID = false

    // x軸の処理
    if (this.keys.ArrowRight && !this.isCollisionX(tileInfos, this.x + this.vx) && this.x + this.size < stageWidth) {
      this.x += this.vx
    } else if (this.keys.ArrowLeft && !this.isCollisionX(tileInfos, this.x - this.vx) && this.x > 0) {
      this.x -= this.vx
    }

    // y軸の処理
    if (this.isAsc || this.isDesc) {
      this.y -= this.vy

      if (this.vy > -this.maxVy) {
        this.vy -= this.gravity
      }

      if (this.isAsc) {
        this.asc(tileInfos)
      } else if (this.isDesc) {
        this.desc(tileInfos)
      }
    } else {
      if (!this.isCollisionY(tileInfos, this.y + this.gravity)) {
        this.isDesc = true
      }
    }

    if (this.keys.ArrowUp && !this.isAsc && !this.isDesc) {
      this.beginJump()
    }
  }

  private asc(tileInfos: tileInfo[]) {
    if (this.isCollisionY(tileInfos, this.y - this.vy) || this.vy < 0) {
      this.vy = 0
      this.isAsc = false
      this.isDesc = true
    }
  }

  private desc(tileInfos: tileInfo[]) {
    const diffY = this.isCollisionY(tileInfos, this.y - this.vy)
    if (diffY && diffY > this.y + this.size) {
      this.vy = 0
      this.endJump()
      this.y = diffY - this.size
    }
  }

  private beginJump() {
    this.vy = this.maxVy
    this.isAsc = true
  }

  private endJump() {
    this.isDesc = false
  }
}
