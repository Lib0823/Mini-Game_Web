//list값 변경
document.getElementById("test-list").getElementsByTagName("li")[0].innerHTML = 
'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+'aaa'+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+'100'
document.getElementById("test-list").getElementsByTagName("li")[1].innerHTML = 
'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+'bbb'+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+'87'

//search버튼 클릭시 select에 선택된값 가져와서 해당 테이블 연결
function rankingSearch() {
    let searchElem = document.getElementById('gameSelect');
    if(searchElem=='Tetris'){
        print('aaa');
    }
}

//for문으로 0부터 증가시키며 큰 값부터 삽입