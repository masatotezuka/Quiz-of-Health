const questionContents = [
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

const questionTitle = document.getElementById("question-title")!;
questionTitle.innerHTML = questionContents[0].question;
const answerButtons = document.getElementsByTagName("button");
for (let i = 0; i < 3; i++) {
  answerButtons[i].innerHTML = questionContents[0].choice[i];
}

const buttonLength = 3;
let questionLength = 0;
let score = 0;

// https://chaika.hatenablog.com/entry/2021/11/04/083000
for (let i = 0; i < buttonLength; i++) {
  const answerBox = document.getElementById("answer-box")! as HTMLDivElement;
  (<HTMLCollection>document.getElementsByTagName("button")!)[
    i
  ].addEventListener("click", function (event: Event) {
    if (
      (event.target as HTMLButtonElement).textContent ===
      questionContents[questionLength].answer
    ) {
      displayAnswer("正解", questionContents[questionLength].answer, answerBox);
      score++;
    } else {
      displayAnswer(
        "不正解",
        questionContents[questionLength].answer,
        answerBox
      );
    }

    questionLength++;

    if (questionLength === questionContents.length) {
      resetQuiz(answerBox);
      return;
    }
    displayNextQuestion();
    return;
  });
}

function resetQuiz(answerBox: HTMLDivElement) {
  questionLength = 0;
  const buttonsWrapper = document.getElementById(
    "buttons-wrapper"
  )! as HTMLDivElement;

  questionTitle.innerText = `正解数は${score}問です。`;
  for (let i = 0; i < buttonLength; i++) {
    answerButtons[i].style.display = "none";
  }

  answerBox.remove();
  buttonsWrapper.insertAdjacentHTML(
    "beforeend",
    `<button id="new-button">最初からやり直す</button>`
  );
  const resetButton = document.getElementById(
    "new-button"
  )! as HTMLButtonElement;

  resetButton.addEventListener("click", function () {
    score = 0;
    for (let i = 0; i < buttonLength; i++) {
      answerButtons[i].style.display = "inline";
    }

    const answerWrapper = document.getElementById(
      "answer-wrapper"
    )! as HTMLDivElement;
    answerWrapper.insertAdjacentHTML(
      "beforeend",
      `<div id="answer-box"></div>`
    );

    displayNextQuestion();
    resetButton.remove();
  });
}

// 正誤表示
function displayAnswer(
  answerMessage: string,
  answerContent: string,
  answerBox: HTMLDivElement
) {
  window.alert(answerMessage);
  displayAnswerInParagraph(answerMessage, answerContent, answerBox);
}

function displayAnswerInParagraph(
  answerMessage: string,
  answerText: string,
  answerBox: HTMLDivElement
) {
  if (answerMessage === "正解") {
    answerBox.insertAdjacentHTML(
      "beforeend",
      `<p>第${questionLength + 1}問は${answerMessage}です。`
    );
  } else {
    answerBox.insertAdjacentHTML(
      "beforeend",
      `<p>第${
        questionLength + 1
      }問は${answerMessage}です。正解は「${answerText}」です。</p>`
    );
  }
}

function displayNextQuestion() {
  questionTitle.innerText = questionContents[questionLength].question;
  for (let i = 0; i < 3; i++) {
    answerButtons[i].innerText = questionContents[questionLength].choice[i];
  }
}
