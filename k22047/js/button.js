//前回押したボタンの色もどし
function colorBack() {
    if (colorIdNumber === 0) {
        document.getElementById('eraser').classList.remove('eraser2');
        document.getElementById('eraser').classList.add('eraser');
    } else if (10 > colorIdNumber) {
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons2');
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('buttons');
    }
    if (colorIdNumber === 10) {
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons4');
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('buttons3');
    }
}
//消しゴム用
function N0() {
    boxNumber = []
    //前に押したボタンの色を変える
    colorBack();
    colorIdNumber = 0;
    document.getElementById('eraser').classList.remove('eraser');
    document.getElementById('eraser').classList.add('eraser2');
    boxColor()
}
//ボタン用
function N(Num) {
    boxNumber = Num;
    //数字の背景を戻す
    boxColor();
    //ボタンと同じ数字の背景の色を変える
    for (let i = 0; i < 9; i++) {
        a = nanpureNumber[i].indexOf(Num)
        b = 9 * i + a
        if (nanpureA[b].length !== 0) {
            document.querySelector(`[data-index='${b}']`).setAttribute("data-state", 3)
        }
    }
    //前回と今押したボタン色変えと保存
    colorBack();
    colorIdNumber = boxNumber
    document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons');
    document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('buttons2');
}
//魔法のボタン用
function magicButton() {
    if (magicLimit > magicPoint) {
        boxNumber = 10;
        colorBack();
        colorIdNumber = boxNumber
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons');
        document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('buttons2');
    }
    colorIdNumber = boxNumber;
    document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons3');
    document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('buttons4');
    boxColor();
}
//クリア確認
function clear() {
    let total = 0;
    for (let i = 0; i < 81; i++) {
        total += nanpureA[i];
        if ((i + 1) % 9 === 0) {
            if (total % 45 !== 0) {
                break
            }
        }
        if (total === 405) {
            stopTimer();
            let clearTime = document.getElementById('time').innerHTML;
            let tweetflg = window.confirm(`${clearTime}でクリア!結果をTwitterに投稿しますか？`);
            if (tweetflg) {
                window.location.href = `https://twitter.com/intent/tweet?text=数独を${clearTime}でクリアしました！`;
            }
        }
    }
}
//クリック時に
const onClickSquare = (index) => {
    //入力するのが空白の場合
    if (isNaN(boxNumber)) {

        // 消しゴム用　クリック位置の正解のリストと答えのリストが同じではない場合　空白を入力
        if (answerNumber[index] !== nanpureA[index]) {
            document.querySelector(`[data-index='${index}']`).innerHTML = `<p>${boxNumber}</p>`;
        }
        //入力するのが数字の場合
    } else {
        //入力する位置の答えのリストが空白の場合
        if (!isNaN(nanpureA[index])) {
            if (nanpureA[index] !== answerNumber[index]) {
                //魔法のボタン用
                if (boxNumber === 10) {
                    //使用回数以下なのか
                    if (magicLimit > magicPoint) {
                        document.querySelector(`[data-index='${index}']`).classList.add('DColor');
                        //再生時にclassを剥がすよう
                        RBlist.push(index);
                        document.querySelector(`[data-index='${index}']`).classList.remove('redColor');
                        document.querySelector(`[data-index='${index}']`).innerHTML = `<p>${answerNumber[index]}</p>`;
                        //答えのリストに入れる
                        nanpureA[index] = answerNumber[index]

                        boxColor();
                        for (let i = 0; i < 9; i++) {
                            a = nanpureNumber[i].indexOf(answerNumber[index])
                            b = 9 * i + a
                            if (nanpureA[b].length !== 0) {
                                document.querySelector(`[data-index='${b}']`).setAttribute("data-state", 3)
                            }
                        }

                        //クリアか？
                        clear();
                        magicPoint++;
                        alert(`使用可能回数　残り${magicLimit - magicPoint}回`)
                        boxColor();
                        //使用上限の確認
                        if (magicLimit === magicPoint) {
                            boxNumber = [];
                            //前回に選択していたボタンの色もどし
                            colorBack();
                            document.getElementById('buttonId' + `${colorIdNumber}`).classList.remove('buttons3');
                            document.getElementById('buttonId' + `${colorIdNumber}`).classList.add('noneButton');
                            colorIdNumber = 1;
                            N(1);
                        }
                    }
                }
                //正解のリストと入力する数字が同じ場合
                if (answerNumber[index] === boxNumber) {
                    document.querySelector(`[data-index='${index}']`).classList.add('DColor');
                    RBlist.push(index);
                    document.querySelector(`[data-index='${index}']`).classList.remove('redColor');
                    document.querySelector(`[data-index='${index}']`).innerHTML = `<p>${boxNumber}</p>`;
                    document.querySelector(`[data-index='${index}']`).setAttribute("data-state", 3)
                    //答えのリストに入れる
                    nanpureA[index] = boxNumber
                    //全部埋まっていて正解の場合に
                    clear();
                    //正解のリストと入力する数字が同じではない場合
                } else {
                    //答えのリストと正解のリストが同じではない場合
                    if (answerNumber[index] !== nanpureA[index]) {
                        //赤くする
                        document.querySelector(`[data-index='${index}']`).classList.add('redColor')
                        document.querySelector(`[data-index='${index}']`).innerHTML = `<p>${boxNumber}</p>`;
                        RBlist.push(index);
                    }
                }
            }
        }
    }

};