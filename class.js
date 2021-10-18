class Quiz{
    constructor(question,choice,answer){
        this.question = question;
        this.choice = choice;
        this.answer = answer;
    }
   info(){
       console.log(this.question);
       console.log(this.choice);
       console.log(this.answer)
   } 
}

const quiz1 = new Quiz("Q1. 次の成分のうち不足していると腰痛のリスクが上がる成分はどれ？",["鉄分","ビタミンD","ビタミンE"],"ビタミンD")

quiz1.info();

console.log(quiz1.question);