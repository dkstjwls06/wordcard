(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["modify"],{

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

/***/ "./src/modify.ts":
/*!***********************!*\
  !*** ./src/modify.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./src/id.ts");
const signout = document.querySelector('#signout');
const titlecontainer = document.querySelector('#titlevalue');
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
//signout
const array1 = ['word', 'mean', 'synonym'];
const array2 = ['wordinp', 'meaninp', 'synonyminp'];
const ul = document.querySelector('#wordcon');

const nick = document.querySelector('.nick');
const init = async () => {
    const data = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
    nick.innerHTML = data;
    return;
};
init();
//nick / userstat
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
//bottom random sentence
const support = document.querySelector('#support');
support.addEventListener('click', e => {
    location.href = '/support';
});
const share = document.querySelector('#share');
share.addEventListener('click', e => {
    location.href = '/share';
});
// const tbody = document.querySelector('#wordtable tbody')
// const titlecontainer = document.querySelector('#title')
let params = (new URL(`${location}`)).searchParams;
let data = {
    share: params.get('share'),
    title: params.get('title').replace(/\!\@\!\@\$\(/g, ' ')
}; // 공유 여부 / 제목 얻어내기
const fetchtitle = async () => {
    const res = await fetch(`/practicefetch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    const uldata = result.result;
    console.log(uldata);
    titlecontainer.value = uldata.title;
    console.log(uldata['content'].length);
    for (let i = 0; i < uldata['content'].length; i++) {
        const li = document.createElement('li');
        for (let j = 0; j < 3; j++) {
            const inp = document.createElement('input');
            inp.classList.add(array2[j]);
            inp.type = 'text';
            inp.value = uldata['content'][i][array1[j]];
            inp.classList.add('inp');
            li.appendChild(inp);
        }
        ul.appendChild(li);
    }
    for (let i = 0; i < 5; i++) {
        const li = document.createElement('li');
        for (let j = 0; j < 3; j++) {
            const inp = document.createElement('input');
            inp.classList.add(array2[j]);
            inp.type = 'text';
            inp.classList.add('inp');
            li.appendChild(inp);
        }
        ul.appendChild(li);
    }
    const addmore = document.createElement('li');
    addmore.innerHTML = 'Add More!';
    addmore.classList.add('addbtn');
    ul.appendChild(addmore);
    console.log(addmore);
    addmore.addEventListener('click', e => {
        for (let i = 0; i < 5; i++) {
            const li = document.createElement('li');
            for (let j = 0; j < 3; j++) {
                const inp = document.createElement('input');
                inp.classList.add(array2[j]);
                inp.type = 'text';
                inp.classList.add('inp');
                li.appendChild(inp);
            }
            ul.appendChild(li);
        }
        ul.removeChild(addmore);
        ul.appendChild(addmore);
    });
};
fetchtitle();
const sortbtn = document.querySelector('#sortbtn');
const autotyperbtn = document.querySelector('#autotyperbtn');
const sort = document.querySelector('#sort');
const autotyper = document.querySelector('#automean');
sortbtn.addEventListener('click', e => {
    if (sort.value === 'true') {
        let li = [...document.querySelectorAll('li:not(.addbtn)')];
        let words = [];
        const inp = [...document.querySelectorAll('.inp .wordinp')];
        // let cnt = 0;
        // for(let i=0; i<li.length;i++){
        //     if(inp[i].value == ''){
        //         cnt++
        //     }
        // }
        const newLi = li.sort((a, b) => {
            let c = a.firstChild;
            let d = b.firstChild;
            return c.value > d.value ? -1 : c.value < d.value ? 1 : 0;
        }).filter(v => v.firstChild.value);
        const ul = document.querySelector('ul');
        while (ul.firstElementChild.classList.value !== 'addbtn')
            ul.removeChild(ul.firstChild);
        for (let i of newLi) {
            ul.insertAdjacentElement('afterbegin', i); // addmore 버튼 앞에 생성
        }
        // for(let i = 0; i < inp.length;i+=3){
        //     //i:word
        //     //i+1:mean
        //     //i+2:synonym
        //     if(!inp[i].value || !inp[i+1].value || !inp[i+2].value) continue
        //     let tempmean = inp[i+1].value.split(',')
        //     console.log(tempmean)
        //     let tempsynonym = inp[i+2].value.split(',')
        //     const obj = {
        //         word:inp[i].value,
        //         mean:tempmean,
        //         synonym:tempsynonym
        //     }
        //     saveword.push(obj)
        // }
        // saveword.sort((a, b)=> { 
        //     return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
        // });
    }
});
const auto = async () => {
    const ul = document.querySelector('ul');
    ul.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.classList.contains('meaninp')) {
            const li = target.parentElement;
            const word = li.firstChild;
            console.log(word);
            const value = word.value;
            console.log(value);
            const bool = false;
            const res = await fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    bool,
                    value
                })
            });
            const result = await res.json();
            target.value = result.message.result.translatedText;
            // target.innerHTML = result.result['translatedText']
        }
    });
};
autotyperbtn.addEventListener('click', async (e) => {
    const start = await auto();
});
const save = document.querySelector('#save');
save.addEventListener('click', e => {
    let li = document.querySelectorAll('li');
    let saveword = [];
    const inp = [...document.querySelectorAll('.inp')];
    for (let i = 0; i < inp.length; i += 3) {
        //i:word
        //i+1:mean
        //i+2:synonym
        if (!inp[i].value || !inp[i + 1].value || !inp[i + 2].value)
            continue;
        let tempmean = inp[i + 1].value.split(',');
        let tempsynonym = inp[i + 2].value.split(',');
        console.log(tempmean, tempsynonym);
        const obj = {
            word: inp[i].value,
            mean: tempmean,
            synonym: tempsynonym
        };
        saveword.push(obj);
    }
    console.log(saveword);
    const fetchData = async () => {
        let temp = params.get('title');
        let data = {
            share: params.get('share'),
            title: temp.replaceAll('!@!@$(', ' ')
        };
        const newobj = {
            title: data.title,
            type: 'wordcard',
            content: saveword
        };
        const res0 = await fetch(`/practicefetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res0.json();
        const bruh = result.result;
        console.log(data);
        const res = await fetch(`/savewordcard?share=${data.share}&title=${data.title}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ patch: newobj, legacy: bruh })
        });
        const resolve = await res.json();
        console.log(resolve);
        if (resolve == 'Saved Suuccessfully!')
            alert('Saved successfully!');
        else
            alert("We're sorry, But something went wrong.");
    };
    fetchData();
});
const del = document.querySelector('#delete');
del.addEventListener('click', e => {
    if (window.confirm('Last Warning : Do you really want to delete this WordCard?')) {
        let temp = params.get('title');
        let data = {
            share: params.get('share'),
            title: temp.replaceAll('!@!@$(', ' ')
        };
        const fetchData = async () => {
            const res = await fetch('/deleteWordCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            console.log(result);
            if (result.status === 'good') {
                alert('Deleted.');
                location.href = '/';
            }
            else {
                alert(`Failed to delete - Reason : ${result.err}`);
            }
        };
        fetchData();
    }
});
//     if(uldata.content.length<11){
//         const tr = document.createElement('tr')
//         const td = document.createElement('td')
//         td.innerHTML = 'You need to add at least 10 words to play the game. Add tour word now!'
//         td.colSpan = 3
//         tr.appendChild(td)
//         tbody.appendChild(tr)
//     }
//     word = [...document.querySelectorAll('.word')]
//     mean = [...document.querySelectorAll('.mean')]
//     synonym = [...document.querySelectorAll('.synonym')]
//     elms = { word, mean, synonym }
// }
// fetchtitle()
// console.log(title)
// let elms
// let word
// let mean
// let synonym
// let tempobj = {word:[],mean:[],synonym:[]}
// const optioncontainer = document.querySelector('#optioncontainer');
// const doelement = (elm, b)=>{
//     if(b){
//         for(let i = 0; i < elms[elm].length;i++){
//             tempobj[elm].push(elms[elm][i].innerHTML)
//             elms[elm][i].innerHTML = ''
//         }
//     }else{
//         for(let i = 0; i < elms[elm].length;i++){
//             elms[elm][i].innerHTML = tempobj[elm][i]
//         }
//     }          
// };
// optioncontainer.addEventListener('input', e => {
//     doelement(e.target.value, e.target.checked);
// })  


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/modify.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9tb2RpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPLE1BQU0sU0FBUyxHQUFHLEtBQUssSUFBTSxFQUFFO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFFRCxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ05iLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkQsTUFBTSxjQUFjLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQzdFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQztBQUNILFNBQVM7QUFDVCxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsU0FBUyxDQUFDO0FBQ3BDLE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7QUFDakQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7QUFDbkI7QUFDOUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDNUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSw4Q0FBUyxFQUFFO0lBQzlCLElBQUksQ0FBQyxTQUFT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LE9BQU8sRUFBQztvQkFDSixjQUFjLEVBQUMsa0JBQWtCO2lCQUNwQztnQkFDRCxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDNUIsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNuQixJQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFDO2dCQUN4QixLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUNqQixRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUc7YUFDdEI7aUJBQUk7Z0JBQ0QsS0FBSyxDQUFDLCtCQUErQixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDckQ7UUFDTCxDQUFDO1FBQ0QsU0FBUyxFQUFFO0tBQ2Q7QUFDTCxDQUFDLENBQUM7QUFJRixvQ0FBb0M7QUFDcEMsa0RBQWtEO0FBQ2xELGtEQUFrRDtBQUNsRCxrR0FBa0c7QUFDbEcseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEMsUUFBUTtBQUNSLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsMkRBQTJEO0FBRTNELHFDQUFxQztBQUVyQyxJQUFJO0FBQ0osZUFBZTtBQUNmLHFCQUFxQjtBQUdyQixXQUFXO0FBQ1gsV0FBVztBQUNYLFdBQVc7QUFDWCxjQUFjO0FBQ2QsNkNBQTZDO0FBQzdDLHNFQUFzRTtBQUN0RSxnQ0FBZ0M7QUFDaEMsYUFBYTtBQUNiLG9EQUFvRDtBQUNwRCx3REFBd0Q7QUFDeEQsMENBQTBDO0FBQzFDLFlBQVk7QUFDWixhQUFhO0FBQ2Isb0RBQW9EO0FBQ3BELHVEQUF1RDtBQUN2RCxZQUFZO0FBQ1osa0JBQWtCO0FBQ2xCLEtBQUs7QUFFTCxtREFBbUQ7QUFDbkQsbURBQW1EO0FBQ25ELE9BQU8iLCJmaWxlIjoibW9kaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jIDxUPigpPT57XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL25pY2snKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIHJldHVybiBkYXRhLm5pY2s7XHJcbn1cclxuXHJcbi8vIO2BtOudvOydtOyWuO2KuOyehCEhISFcclxuIiwiY29uc3Qgc2lnbm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWdub3V0Jyk7XHJcbmNvbnN0IHRpdGxlY29udGFpbmVyOkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGV2YWx1ZScpXHJcbnNpZ25vdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiA9ICcvbG9nb3V0JztcclxufSk7XHJcbi8vc2lnbm91dFxyXG5jb25zdCBhcnJheTEgPSBbJ3dvcmQnLCdtZWFuJywnc3lub255bSddXHJcbiAgICBjb25zdCBhcnJheTIgPSBbJ3dvcmRpbnAnLCdtZWFuaW5wJywnc3lub255bWlucCddXHJcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JkY29uJylcclxuaW1wb3J0IHtmZXRjaERhdGF9IGZyb20gXCIuL2lkXCJcclxuY29uc3QgbmljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaWNrJylcclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaERhdGEoKVxyXG4gICAgbmljay5pbm5lckhUTUw9ZGF0YVxyXG4gICAgcmV0dXJuXHJcbn1cclxuaW5pdCgpXHJcblxyXG4vL25pY2sgLyB1c2Vyc3RhdFxyXG5cclxuY29uc3QgYmxlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxlc3NpbmcnKVxyXG5jb25zdCBmZXRjaGJsZXNzID0gYXN5bmMgKCk9PntcclxuICAgIGNvbnNvbGUubG9nKCdoaScpXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2JsZXNzJylcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBibGVzcy5pbm5lckhUTUwgPSBkYXRhLndvcmRcclxufSAgIFxyXG5mZXRjaGJsZXNzKCk7IFxyXG5jb25zdCBteXBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXlwYWdlJylcclxubXlwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xyXG59KVxyXG5cclxuLy9ib3R0b20gcmFuZG9tIHNlbnRlbmNlXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1cHBvcnQnKVxyXG5zdXBwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy9zdXBwb3J0J1xyXG59KVxyXG5cclxuY29uc3Qgc2hhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hhcmUnKVxyXG5zaGFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvc2hhcmUnXHJcbn0pXHJcblxyXG4vLyBjb25zdCB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JkdGFibGUgdGJvZHknKVxyXG4vLyBjb25zdCB0aXRsZWNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpXHJcbmxldCBwYXJhbXMgPSAobmV3IFVSTChgJHtsb2NhdGlvbn1gKSkuc2VhcmNoUGFyYW1zXHJcbmxldCBkYXRhID0ge1xyXG4gICAgc2hhcmU6cGFyYW1zLmdldCgnc2hhcmUnKSxcclxuICAgIHRpdGxlOnBhcmFtcy5nZXQoJ3RpdGxlJykucmVwbGFjZSgvXFwhXFxAXFwhXFxAXFwkXFwoL2csJyAnKVxyXG59IC8vIOqzteycoCDsl6zrtoAgLyDsoJzrqqkg7Ja77Ja064K06riwXHJcbmNvbnN0IGZldGNodGl0bGUgPSBhc3luYyAoKT0+eyAvLyDsoJzrqqnsnLzroZwg7KCV67O065OkIOu2iOufrOyYpOq4sFxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9wcmFjdGljZWZldGNoYCx7XHJcbiAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KVxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgY29uc3QgdWxkYXRhID0gcmVzdWx0LnJlc3VsdFxyXG4gICAgY29uc29sZS5sb2codWxkYXRhKVxyXG4gICAgXHJcbiAgICB0aXRsZWNvbnRhaW5lci52YWx1ZSA9IHVsZGF0YS50aXRsZVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyh1bGRhdGFbJ2NvbnRlbnQnXS5sZW5ndGgpXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpPHVsZGF0YVsnY29udGVudCddLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgMzsgaisrKXtcclxuICAgICAgICAgICAgY29uc3QgaW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICAgICAgICBpbnAuY2xhc3NMaXN0LmFkZChhcnJheTJbal0pIFxyXG4gICAgICAgICAgICBpbnAudHlwZSA9ICd0ZXh0J1xyXG4gICAgICAgICAgICBpbnAudmFsdWUgPSB1bGRhdGFbJ2NvbnRlbnQnXVtpXVthcnJheTFbal1dXHJcbiAgICAgICAgICAgIGlucC5jbGFzc0xpc3QuYWRkKCdpbnAnKVxyXG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChpbnApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpPDU7IGkrKyl7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICAgICAgaW5wLmNsYXNzTGlzdC5hZGQoYXJyYXkyW2pdKSBcclxuICAgICAgICAgICAgaW5wLnR5cGUgPSAndGV4dCdcclxuICAgICAgICAgICAgaW5wLmNsYXNzTGlzdC5hZGQoJ2lucCcpXHJcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGlucClcclxuICAgICAgICB9XHJcbiAgICAgICAgdWwuYXBwZW5kQ2hpbGQobGkpICAgICAgICBcclxuICAgIH1cclxuICAgIGNvbnN0IGFkZG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICBhZGRtb3JlLmlubmVySFRNTCA9ICdBZGQgTW9yZSEnXHJcbiAgICBhZGRtb3JlLmNsYXNzTGlzdC5hZGQoJ2FkZGJ0bicpXHJcbiAgICB1bC5hcHBlbmRDaGlsZChhZGRtb3JlKVxyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhhZGRtb3JlKVxyXG4gICAgYWRkbW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8NTsgaSsrKXtcclxuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCAzOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgaW5wLmNsYXNzTGlzdC5hZGQoYXJyYXkyW2pdKSBcclxuICAgICAgICAgICAgICAgIGlucC50eXBlID0gJ3RleHQnXHJcbiAgICAgICAgICAgICAgICBpbnAuY2xhc3NMaXN0LmFkZCgnaW5wJylcclxuICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGlucClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSkgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB1bC5yZW1vdmVDaGlsZChhZGRtb3JlKVxyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKGFkZG1vcmUpXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59XHJcblxyXG5mZXRjaHRpdGxlKClcclxuXHJcbmNvbnN0IHNvcnRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc29ydGJ0bicpXHJcbmNvbnN0IGF1dG90eXBlcmJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRvdHlwZXJidG4nKVxyXG5jb25zdCBzb3J0OkhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvcnQnKVxyXG5jb25zdCBhdXRvdHlwZXI6SFRNTFNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXV0b21lYW4nKVxyXG5zb3J0YnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBpZihzb3J0LnZhbHVlPT09J3RydWUnKXtcclxuICAgICAgICBsZXQgbGkgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MTElFbGVtZW50PignbGk6bm90KC5hZGRidG4pJyldXHJcbiAgICAgICAgbGV0IHdvcmRzID0gW11cclxuICAgICAgICBjb25zdCBpbnAgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MSW5wdXRFbGVtZW50PignLmlucCAud29yZGlucCcpXTtcclxuICAgICAgICAvLyBsZXQgY250ID0gMDtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsaS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgaWYoaW5wW2ldLnZhbHVlID09ICcnKXtcclxuICAgICAgICAvLyAgICAgICAgIGNudCsrXHJcblxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGNvbnN0IG5ld0xpID0gbGkuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICBsZXQgYyA9IGEuZmlyc3RDaGlsZCBhcyBIVE1MSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIGxldCBkID0gYi5maXJzdENoaWxkIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgcmV0dXJuIGMudmFsdWUgPiBkLnZhbHVlID8gLTEgOiBjLnZhbHVlIDwgZC52YWx1ZSA/IDEgOiAwO1xyXG4gICAgICAgIH0pLmZpbHRlcih2ID0+ICh2LmZpcnN0Q2hpbGQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpXHJcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpXHJcbiAgICAgICAgd2hpbGUodWwuZmlyc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LnZhbHVlICE9PSAnYWRkYnRuJykgdWwucmVtb3ZlQ2hpbGQodWwuZmlyc3RDaGlsZClcclxuICAgICAgICBmb3IobGV0IGkgb2YgbmV3TGkpe1xyXG4gICAgICAgICAgICB1bC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCBpKTsgLy8gYWRkbW9yZSDrsoTtirwg7JWe7JeQIOyDneyEsVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgaW5wLmxlbmd0aDtpKz0zKXtcclxuICAgICAgICAvLyAgICAgLy9pOndvcmRcclxuICAgICAgICAvLyAgICAgLy9pKzE6bWVhblxyXG4gICAgICAgIC8vICAgICAvL2krMjpzeW5vbnltXHJcbiAgICAgICAgLy8gICAgIGlmKCFpbnBbaV0udmFsdWUgfHwgIWlucFtpKzFdLnZhbHVlIHx8ICFpbnBbaSsyXS52YWx1ZSkgY29udGludWVcclxuICAgICAgICAvLyAgICAgbGV0IHRlbXBtZWFuID0gaW5wW2krMV0udmFsdWUuc3BsaXQoJywnKVxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyh0ZW1wbWVhbilcclxuICAgICAgICAvLyAgICAgbGV0IHRlbXBzeW5vbnltID0gaW5wW2krMl0udmFsdWUuc3BsaXQoJywnKVxyXG4gICAgICAgIC8vICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgLy8gICAgICAgICB3b3JkOmlucFtpXS52YWx1ZSxcclxuICAgICAgICAvLyAgICAgICAgIG1lYW46dGVtcG1lYW4sXHJcbiAgICAgICAgLy8gICAgICAgICBzeW5vbnltOnRlbXBzeW5vbnltXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgc2F2ZXdvcmQucHVzaChvYmopXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHNhdmV3b3JkLnNvcnQoKGEsIGIpPT4geyBcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGEud29yZCA8IGIud29yZCA/IC0xIDogYS53b3JkID4gYi53b3JkID8gMSA6IDA7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbn0pXHJcbmNvbnN0IGF1dG8gPSBhc3luYyAoKT0+e1xyXG4gICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpXHJcbiAgICB1bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsYXN5bmMgZT0+e1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZWFuaW5wJykpe1xyXG4gICAgICAgICAgICBjb25zdCBsaSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmQgPSBsaS5maXJzdENoaWxkIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod29yZClcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB3b3JkLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKVxyXG4gICAgICAgICAgICBjb25zdCBib29sOmJvb2xlYW4gPSBmYWxzZVxyXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL3RyYW5zbGF0ZScse1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidBcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gcmVzdWx0Lm1lc3NhZ2UucmVzdWx0LnRyYW5zbGF0ZWRUZXh0XHJcbiAgICAgICAgICAgIC8vIHRhcmdldC5pbm5lckhUTUwgPSByZXN1bHQucmVzdWx0Wyd0cmFuc2xhdGVkVGV4dCddXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5hdXRvdHlwZXJidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGFzeW5jIGU9PntcclxuICAgIGNvbnN0IHN0YXJ0ID0gYXdhaXQgYXV0bygpXHJcbn0pXHJcbmNvbnN0IHNhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpXHJcbnNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGxldCBsaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcclxuICAgIGxldCBzYXZld29yZDogeyB3b3JkOiBzdHJpbmc7IG1lYW46IHN0cmluZ1tdOyBzeW5vbnltOiBzdHJpbmdbXTsgfVtdID0gW11cclxuICAgIGNvbnN0IGlucCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KCcuaW5wJyldO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlucC5sZW5ndGg7aSs9Myl7XHJcbiAgICAgICAgLy9pOndvcmRcclxuICAgICAgICAvL2krMTptZWFuXHJcbiAgICAgICAgLy9pKzI6c3lub255bVxyXG4gICAgICAgIGlmKCFpbnBbaV0udmFsdWUgfHwgIWlucFtpKzFdLnZhbHVlIHx8ICFpbnBbaSsyXS52YWx1ZSkgY29udGludWVcclxuICAgICAgICBsZXQgdGVtcG1lYW4gPSBpbnBbaSsxXS52YWx1ZS5zcGxpdCgnLCcpXHJcbiAgICAgICAgbGV0IHRlbXBzeW5vbnltID0gaW5wW2krMl0udmFsdWUuc3BsaXQoJywnKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBtZWFuLCB0ZW1wc3lub255bSlcclxuICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgIHdvcmQ6aW5wW2ldLnZhbHVlLFxyXG4gICAgICAgICAgICBtZWFuOnRlbXBtZWFuLFxyXG4gICAgICAgICAgICBzeW5vbnltOnRlbXBzeW5vbnltXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNhdmV3b3JkLnB1c2gob2JqKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coc2F2ZXdvcmQpXHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKT0+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZW1wID0gcGFyYW1zLmdldCgndGl0bGUnKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzaGFyZTpwYXJhbXMuZ2V0KCdzaGFyZScpLFxyXG4gICAgICAgICAgICB0aXRsZTp0ZW1wLnJlcGxhY2VBbGwoJyFAIUAkKCcsJyAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdvYmogPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOmRhdGEudGl0bGUsXHJcbiAgICAgICAgICAgIHR5cGU6J3dvcmRjYXJkJyxcclxuICAgICAgICAgICAgY29udGVudDpzYXZld29yZFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXMwID0gYXdhaXQgZmV0Y2goYC9wcmFjdGljZWZldGNoYCx7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlczAuanNvbigpXHJcbiAgICAgICAgY29uc3QgYnJ1aCA9IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvc2F2ZXdvcmRjYXJkP3NoYXJlPSR7ZGF0YS5zaGFyZX0mdGl0bGU9JHtkYXRhLnRpdGxlfWAse1xyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KHtwYXRjaDpuZXdvYmosbGVnYWN5OmJydWh9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNvbHZlKVxyXG4gICAgICAgIGlmKHJlc29sdmUgPT0nU2F2ZWQgU3V1Y2Nlc3NmdWxseSEnKSBhbGVydCgnU2F2ZWQgc3VjY2Vzc2Z1bGx5IScpXHJcbiAgICAgICAgZWxzZSBhbGVydChcIldlJ3JlIHNvcnJ5LCBCdXQgc29tZXRoaW5nIHdlbnQgd3JvbmcuXCIpXHJcbiAgICB9XHJcbiAgICBmZXRjaERhdGEoKVxyXG5cclxufSlcclxuXHJcbmNvbnN0IGRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZWxldGUnKVxyXG5kZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGlmKHdpbmRvdy5jb25maXJtKCdMYXN0IFdhcm5pbmcgOiBEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlIHRoaXMgV29yZENhcmQ/Jykpe1xyXG4gICAgICAgIGxldCB0ZW1wID0gcGFyYW1zLmdldCgndGl0bGUnKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICBzaGFyZTpwYXJhbXMuZ2V0KCdzaGFyZScpLFxyXG4gICAgICAgICAgICB0aXRsZTp0ZW1wLnJlcGxhY2VBbGwoJyFAIUAkKCcsJyAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYygpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvZGVsZXRlV29yZENhcmQnLHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgICAgICBpZihyZXN1bHQuc3RhdHVzID09PSAnZ29vZCcpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0RlbGV0ZWQuJylcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRmFpbGVkIHRvIGRlbGV0ZSAtIFJlYXNvbiA6ICR7cmVzdWx0LmVycn1gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZldGNoRGF0YSgpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5cclxuXHJcbi8vICAgICBpZih1bGRhdGEuY29udGVudC5sZW5ndGg8MTEpe1xyXG4vLyAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4vLyAgICAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxyXG4vLyAgICAgICAgIHRkLmlubmVySFRNTCA9ICdZb3UgbmVlZCB0byBhZGQgYXQgbGVhc3QgMTAgd29yZHMgdG8gcGxheSB0aGUgZ2FtZS4gQWRkIHRvdXIgd29yZCBub3chJ1xyXG4vLyAgICAgICAgIHRkLmNvbFNwYW4gPSAzXHJcbi8vICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpXHJcbi8vICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpXHJcbi8vICAgICB9XHJcbi8vICAgICB3b3JkID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JkJyldXHJcbi8vICAgICBtZWFuID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZWFuJyldXHJcbi8vICAgICBzeW5vbnltID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zeW5vbnltJyldXHJcbiAgICBcclxuLy8gICAgIGVsbXMgPSB7IHdvcmQsIG1lYW4sIHN5bm9ueW0gfVxyXG4gICAgXHJcbi8vIH1cclxuLy8gZmV0Y2h0aXRsZSgpXHJcbi8vIGNvbnNvbGUubG9nKHRpdGxlKVxyXG5cclxuXHJcbi8vIGxldCBlbG1zXHJcbi8vIGxldCB3b3JkXHJcbi8vIGxldCBtZWFuXHJcbi8vIGxldCBzeW5vbnltXHJcbi8vIGxldCB0ZW1wb2JqID0ge3dvcmQ6W10sbWVhbjpbXSxzeW5vbnltOltdfVxyXG4vLyBjb25zdCBvcHRpb25jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3B0aW9uY29udGFpbmVyJyk7XHJcbi8vIGNvbnN0IGRvZWxlbWVudCA9IChlbG0sIGIpPT57XHJcbi8vICAgICBpZihiKXtcclxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWxtc1tlbG1dLmxlbmd0aDtpKyspe1xyXG4vLyAgICAgICAgICAgICB0ZW1wb2JqW2VsbV0ucHVzaChlbG1zW2VsbV1baV0uaW5uZXJIVE1MKVxyXG4vLyAgICAgICAgICAgICBlbG1zW2VsbV1baV0uaW5uZXJIVE1MID0gJydcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9ZWxzZXtcclxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWxtc1tlbG1dLmxlbmd0aDtpKyspe1xyXG4vLyAgICAgICAgICAgICBlbG1zW2VsbV1baV0uaW5uZXJIVE1MID0gdGVtcG9ialtlbG1dW2ldXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSAgICAgICAgICBcclxuLy8gfTtcclxuXHJcbi8vIG9wdGlvbmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xyXG4vLyAgICAgZG9lbGVtZW50KGUudGFyZ2V0LnZhbHVlLCBlLnRhcmdldC5jaGVja2VkKTtcclxuLy8gfSkgICJdLCJzb3VyY2VSb290IjoiIn0=