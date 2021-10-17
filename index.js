// クイズアプリ
// クイズのコンテンツ
const questions = [
    {question:"Q1. 次の成分のうち不足していると腰痛のリスクが上がる成分はどれ？",choice:["鉄分","ビタミンD","ビタミンE"],ansewer:"ビタミンD"},
    {question:"Q2. 次の食べ物のうち目の疲れの効果がある食べ物はどれ？",choice:["ブルーベリー","りんご","チョコレート"],ansewer:"ブルーベリー"},
    {question:"Q3. 目の疲れ対策として効果が認められにくい対策は？",choice:["遠くの建物を見る","ホットタオルを目の上に置く","ブルーライトメガネを使用する"],ansewer:"ブルーライトメガネを使用する"},
    {question:"Q4. 頭の重さはどれくらい？",choice:["5kg","7kg","10kg"],ansewer:"5kg"},
    {question:"Q5. ３ヶ月以上続き、症状が強い腰痛の対策として不適切な対策は？",choice:["有酸素運動をする","安静にする","マインドフルネス"],ansewer:"安静にする"},
];

//質問文のテキストを代入 
document.getElementById('questionContents').textContent =questions[0].question;

// ボタンタグのテキストに配列を代入
for(let i = 0;i<questions[0].choice.length; i++){
    $btn[i].textContent = questions[0].choice[i];
}

//idからノードを取得
const topWrapper = document.getElementById("top-wrapper");
const buttons = document.getElementById("buttons");

// タグからノードを取得してオブジェクト生成
const $btn = document.getElementsByTagName(`button`);

//正誤オブジェクト作成
const answer = {correct:"正解！",uncorrect:"不正解です。"};


// 変数作成 （「questions」のインデックス・ボタンオブジェクトのlength・最後に表示する点数）
let questionIndex = 0;
let buttonLength = $btn.length;
let score = 0

// 回答を選択するイベントで発火する関数
for(let i = 0; i<buttonLength; i++){
    document.getElementsByTagName(`button`)[i].addEventListener(`click`,function(e){
        result(e);　//正誤判定
    });
}

// 正誤判定する関数
function result(e){
    if (questions[questionIndex].ansewer === e.target.textContent) {
        score++;
        alert(answer.correct);
        displayAnswer(answer.correct);

    } else {
        alert(answer.uncorrect);
        displayAnswer(answer.uncorrect);
    }
};

// 正誤をボタンの下にpタグで表示する関数
function displayAnswer(answer){
    const answerBox = document.getElementById("answerBox");
    const p = document.createElement('p');
    const ansewerText = document.createTextNode(`第${questionIndex+1}問は${answer}`);
    topWrapper.appendChild(answerBox);
    answerBox.appendChild(p);
    p.appendChild(ansewerText);
    reset(answerBox,p)
}

// 次の準備
function reset(answerBox,p){
    questionIndex++;
    //クイズ終了後に行う動作
    if (questionIndex === questions.length) {
        document.getElementById('questionContents').textContent 
        =`クイズは終了です。
        合計得点は${score}点です。`;
        buttons.style.display = 'none';
        while(answerBox.firstChild){
            answerBox.removeChild(answerBox.firstChild);
        }
        const newBtn = document.createElement('button');
        const newBtnText = document.createTextNode("最初からやり直す");
        newBtn.appendChild(newBtnText);
        topWrapper.appendChild(newBtn);
        newBtn.addEventListener('click',function(){//「最初からやり直す」ボタンを押した時のイベント
            questionIndex = 0;
            for(let i =0; i<$btn.length; i++){
                $btn[i].style.display= 'block';
            }
            buttons.style.display = 'flex';
            topWrapper.removeChild(newBtn);
            textIn();
            score =0;
        })
    } else {
        textIn();
    }
};

// 次のテキストを入れる。
function textIn(){
    document.getElementById('questionContents').textContent =questions[questionIndex].question;
    for(let i = 0;i<buttonLength; i++){
    $btn[i].textContent = questions[questionIndex].choice[i];
}
}






// 演習
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



