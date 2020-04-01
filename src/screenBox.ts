import { Container, Text, Graphics } from "pixi.js";
import { WIDTH, GAME_HEIGHT, } from "./const";

export default class ScreenBox extends Graphics {
  btn: Graphics

  // 文字は長すぎるとダメ。btnTitleは3文字。
  constructor(stage: Container, title: string, titleColor: string, titleStrokeColor: string, paragraph: string, btnTitle: string) {
    super()
    stage.addChild(this)
    this.lineStyle(2, 0x333333)
    this.beginFill(0xF0F0F0)
    this.drawRoundedRect(WIDTH * 0.1, GAME_HEIGHT / 4, WIDTH * 0.8, GAME_HEIGHT * 0.6, 3)
    this.endFill()
    this.alpha = 0

    const t = new Text(title, {
      fontSize: 26,
      fill: titleColor,
      fontWeight: "bold",
      letterSpacing: 2,
      stroke: titleStrokeColor,
      strokeThickness: 8
    })
    t.anchor.set(0.5, 0)
    t.position.set(WIDTH / 2, GAME_HEIGHT * 0.33)
    this.addChild(t)

    const p = new Text(paragraph, {
      fontSize: 16,
      fill: "#333333",
      letterSpacing: 2,
      align: "center",
    })
    p.anchor.set(0.5)
    p.position.set(WIDTH / 2, GAME_HEIGHT / 2 + 14)
    this.addChild(p)

    const btnWidth = 76
    const btnX = (WIDTH - btnWidth) / 2
    const btnY = GAME_HEIGHT * 0.7
    this.btn = new Graphics()
    this.btn.beginFill(0xF00F6F)
    this.btn.drawRoundedRect(btnX, btnY, btnWidth, 30, 2)
    this.btn.endFill()
    this.btn.interactive = true
    this.addChild(this.btn)

    const btnText = new Text(btnTitle, {
      fontSize: 18,
      fontWeight: "bold",
      stroke: "#FFFFFF",
      fill: "#333333",
      strokeThickness: 4,
      letterSpacing: 2,
    })
    btnText.position.set(btnX + 8, btnY + 3)
    this.addChild(btnText)
  }

  addAlpha() {
    if (this.alpha >= 1) {
      return
    }

    this.alpha += 0.02
  }

  remove() {
    this.parent.removeChild(this)
  }
}
