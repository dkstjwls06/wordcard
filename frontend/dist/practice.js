(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["practice"],{

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

/***/ "./src/practice.ts":
/*!*************************!*\
  !*** ./src/practice.ts ***!
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
const tbody = document.querySelector('#wordtable tbody');
const titlecontainer = document.querySelector('#title');
let params = (new URL(`${location}`)).searchParams;
let data = {
    share: params.get('share'),
    title: params.get('title').replaceAll('!@!@$(', ' '),
    madeby: params.get('madeby')
}; // 공유 여부 / 제목 얻어내기
if (data.madeby) {
    const modify = document.querySelector('#modify');
    modify.remove();
    const back = document.createElement('div');
    back.innerHTML = 'Back';
    const nav = document.querySelector('nav');
    nav.appendChild(back);
    back.addEventListener('click', e => {
        location.href = '/share';
    });
}
else {
    const modify = document.querySelector('#modify');
    modify.addEventListener('click', e => {
        let temp = window.location.pathname;
        let name = temp.replace(/\/practice/, '');
        window.parent.location.href = `/modify?share=${data.share}&title=${data.title}`;
    });
}
let adddata = [];
if (!data.madeby) {
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
        titlecontainer.innerHTML = uldata.title;
        const array = ['word', 'mean', 'synonym'];
        for (let i = 0; i < uldata.content.length; i++) {
            adddata.push(uldata.content[i]);
            const tr = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const td = document.createElement('td');
                td.innerHTML = uldata.content[i][array[j]];
                td.classList.add(array[j]);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        if (uldata.content.length < 11) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = 'You need to add at least 10 words to play the game. Add your word now!';
            td.colSpan = 3;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    };
    console.log(adddata);
    fetchtitle();
}
else {
    const fetchtitle = async () => {
        const res = await fetch(`/share/practicefetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        const uldata = result.result;
        console.log(uldata);
        titlecontainer.innerHTML = uldata.title;
        const array = ['word', 'mean', 'synonym'];
        for (let i = 0; i < uldata.content.length; i++) {
            adddata.push(uldata.content[i]);
            const tr = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const td = document.createElement('td');
                td.innerHTML = uldata.content[i][array[j]];
                td.classList.add(array[j]);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        if (uldata.content.length < 10) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = 'You need to add at least 10 words to play the game. Add your word now!';
            td.colSpan = 3;
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    };
    console.log(adddata);
    fetchtitle();
}
const word = document.querySelectorAll('.word');
const mean = document.querySelectorAll('.mean');
const synonym = document.querySelectorAll('.synonym');
elms = { word: [], mean: [], synonym: [] };
let arr = ['word', 'mean', 'synonym'];
const optioncontainer = document.querySelector('#optioncontainer');
const doelement = (elm, b /*bool / true 시 발동 / false 시 환원*/) => {
    if (b) {
        console.log(elm, true);
        // const targets = document.querySelectorAll(`.${elm}`)
        // console.log(targets)
        // for(let i = 0; i < adddata.length; i++){
        //     const td = document.createElement('td')
        //     td.classList.add(elm)
        //     td.classList.add('temp')
        //     targets[i].classList.add('none')
        //     targets[i].parentElement.appendChild(td)
        // }
        //질문 할 것
    }
    else
        console.log(elm, false);
    // database : adddata
};
optioncontainer.addEventListener('input', e => {
    const tar = e.target;
    if (tar.value === 'word' || tar.value === 'mean' || tar.value === 'synonym') {
        doelement(tar.value, tar.checked);
    }
});
// console.log(title)
// const modify = document.querySelector('#modify')
// const exam = document.querySelector('#exam')
// // // exam.addEventListener('click',e=>{
// // //     window.parent.location.href = '/prepexam'
// // // })
const upload = document.querySelector('#upload');
if (data.share === 'unshare') {
    upload.classList.remove('none');
}
upload.addEventListener('click', e => {
    let check = window.confirm('Do you really want to upload?');
    if (check) {
        const fetchData = async () => {
            const res = await fetch('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                //data.share, data.title
            });
            const result = await res.json();
            console.log(result);
        };
        fetchData();
    }
});
const exam = document.querySelector('#exam');
exam.addEventListener('click', async (e) => {
    if (!data.madeby) {
        location.href = `/prepexam?share=${data.share}&title=${data.title}`;
    }
    else {
        location.href = `/prepexam?share=${data.share}&title=${data.title}&madeby=${data.madeby}`;
    }
});
// madeby === null 이면 내가 만든거!


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/practice.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9wcmFjdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFNLEVBQUU7SUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtJQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsQ0FBQztBQUVELGFBQWE7Ozs7Ozs7Ozs7Ozs7O0FDTGlCO0FBRTlCLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQztBQUV6QixnREFBZ0Q7QUFHaEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVuRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxTQUFTO0FBRVQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDNUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSw4Q0FBUyxFQUFFO0lBQzlCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJO0tBQ3RCO0lBQ0QsT0FBTTtBQUNWLENBQUM7QUFDRCxJQUFJLEVBQUU7QUFDTixVQUFVO0FBRVYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEs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QUMsTUFBTSxFQUFDO1FBQ1osUUFBUSxDQUFDLElBQUksR0FBRyxtQkFBbUIsSUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFO0tBQ3RFO1NBQUk7UUFDRCxRQUFRLENBQUMsSUFBSSxHQUFHLG1CQUFtQixJQUFJLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRTtLQUM1RjtBQUVMLENBQUMsQ0FBQztBQUNGLDZCQUE2QiIsImZpbGUiOiJwcmFjdGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSBhc3luYyA8VD4oKT0+e1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9uaWNrJylcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICByZXR1cm4gZGF0YS5uaWNrO1xyXG59XHJcblxyXG4vLyDtgbTrnbzsnbTslrjtirjsnoQhISEhXHJcbiIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7ZmV0Y2hEYXRhfSBmcm9tICcuL2lkJ1xyXG5pbXBvcnQge3dvcmRpbmZvLCB3b3JkY2FyZCxxdWVyeX0gZnJvbSAnLi90eXBlcydcclxubGV0IGVsbXM6d29yZGluZm8gPSBudWxsO1xyXG5cclxuLy8gbGV0IHRlbXBvYmogPSB7d29yZCxtZWFuLHN5bm9ueW19IGFzIHdvcmRpbmZvXHJcblxyXG5cclxuY29uc3Qgc2lnbm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWdub3V0Jyk7XHJcbiAgICAgICAgXHJcbnNpZ25vdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiA9ICcvbG9nb3V0JztcclxufSk7XHJcbi8vc2lnbm91dFxyXG5cclxuY29uc3QgbmljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaWNrJylcclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaERhdGEoKVxyXG4gICAgZm9yKGxldCBpID0gMCA7IGkgPCAyOyBpKyspe1xyXG4gICAgICAgIG5pY2suaW5uZXJIVE1MPWRhdGFcclxuICAgIH1cclxuICAgIHJldHVyblxyXG59XHJcbmluaXQoKVxyXG4vL25pY2tuYW1lXHJcblxyXG5jb25zdCBibGVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibGVzc2luZycpXHJcbmNvbnN0IGZldGNoYmxlc3MgPSBhc3luYyAoKT0+e1xyXG4gICAgY29uc29sZS5sb2coJ2hpJylcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYmxlc3MnKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIGJsZXNzLmlubmVySFRNTCA9IGRhdGEud29yZFxyXG59ICAgXHJcbmZldGNoYmxlc3MoKTsgXHJcbmNvbnN0IG15cGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNteXBhZ2UnKVxyXG5teXBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy8nXHJcbn0pXHJcbi8vdW5kZXJ3b3JkXHJcblxyXG5jb25zdCBzdXBwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1cHBvcnQnKVxyXG5zdXBwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy9zdXBwb3J0J1xyXG59KVxyXG5cclxuY29uc3Qgc2hhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hhcmUnKVxyXG5zaGFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvc2hhcmUnXHJcbn0pXHJcblxyXG5cclxuICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dvcmR0YWJsZSB0Ym9keScpXHJcbiAgICBjb25zdCB0aXRsZWNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpXHJcbiAgICBsZXQgcGFyYW1zID0gKG5ldyBVUkwoYCR7bG9jYXRpb259YCkpLnNlYXJjaFBhcmFtc1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgc2hhcmU6cGFyYW1zLmdldCgnc2hhcmUnKSxcclxuICAgICAgICB0aXRsZTpwYXJhbXMuZ2V0KCd0aXRsZScpLnJlcGxhY2VBbGwoJyFAIUAkKCcsICcgJyksXHJcbiAgICAgICAgbWFkZWJ5OnBhcmFtcy5nZXQoJ21hZGVieScpXHJcbiAgICB9IC8vIOqzteycoCDsl6zrtoAgLyDsoJzrqqkg7Ja77Ja064K06riwXHJcbiAgICBpZihkYXRhLm1hZGVieSl7XHJcbiAgICAgICAgY29uc3QgbW9kaWZ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGlmeScpXHJcbiAgICAgICAgbW9kaWZ5LnJlbW92ZSgpXHJcbiAgICAgICAgY29uc3QgYmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgYmFjay5pbm5lckhUTUwgPSAnQmFjaydcclxuICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKVxyXG4gICAgICAgIG5hdi5hcHBlbmRDaGlsZChiYWNrKVxyXG4gICAgICAgIGJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvc2hhcmUnXHJcbiAgICAgICAgfSlcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGNvbnN0IG1vZGlmeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RpZnknKVxyXG4gICAgICAgIG1vZGlmeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRlbXAucmVwbGFjZSgvXFwvcHJhY3RpY2UvLCcnKVxyXG4gICAgICAgICAgICB3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYgPSBgL21vZGlmeT9zaGFyZT0ke2RhdGEuc2hhcmV9JnRpdGxlPSR7ZGF0YS50aXRsZX1gXHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgfVxyXG4gICAgbGV0IGFkZGRhdGE6IGFueVtdID0gW11cclxuICAgIGlmKCFkYXRhLm1hZGVieSl7XHJcbiAgICAgICAgY29uc3QgZmV0Y2h0aXRsZSA9IGFzeW5jICgpPT57XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvcHJhY3RpY2VmZXRjaGAse1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgICAgICAgICBjb25zdCB1bGRhdGEgPSByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVsZGF0YSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRpdGxlY29udGFpbmVyLmlubmVySFRNTCA9IHVsZGF0YS50aXRsZVxyXG4gICAgICAgICAgICBjb25zdCBhcnJheSA9IFsnd29yZCcsJ21lYW4nLCdzeW5vbnltJ11cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVsZGF0YS5jb250ZW50Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGFkZGRhdGEucHVzaCh1bGRhdGEuY29udGVudFtpXSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGQuaW5uZXJIVE1MID0gdWxkYXRhLmNvbnRlbnRbaV1bYXJyYXlbal1dXHJcbiAgICAgICAgICAgICAgICAgICAgdGQuY2xhc3NMaXN0LmFkZChhcnJheVtqXSlcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0cilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih1bGRhdGEuY29udGVudC5sZW5ndGg8MTEpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcclxuICAgICAgICAgICAgICAgIHRkLmlubmVySFRNTCA9ICdZb3UgbmVlZCB0byBhZGQgYXQgbGVhc3QgMTAgd29yZHMgdG8gcGxheSB0aGUgZ2FtZS4gQWRkIHlvdXIgd29yZCBub3chJ1xyXG4gICAgICAgICAgICAgICAgdGQuY29sU3BhbiA9IDNcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKVxyXG4gICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYWRkZGF0YSlcclxuICAgICAgICBmZXRjaHRpdGxlKClcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGNvbnN0IGZldGNodGl0bGUgPSBhc3luYygpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvc2hhcmUvcHJhY3RpY2VmZXRjaGAse1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgICAgICAgICBjb25zdCB1bGRhdGEgPSByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVsZGF0YSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRpdGxlY29udGFpbmVyLmlubmVySFRNTCA9IHVsZGF0YS50aXRsZVxyXG4gICAgICAgICAgICBjb25zdCBhcnJheSA9IFsnd29yZCcsJ21lYW4nLCdzeW5vbnltJ11cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVsZGF0YS5jb250ZW50Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGFkZGRhdGEucHVzaCh1bGRhdGEuY29udGVudFtpXSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDM7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGQuaW5uZXJIVE1MID0gdWxkYXRhLmNvbnRlbnRbaV1bYXJyYXlbal1dXHJcbiAgICAgICAgICAgICAgICAgICAgdGQuY2xhc3NMaXN0LmFkZChhcnJheVtqXSlcclxuICAgICAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0Ym9keS5hcHBlbmRDaGlsZCh0cilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih1bGRhdGEuY29udGVudC5sZW5ndGg8MTApe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcclxuICAgICAgICAgICAgICAgIHRkLmlubmVySFRNTCA9ICdZb3UgbmVlZCB0byBhZGQgYXQgbGVhc3QgMTAgd29yZHMgdG8gcGxheSB0aGUgZ2FtZS4gQWRkIHlvdXIgd29yZCBub3chJ1xyXG4gICAgICAgICAgICAgICAgdGQuY29sU3BhbiA9IDNcclxuICAgICAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkKVxyXG4gICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYWRkZGF0YSlcclxuICAgICAgICBmZXRjaHRpdGxlKClcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGNvbnN0IHdvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yZCcpXHJcbiAgICBjb25zdCBtZWFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lYW4nKVxyXG4gICAgY29uc3Qgc3lub255bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zeW5vbnltJylcclxuXHJcbiAgICBlbG1zID0geyB3b3JkOltdLCBtZWFuOltdLCBzeW5vbnltOltdIH1cclxuICAgIGxldCBhcnIgPSBbJ3dvcmQnLCdtZWFuJywnc3lub255bSddXHJcbiAgICBjb25zdCBvcHRpb25jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3B0aW9uY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBkb2VsZW1lbnQgPShlbG06J3dvcmQnfCdtZWFuJ3wnc3lub255bScsIGI6Ym9vbGVhbi8qYm9vbCAvIHRydWUg7IucIOuwnOuPmSAvIGZhbHNlIOyLnCDtmZjsm5AqLyk9PntcclxuICAgICAgICBpZihiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZWxtLCB0cnVlKSBcclxuICAgICAgICAgICAgLy8gY29uc3QgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2VsbX1gKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXRzKVxyXG4gICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgYWRkZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJylcclxuICAgICAgICAgICAgLy8gICAgIHRkLmNsYXNzTGlzdC5hZGQoZWxtKVxyXG4gICAgICAgICAgICAvLyAgICAgdGQuY2xhc3NMaXN0LmFkZCgndGVtcCcpXHJcbiAgICAgICAgICAgIC8vICAgICB0YXJnZXRzW2ldLmNsYXNzTGlzdC5hZGQoJ25vbmUnKVxyXG4gICAgICAgICAgICAvLyAgICAgdGFyZ2V0c1tpXS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRkKVxyXG5cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy/sp4jrrLgg7ZWgIOqyg1xyXG4gICAgICAgIH1lbHNlIGNvbnNvbGUubG9nKGVsbSwgZmFsc2UpXHJcbiAgICAgICAgLy8gZGF0YWJhc2UgOiBhZGRkYXRhXHJcbiAgICB9O1xyXG4gICAgb3B0aW9uY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFyID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBpZih0YXIudmFsdWUgPT09ICd3b3JkJyB8fCB0YXIudmFsdWUgPT09ICdtZWFuJyB8fCB0YXIudmFsdWUgPT09ICdzeW5vbnltJyl7XHJcbiAgICAgICAgICAgIGRvZWxlbWVudCh0YXIudmFsdWUsIHRhci5jaGVja2VkKTtcclxuICAgICAgICB9XHJcbiAgICB9KSAgIFxyXG5cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aXRsZSlcclxuXHJcblxyXG4gICAgLy8gY29uc3QgbW9kaWZ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGlmeScpXHJcbiAgICAvLyBjb25zdCBleGFtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4YW0nKVxyXG5cclxuICAgIC8vIC8vIC8vIGV4YW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIC8vIC8vIC8vICAgICB3aW5kb3cucGFyZW50LmxvY2F0aW9uLmhyZWYgPSAnL3ByZXBleGFtJ1xyXG4gICAgLy8gLy8gLy8gfSlcclxuXHJcbiAgICBjb25zdCB1cGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJylcclxuICAgIGlmKGRhdGEuc2hhcmU9PT0ndW5zaGFyZScpe1xyXG4gICAgICAgIHVwbG9hZC5jbGFzc0xpc3QucmVtb3ZlKCdub25lJylcclxuICAgIH1cclxuXHJcbiAgICB1cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgICAgICBsZXQgY2hlY2sgPSB3aW5kb3cuY29uZmlybSgnRG8geW91IHJlYWxseSB3YW50IHRvIHVwbG9hZD8nKVxyXG4gICAgICAgIGlmKGNoZWNrKXtcclxuICAgICAgICAgICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvdXBsb2FkJyx7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhLnNoYXJlLCBkYXRhLnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZldGNoRGF0YSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZXhhbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleGFtJylcclxuICAgIGV4YW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGFzeW5jIGU9PntcclxuICAgICAgICBpZighZGF0YS5tYWRlYnkpe1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gYC9wcmVwZXhhbT9zaGFyZT0ke2RhdGEuc2hhcmV9JnRpdGxlPSR7ZGF0YS50aXRsZX1gXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBgL3ByZXBleGFtP3NoYXJlPSR7ZGF0YS5zaGFyZX0mdGl0bGU9JHtkYXRhLnRpdGxlfSZtYWRlYnk9JHtkYXRhLm1hZGVieX1gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxuICAgIC8vIG1hZGVieSA9PT0gbnVsbCDsnbTrqbQg64K06rCAIOunjOuToOqxsCEiXSwic291cmNlUm9vdCI6IiJ9