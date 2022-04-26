import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";
// 游戏控制器 控制其他所有类
class GameControl {
  //定义三个属性
  //   蛇
  snake: Snake;
  //   食物
  food: Food;
  //   记分牌
  scorePanel: ScorePanel;
  // 存储按键方向
  dircetion: string = "";
  //   创建一个属性记录游戏是否结束
  islive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  //   游戏初始化方法
  init() {
    //   绑定键盘按下事件
    document.addEventListener("keydown", this.KeyDownHandler.bind(this));
    // 调用run方法
    this.run();
  }
  KeyDownHandler(event: KeyboardEvent) {
    //   按键事件 需要检查按键值是否为上下左右
    this.dircetion = event.key;
  }
  //   创建一个控制蛇移动的方法
  run() {
    /*
      根据direction控制蛇的移动
      */
    //  获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据方向修改X、Y值
    switch (this.dircetion) {
      // 上移动 top减少
      case "ArrowUp":
        Y -= 10;
        break;
      // 下移动 top增加
      case "ArrowDown":
        Y += 10;
        break;
      // 左移动 left减少
      case "ArrowLeft":
        X -= 10;
        break;
      // 左移动 left增加
      case "ArrowRight":
        X += 10;
        break;
    }
    //检查蛇是否迟吃到了食物
    this.checkEat(X, Y);

    // 异常捕获
    try {
      // 修改蛇的X，Y值
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message + "GAME OVER");
      this.islive = false;
    }

    this.islive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
  // 检查蛇是否吃到了食物
  checkEat(X: Number, Y: Number) {
    if (X === this.food.X && Y === this.food.Y) {
      //console.log("吃到了食物");
      //重置食物位置
      this.food.change();
      //   分数增加
      this.scorePanel.addScore();
      //   身体增加
      this.snake.addBody();
    }
  }
}
export default GameControl;
