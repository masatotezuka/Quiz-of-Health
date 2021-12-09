// const Swal = require('sweetalert2')
// import Swal from 'sweetalert2'
// クイズアプリ
// クイズのコンテンツ
const questions = [
  {
    question:
      "Q1. 次の成分のうち不足していると腰痛のリスクが上がる成分はどれ？",
    choice: ["鉄分", "ビタミンD", "ビタミンE"],
    answer: "ビタミンD",
  },
  {
    question: "Q2. 次の食べ物のうち目の疲れの効果がある食べ物はどれ？",
    choice: ["ブルーベリー", "りんご", "チョコレート"],
    answer: "ブルーベリー",
  },
  {
    question: "Q3. 目の疲れ対策として効果が認められにくい対策は？",
    choice: [
      "遠くの建物を見る",
      "ホットタオルを目の上に置く",
      "ブルーライトメガネを使用する",
    ],
    answer: "ブルーライトメガネを使用する",
  },
  {
    question: "Q4. 頭の重さはどれくらい？",
    choice: ["5kg", "7kg", "10kg"],
    answer: "5kg",
  },
  {
    question: "Q5. ３ヶ月以上続き、症状が強い腰痛の対策として不適切な対策は？",
    choice: ["有酸素運動をする", "安静にする", "マインドフルネス"],
    answer: "安静にする",
  },
];

//質問文のテキストを代入
document.getElementById("questionContents").textContent = questions[0].question;

//idからノードを取得
const $topWrapper = document.getElementById("top-wrapper");
const $buttonsWrapper = document.getElementById("buttons-wrapper");

// タグからノードを取得してオブジェクト生成
const $buttons = document.getElementsByTagName(`button`);

// 変数作成 （「questions」のインデックス・ボタンオブジェクトのlength・最後に表示する点数）
let questionIndex = 0;
let buttonLength = $buttons.length;
let score = 0;

// ボタンタグのテキストに配列を代入
for (let i = 0; i < questions[0].choice.length; i++) {
  $buttons[i].textContent = questions[0].choice[i];
}

// 回答を選択するイベントで発火する関数
for (let i = 0; i < buttonLength; i++) {
  document
    .getElementsByTagName(`button`)
    [i].addEventListener(`click`, function (e) {
      result(e, questions); //正誤判定
    });
}

// 正誤判定する関数
function result(e) {
  if (questions[questionIndex].answer === e.target.textContent) {
    score++;
    displayAnswer("正解！");
  } else {
    displayAnswer(`不正解です。
正解は「${questions[questionIndex].answer}」です。`);
  }
}

// 正誤をボタンの下にpタグで表示する関数
function displayAnswer(answer) {
  const answerBox = document.getElementById("answerBox");
  const p = document.createElement("p");
  const ansewerText = document.createTextNode(
    `第${questionIndex + 1}問は${answer}`
  );
  $topWrapper.appendChild(answerBox);
  answerBox.appendChild(p);
  p.appendChild(ansewerText);
  if (answer === "正解！") {
    Swal.fire("", answer, "success");
  } else {
    Swal.fire("", answer, "error");
  }
  reset(answerBox);
}

// 次の準備
function reset(answerBox) {
  questionIndex++;
  //クイズ終了後に行う動作
  if (questionIndex === questions.length) {
    //質問の部分に結果表示
    document.getElementById(
      "questionContents"
    ).textContent = `クイズは終了です。
        合計得点は${score}点です。`;
    //選択肢のボタンを非表示
    $buttonsWrapper.style.display = "none";
    while (answerBox.firstChild) {
      answerBox.removeChild(answerBox.firstChild);
    }
    //「最初からやり直す」ボタンの作成
    const newBtn = document.createElement("button");
    const newBtnText = document.createTextNode("最初からやり直す");
    newBtn.appendChild(newBtnText); //特定の親ノードの子ノードリストの末尾にノードを追加。
    $topWrapper.appendChild(newBtn);
    newBtn.addEventListener("click", function () {
      //「最初からやり直す」ボタンを押した時のイベント
      questionIndex = 0;
      $buttonsWrapper.style.display = "block";
      // $buttonsWrapper.style.justifyContent = 'center';
      $topWrapper.removeChild(newBtn); ////「最初からやり直す」ボタンの削除
      textIn();
      score = 0;
    });
  } else {
    textIn();
  }
}

// 次のテキストを入れる。
function textIn() {
  document.getElementById("questionContents").textContent =
    questions[questionIndex].question;
  for (let i = 0; i < buttonLength; i++) {
    $buttons[i].textContent = questions[questionIndex].choice[i];
  }
}

// ここからはメモ
// ノードの追加
// function append(){
//     const li = document.createElement('li');
//     const liText = document.createTextNode("新しいリスト");
//     li.appendChild(liText);
//     const lists = document.getElementById("lists")
//     lists.appendChild(li);
// }

// ノードの置換
// function replace(){
//     const newList = document.createElement('li');
// newList.setAttribute('id', 'newList');  //指定の要素に新しい属性を追加します。または指定の要素に存在する属性の値を変更します。
// const newText = document.createTextNode('新しい要素です');
// newList.appendChild(newText);
// console.log(newList);
// const oldList =  document.getElementById("oldList");
// const parentNode = oldList.parentNode;
// console.log(parentNode);
// parentNode.replaceChild(newList,oldList);
// console.log(oldList);
// console.log(parentNode);
// };
