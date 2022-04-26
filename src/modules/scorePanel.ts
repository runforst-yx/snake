// 定义记分牌的类
class ScorePanel {
  // 记录分数和等级
  score = 0;
  level = 1;
  //   分数等级元素，构造函数初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  // 设置一个变量限制等级
  maxLevel: number;
  //   设置一个变量表示多少分升级
  upScore: number;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  //设置加分
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + "";
    // 到达一定分数，等级增加
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }
  //   设置等级增加 等级要设置上限
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + "";
    }
  }
}
export default ScorePanel;
