//回路をオリジナルからコピーするための処理を行う

let Gates = document.getElementsByClassName("original_gate");
let Circuit = document.getElementById("circuit");

for(let i=0; i<3; i++){
    Gates[i].draggable = true;

    Gates[i].addEventListener('dragstart', (event) => { // ドラッグが開始された時
        event.dataTransfer.setData("text/plain", event.target.id); //ドラッグされたオブジェジェクトのidを保存
        event.dataTransfer.setDragImage(event.target, 100, 100); //ドラッグ中の画像を設定する
    });    
}

Circuit.addEventListener('dragover', (event) => {
    event.preventDefault() //フィアルを開く動作を抑止する
    event.dataTransfer.dropEffect = 'copy' //ドラッグオーバーしたときのアイコンを「＋」にする
})

Circuit.addEventListener('drop', (event) => {
    event.preventDefault() //フィアルを開く動作を抑止する
    let dragged_id = event.dataTransfer.getData("text/plain"); //ドラッグされているオブジェクトのidを取得
    if(dragged_id){ //オリジナルの論理ゲート以外からのドロップ（circuit内の移動のために行うドラッグ&ドロップなど)では実行しない
        let original_gate = document.getElementById(dragged_id); //ドラッグされている元のゲートのHTMLオブジェクト
        let gate_parent = document.createElement("div"); //このノードにドラッグされている元のオブジェクトのデータを参照してコピーを作る
        gate_parent.style.position = "absolute";
        gate_parent.style.left = (event.pageX - 50).toString() + "px"; //配置する位置はドロップしたときのマウスカーソルがある位置
        gate_parent.style.top = (event.pageY - 50).toString() + "px"; //-50するのは画像サイズが100*100で、マウスカーソルの先に画像の中心が来るように調整するため
        gate_parent.className = "gate_parent"; //論理ゲートの画像とIOボタンをまとめて扱いたいので、親となるタグを作る
        gate_parent.dataset.type = original_gate.dataset.type;
        //------circuit内に配置するgateのプロパティを設定--------------
        let gate = document.createElement("img"); //このノードにドラッグされている元のオブジェクトのデータを参照してコピーを作る
        gate.src = original_gate.src;

        gate.width = 90;
        gate.height = 90;
            //===========回路にインプットとアウトプットのボタンを配置＝＝＝＝＝＝＝＝＝＝
            let type = original_gate.dataset.type;
            switch(type){
                case "AND":
                    let buttons = [];
                    buttons[0] = document.createElement("button");
                    buttons[1] = document.createElement("button");
                    buttons[2] = document.createElement("button");

                    buttons[0].style.width = "54px"
                    buttons[0].style.height = "18px"
                    buttons[1].style.width = "54px"
                    buttons[1].style.height = "18px"
                    buttons[2].style.width = "54px"
                    buttons[2].style.height = "18px"
                    for(let i=0; i<3; i++){
                        buttons[i].style.position = "fixed"
                        buttons[i].className = "ioButton";
                        if(i == 0){
                            buttons[i].innerText = "input1";
                            buttons[i].style.top = "25px";
                            buttons[i].style.left = "-40px";
                            buttons[i].dataset.button_type = "input1"
                        }else if(i == 1){
                            buttons[i].innerText = "input2";
                            buttons[i].style.top = "50px";
                            buttons[i].style.left = "-40px";
                            buttons[i].dataset.button_type = "input2"
                        }else{
                            buttons[i].innerText = "output";
                            buttons[i].style.left = "80px";
                            buttons[i].style.top = "35px";
                            buttons[i].dataset.button_type = "output"
                        }
                        gate_parent.appendChild(buttons[i]);
                    }
                    break;
                case "OR":
                    let buttons2 = [];
                    buttons2[0] = document.createElement("button");
                    buttons2[1] = document.createElement("button");
                    buttons2[2] = document.createElement("button");

                    buttons2[0].style.width = "54px"
                    buttons2[0].style.height = "18px"
                    buttons2[1].style.width = "54px"
                    buttons2[1].style.height = "18px"
                    buttons2[2].style.width = "54px"
                    buttons2[2].style.height = "18px"
                    for(let i=0; i<3; i++){
                        buttons2[i].style.position = "fixed"
                        buttons2[i].className = "ioButton";
                        if(i == 0){
                            buttons2[i].innerText = "input1";
                            buttons2[i].style.top = "25px";
                            buttons2[i].style.left = "-40px";
                            buttons2[i].dataset.button_type = "input1"
                        }else if(i == 1){
                            buttons2[i].innerText = "input2";
                            buttons2[i].style.top = "50px";
                            buttons2[i].style.left = "-40px";
                            buttons2[i].dataset.button_type = "input2"
                        }else{
                            buttons2[i].innerText = "output";
                            buttons2[i].style.left = "80px";
                            buttons2[i].style.top = "30px";
                            buttons2[i].dataset.button_type = "output"
                        }
                        gate_parent.appendChild(buttons2[i]);
                    }
                    break;
                case "NOT":
                    let buttons3 = [];
                    buttons3[0] = document.createElement("button");
                    buttons3[1] = document.createElement("button");
                    for(let i=0; i<2; i++){
                        buttons3[i].style.position = "fixed"
                        buttons3[i].className = "ioButton";
                        if(i == 0){
                            buttons3[i].innerText = "input1";
                            buttons3[i].style.top = "33px";
                            buttons3[i].style.left = "-40px";
                            buttons3[i].dataset.button_type = "input1"
                        }else{
                            buttons3[i].innerText = "output";
                            buttons3[i].style.top = "33px";
                            buttons3[i].style.left = "90px";
                            buttons3[i].dataset.button_type = "output"
                        }
                        gate_parent.appendChild(buttons3[i]);
                    }
                    break;

            }
            //================================================================
            //　バグの原因のため線が接続してないときのみ消せるように変更してある
            //↓配置する論理回路がダブルクリックされたとき、回路ないから削除する機能を設定する
            gate_parent.addEventListener("dblclick", (event) => {
                if(event.currentTarget.dataset.connecting1 == undefined && event.currentTarget.dataset.connecting2 == undefined && event.currentTarget.dataset.connecting3 == undefined){
                    for(let chosen_button in chosen_buttons){ //選択されているボタンの色を元に戻す
                        chosen_button.style.backgroundColor = "";
                    }
                    chosen_buttons = []; //バグ回避のため、選択されているボタンを強制的に解除する。
                    let ioButtons = document.getElementsByClassName("ioButton"); //つながってる線の共有先の線についてのプロパティも削除する必要あり
                    if(event.currentTarget.dataset.connecting1 != undefined){ //
                        for(let i = 0 ; i < ioButtons.length; i++){
                            if(ioButtons[i].dataset.line_start == event.currentTarget.dataset.connecting1){
                                delete ioButtons[i].dataset.line_start;
                            }
                            if(ioButtons[i].dataset.line_end == event.currentTarget.dataset.connecting1){
                                delete ioButtons[i].dataset.line_end;
                            }
                        }
                        lines[event.currentTarget.dataset.connecting1].remove();
                    }
                    if(event.currentTarget.dataset.connecting2 != undefined){
                        for(let i = 0 ; i < ioButtons.length; i++){
                            console.log(ioButtons[i].dataset.line_start)
                            if(ioButtons[i].dataset.line_start == event.currentTarget.dataset.connecting2){
                                delete ioButtons[i].dataset.line_start;
                            }
                            if(ioButtons[i].dataset.line_end == event.currentTarget.dataset.connecting2){
                                delete ioButtons[i].dataset.line_end;
                            }
                        }
                        lines[event.currentTarget.dataset.connecting2].remove();
                    }
                    if(event.currentTarget.dataset.connecting3 != undefined){
                        for(let i = 0 ; i < ioButtons.length; i++){
                            console.log(ioButtons[i].dataset.line_start)
                            if(ioButtons[i].dataset.line_start == event.currentTarget.dataset.connecting3){
                                delete ioButtons[i].dataset.line_start;
                            }
                            if(ioButtons[i].dataset.line_end == event.currentTarget.dataset.connecting3){
                                delete ioButtons[i].dataset.line_end;
                            }
                        }
                        lines[event.currentTarget.dataset.connecting3].remove();
                    }
                    event.currentTarget.remove();
                }
            });
            gate_parent.appendChild(gate)
        //--------------------------------------------------------
        event.target.appendChild(gate_parent);
    }
    
})