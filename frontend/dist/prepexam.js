(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["prepexam"],{

/***/ "./src/id.ts":
/*!*******************!*\
  !*** ./src/id.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData)
/* harmony export */ });
const fetchData = async () => {
    const res = await fetch('/nick');
    const data = await res.json();
    return data.nick;
};
// 클라이언트임!!!!


/***/ }),

/***/ "./src/prepexam.ts":
/*!*************************!*\
  !*** ./src/prepexam.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./src/id.ts");

let elms = null;
// let tempobj = {word,mean,synonym} as wordinfo
const signout = document.querySelector('#signout');
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
//signout
const nick = document.querySelector('.nick');
const init = async () => {
    const data = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
    for (let i = 0; i < 2; i++) {
        nick.innerHTML = data;
    }
    return;
};
init();
//nickname
const bless = document.querySelector('#blessing');
const fetchbless = async () => {
    console.log('hi');
    const res = await fetch('/bless');
    const data = await res.json();
    bless.innerHTML = data.word;
};
fetchbless();
const mypage = document.querySelector('#mypage');
mypage.addEventListener('click', e => {
    location.href = '/';
});
//underword
const support = document.querySelector('#support');
support.addEventListener('click', e => {
    location.href = '/support';
});
const share = document.querySelector('#share');
share.addEventListener('click', e => {
    location.href = '/share';
});
let params = (new URL(`${location}`)).searchParams;
let data = {
    share: params.get('share'),
    title: params.get('title').replaceAll('!@!@$(', ' '),
    madeby: params.get('madeby')
};
let max = null;
const maxcon = document.querySelector('#maxcon');
const rangetitle = document.querySelector('#rangetitle');
const rangeul = document.querySelector('#rangeul');
let con = {};
const fetchInfo = async () => {
    const res = await fetch('/share/practicefetch', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    console.log(result);
    const content = result.result;
    con = content;
    max = content.content.length;
    maxcon.innerHTML = `Each pattern's max limit is ${max}.`;
    rangetitle.innerHTML = content.title;
    const fillul = () => {
        const array = ['word', 'mean'];
        for (let i of content.content) {
            console.log(i);
            const li = document.createElement('li');
            const input = document.createElement('input');
            const checkcon = document.createElement('div');
            checkcon.classList.add('checkcon');
            input.type = 'checkbox';
            input.classList.add('checkbox');
            input.checked = true;
            checkcon.appendChild(input);
            li.appendChild(checkcon);
            for (let j of array) {
                const div = document.createElement('div');
                div.innerHTML = i[j];
                div.classList.add(j);
                li.appendChild(div);
            }
            rangeul.appendChild(li);
        }
    };
    fillul();
};
fetchInfo();
const startbtn = document.querySelector('#startbtn');
startbtn.addEventListener('click', e => {
    console.log(con);
    const radio = [...document.querySelectorAll('.radio')];
    const input = [...document.querySelectorAll('.checkbox')];
    const number = [...document.querySelectorAll('.num')];
    const turn = ['WtoM', 'WtoS', 'MtoW', 'MtoS', 'StoW', 'StoM'];
    const num = [];
    for (let i = 0; i < 6; i++) {
        if (number[i].value === '') {
            const cnt = 0;
            num.push(cnt);
        }
        else {
            const cnt = Number(number[i].value);
            num.push(cnt);
        }
    }
    console.log(con.content);
    for (let i = 0; i < con.content.length; i++) {
        console.log(input[i]);
        if (!input[i].checked) {
            con.content.splice(i, 1);
            console.log(con.content);
        }
    }
    let type = null;
    const finalrange = con.content;
    if (radio[0]) {
        type = 'objective';
    }
    else {
        type = 'subjective';
    }
    const finalobj = {
        type,
        title: data.title,
        share: data.share,
        number: {
            WtoM: num[0],
            WtoS: num[1],
            MtoW: num[2],
            MtoS: num[3],
            StoW: num[4],
            StoM: num[5]
        },
        madeby: data.madeby,
        range: finalrange
    };
    const givedata = async () => {
        if (finalobj.range.length < 5) {
            alert('You need to add at least 5 words.');
        }
        const res = await fetch('/exam/examstart', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(finalobj)
        });
        const result = await res.json();
        console.log(result);
        if (result.status === 'good') {
            const examdata = result.examdata;
            const title = examdata.title.replaceAll(' ', '!@!@$(');
            location.href = `/exam?type=${examdata.type}&madeby=${examdata.madeby}&title=${title}&share=${examdata.share}&examinee=${examdata.examinee}`;
        }
        else {
            alert(result.reason);
            return;
        }
    };
    givedata();
    //examdata 구성 방식
    /*
    {
        title,
        share,
        madeby(sometimes null),
        type:'objective' | 'subjective,
        number:{
            WtoM,
            WtoS,
            MtoW,
            MtoS,
            StoW,
            StoM
        },
        range:[
            0:{word:'',mean:[''],synonym:['']},
            ...etc
        ]
    }
    */
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/prepexam.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9wcmVwZXhhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFNLEVBQUU7SUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtJQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsQ0FBQztBQUVELGFBQWE7Ozs7Ozs7Ozs7Ozs7O0FDTmlCO0FBRTlCLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQztBQUV6QixnREFBZ0Q7QUFHaEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVuRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxTQUFTO0FBRVQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDNUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSw4Q0FBUyxFQUFFO0lBQzlCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJO0tBQ3RCO0lBQ0QsT0FBTTtBQUNWLENBQUM7QUFDRCxJQUFJLEVBQUU7QUFDTixVQUFVO0FBRVYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEs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QyxNQUFNLENBQUM7UUFDbkIsSUFBRyxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQztZQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUTtZQUNoQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxJQUFJLEdBQUcsY0FBYyxRQUFRLENBQUMsSUFBSSxXQUFXLFFBQVEsQ0FBQyxNQUFNLFVBQVUsS0FBSyxVQUFVLFFBQVEsQ0FBQyxLQUFLLGFBQWEsUUFBUSxDQUFDLFFBQVEsRUFBRTtTQUMvSTthQUFJO1lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEIsT0FBTTtTQUNUO0lBR0wsQ0FBQztJQUNELFFBQVEsRUFBRTtJQUNWLGdCQUFnQjtJQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW1CRTtBQUNOLENBQUMsQ0FBQyIsImZpbGUiOiJwcmVwZXhhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSBhc3luYyA8VD4oKT0+e1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9uaWNrJylcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICByZXR1cm4gZGF0YS5uaWNrO1xyXG59XHJcblxyXG4vLyDtgbTrnbzsnbTslrjtirjsnoQhISEhXHJcbiIsImltcG9ydCB7ZmV0Y2hEYXRhfSBmcm9tICcuL2lkJ1xyXG5pbXBvcnQge3dvcmRpbmZvLCBjYXJkLHF1ZXJ5fSBmcm9tICcuL3R5cGVzJ1xyXG5sZXQgZWxtczp3b3JkaW5mbyA9IG51bGw7XHJcblxyXG4vLyBsZXQgdGVtcG9iaiA9IHt3b3JkLG1lYW4sc3lub255bX0gYXMgd29yZGluZm9cclxuXHJcblxyXG5jb25zdCBzaWdub3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZ25vdXQnKTtcclxuICAgICAgICBcclxuc2lnbm91dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgd2luZG93LnBhcmVudC5sb2NhdGlvbi5ocmVmID0gJy9sb2dvdXQnO1xyXG59KTtcclxuLy9zaWdub3V0XHJcblxyXG5jb25zdCBuaWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5pY2snKVxyXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoRGF0YSgpXHJcbiAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDI7IGkrKyl7XHJcbiAgICAgICAgbmljay5pbm5lckhUTUw9ZGF0YVxyXG4gICAgfVxyXG4gICAgcmV0dXJuXHJcbn1cclxuaW5pdCgpXHJcbi8vbmlja25hbWVcclxuXHJcbmNvbnN0IGJsZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JsZXNzaW5nJylcclxuY29uc3QgZmV0Y2hibGVzcyA9IGFzeW5jICgpPT57XHJcbiAgICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9ibGVzcycpXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgYmxlc3MuaW5uZXJIVE1MID0gZGF0YS53b3JkXHJcbn0gICBcclxuZmV0Y2hibGVzcygpOyBcclxuY29uc3QgbXlwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI215cGFnZScpXHJcbm15cGFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcclxufSlcclxuLy91bmRlcndvcmRcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VwcG9ydCcpXHJcbnN1cHBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnL3N1cHBvcnQnXHJcbn0pXHJcblxyXG5jb25zdCBzaGFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGFyZScpXHJcbnNoYXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy9zaGFyZSdcclxufSlcclxubGV0IHBhcmFtcyA9IChuZXcgVVJMKGAke2xvY2F0aW9ufWApKS5zZWFyY2hQYXJhbXNcclxubGV0IGRhdGEgPSB7XHJcbiAgICBzaGFyZTpwYXJhbXMuZ2V0KCdzaGFyZScpLFxyXG4gICAgdGl0bGU6cGFyYW1zLmdldCgndGl0bGUnKS5yZXBsYWNlQWxsKCchQCFAJCgnLCAnICcpLFxyXG4gICAgbWFkZWJ5OnBhcmFtcy5nZXQoJ21hZGVieScpXHJcbn1cclxubGV0IG1heDpudW1iZXIgPSBudWxsXHJcblxyXG5jb25zdCBtYXhjb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWF4Y29uJylcclxuY29uc3QgcmFuZ2V0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYW5nZXRpdGxlJylcclxuY29uc3QgcmFuZ2V1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYW5nZXVsJylcclxubGV0IGNvbiA9IHt9IGFzIGNhcmRcclxuY29uc3QgZmV0Y2hJbmZvID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9zaGFyZS9wcmFjdGljZWZldGNoJyx7XHJcbiAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J0FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KVxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgY29uc3QgY29udGVudCA9IHJlc3VsdC5yZXN1bHRcclxuICAgIGNvbiA9IGNvbnRlbnRcclxuICAgIG1heCA9IGNvbnRlbnQuY29udGVudC5sZW5ndGhcclxuICAgIG1heGNvbi5pbm5lckhUTUwgPSBgRWFjaCBwYXR0ZXJuJ3MgbWF4IGxpbWl0IGlzICR7bWF4fS5gXHJcbiAgICByYW5nZXRpdGxlLmlubmVySFRNTCA9IGNvbnRlbnQudGl0bGVcclxuICAgIGNvbnN0IGZpbGx1bCA9ICgpPT57XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbJ3dvcmQnLCdtZWFuJ11cclxuICAgICAgICBmb3IobGV0IGkgb2YgY29udGVudC5jb250ZW50KXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaSlcclxuICAgICAgICAgICAgY29uc3QgbGk6SFRNTExJRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICAgICAgY29uc3QgaW5wdXQ6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tjb246SFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBjaGVja2Nvbi5jbGFzc0xpc3QuYWRkKCdjaGVja2NvbicpXHJcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAnY2hlY2tib3gnXHJcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94JylcclxuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHRydWVcclxuICAgICAgICAgICAgY2hlY2tjb24uYXBwZW5kQ2hpbGQoaW5wdXQpXHJcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGNoZWNrY29uKVxyXG4gICAgICAgICAgICBmb3IobGV0IGogb2YgYXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2OkhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBpW2pdXHJcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChqKVxyXG4gICAgICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZGl2KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByYW5nZXVsLmFwcGVuZENoaWxkKGxpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBmaWxsdWwoKVxyXG5cclxufVxyXG5mZXRjaEluZm8oKVxyXG5cclxuY29uc3Qgc3RhcnRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRidG4nKVxyXG5zdGFydGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgY29uc29sZS5sb2coY29uKVxyXG4gICAgY29uc3QgcmFkaW8gPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvJyldIGFzIEhUTUxJbnB1dEVsZW1lbnRbXVxyXG4gICAgY29uc3QgaW5wdXQgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94JyldIGFzIEhUTUxJbnB1dEVsZW1lbnRbXVxyXG4gICAgY29uc3QgbnVtYmVyID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW0nKV0gYXMgSFRNTElucHV0RWxlbWVudFtdXHJcbiAgICBjb25zdCB0dXJuID0gWydXdG9NJywnV3RvUycsJ010b1cnLCdNdG9TJywnU3RvVycsJ1N0b00nXVxyXG4gICAgY29uc3QgbnVtOm51bWJlcltdID0gW11cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCA2OyBpKyspe1xyXG4gICAgICAgIGlmKG51bWJlcltpXS52YWx1ZT09PScnKXtcclxuICAgICAgICAgICAgY29uc3QgY250ID0gMFxyXG4gICAgICAgICAgICBudW0ucHVzaChjbnQpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnN0IGNudCA9IE51bWJlcihudW1iZXJbaV0udmFsdWUpXHJcbiAgICAgICAgICAgIG51bS5wdXNoKGNudClcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9ICBcclxuICAgIGNvbnNvbGUubG9nKGNvbi5jb250ZW50KVxyXG4gICAgZm9yKGxldCBpID0wOyBpIDwgY29uLmNvbnRlbnQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0W2ldKVxyXG4gICAgICAgIGlmKCFpbnB1dFtpXS5jaGVja2VkKXtcclxuICAgICAgICAgICAgY29uLmNvbnRlbnQuc3BsaWNlKGksMSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY29uLmNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHR5cGU6c3RyaW5nID0gbnVsbFxyXG4gICAgY29uc3QgZmluYWxyYW5nZSA9IGNvbi5jb250ZW50XHJcbiAgICBpZihyYWRpb1swXSl7XHJcbiAgICAgICAgdHlwZSA9ICdvYmplY3RpdmUnXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB0eXBlID0gJ3N1YmplY3RpdmUnXHJcbiAgICB9XHJcbiAgICBjb25zdCBmaW5hbG9iaiA9IHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIHRpdGxlOmRhdGEudGl0bGUsXHJcbiAgICAgICAgc2hhcmU6ZGF0YS5zaGFyZSxcclxuICAgICAgICBudW1iZXI6e1xyXG4gICAgICAgICAgICBXdG9NOm51bVswXSxcclxuICAgICAgICAgICAgV3RvUzpudW1bMV0sXHJcbiAgICAgICAgICAgIE10b1c6bnVtWzJdLFxyXG4gICAgICAgICAgICBNdG9TOm51bVszXSxcclxuICAgICAgICAgICAgU3RvVzpudW1bNF0sXHJcbiAgICAgICAgICAgIFN0b006bnVtWzVdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYWRlYnk6ZGF0YS5tYWRlYnksXHJcbiAgICAgICAgcmFuZ2U6ZmluYWxyYW5nZVxyXG4gICAgfVxyXG4gICAgY29uc3QgZ2l2ZWRhdGEgPSBhc3luYyAoKT0+e1xyXG4gICAgICAgIGlmKGZpbmFsb2JqLnJhbmdlLmxlbmd0aDw1KXtcclxuICAgICAgICAgICAgYWxlcnQoJ1lvdSBuZWVkIHRvIGFkZCBhdCBsZWFzdCA1IHdvcmRzLicpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvZXhhbS9leGFtc3RhcnQnLHtcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonQXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTpKU09OLnN0cmluZ2lmeShmaW5hbG9iailcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpIFxyXG4gICAgICAgIGlmKHJlc3VsdC5zdGF0dXMgPT09ICdnb29kJyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4YW1kYXRhID0gcmVzdWx0LmV4YW1kYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZXhhbWRhdGEudGl0bGUucmVwbGFjZUFsbCgnICcsICchQCFAJCgnKVxyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gYC9leGFtP3R5cGU9JHtleGFtZGF0YS50eXBlfSZtYWRlYnk9JHtleGFtZGF0YS5tYWRlYnl9JnRpdGxlPSR7dGl0bGV9JnNoYXJlPSR7ZXhhbWRhdGEuc2hhcmV9JmV4YW1pbmVlPSR7ZXhhbWRhdGEuZXhhbWluZWV9YFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQucmVhc29uKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdpdmVkYXRhKClcclxuICAgIC8vZXhhbWRhdGEg6rWs7ISxIOuwqeyLnVxyXG4gICAgLypcclxuICAgIHtcclxuICAgICAgICB0aXRsZSwgXHJcbiAgICAgICAgc2hhcmUsXHJcbiAgICAgICAgbWFkZWJ5KHNvbWV0aW1lcyBudWxsKSxcclxuICAgICAgICB0eXBlOidvYmplY3RpdmUnIHwgJ3N1YmplY3RpdmUsXHJcbiAgICAgICAgbnVtYmVyOnsgXHJcbiAgICAgICAgICAgIFd0b00sXHJcbiAgICAgICAgICAgIFd0b1MsXHJcbiAgICAgICAgICAgIE10b1csXHJcbiAgICAgICAgICAgIE10b1MsXHJcbiAgICAgICAgICAgIFN0b1csXHJcbiAgICAgICAgICAgIFN0b01cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJhbmdlOltcclxuICAgICAgICAgICAgMDp7d29yZDonJyxtZWFuOlsnJ10sc3lub255bTpbJyddfSxcclxuICAgICAgICAgICAgLi4uZXRjXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgKi9cclxufSlcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==