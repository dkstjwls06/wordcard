(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["share"],{

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

/***/ "./src/share.ts":
/*!**********************!*\
  !*** ./src/share.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./src/id.ts");
const signout = document.querySelector('#signout');
const titlecontainer = document.querySelector('#titlevalue');
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});

const nick = document.querySelector('.nick');
const init = async () => {
    const data = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
    nick.innerHTML = data;
    return;
};
init();
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
const support = document.querySelector('#support');
support.addEventListener('click', e => {
    location.href = '/support';
});
const share = document.querySelector('#share');
share.addEventListener('click', e => {
    location.href = '/share';
});
const shareul = document.querySelector('.shareul');
const fetchInfo = async () => {
    const res = await fetch('/share/getShare');
    const result = await res.json();
    console.log(result);
    for (let i of result.getshare) {
        console.log(i);
        const li = document.createElement('li');
        const data = [i.data.title, i.id];
        const array = ['one', 'two'];
        for (let i = 0; i < 2; i++) {
            const div = document.createElement('div');
            div.innerHTML = data[i];
            div.classList.add(array[i]);
            li.appendChild(div);
        }
        li.classList.add('list');
        shareul.appendChild(li);
    }
};
fetchInfo();
shareul.addEventListener('click', async (e) => {
    const target = e.target;
    console.dir(target.nodeName);
    if (target.nodeName !== 'LI') {
        const targetLi = target.parentElement;
        const temp = [targetLi.firstChild, targetLi.lastChild];
        const title = temp[0].innerHTML.replaceAll(' ', '!@!@$(');
        const user = temp[1].innerHTML;
        console.log(title, user);
        const nick = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
        location.href = `/practice?share=share&title=${title}&madeby=${user}`;
    }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/share.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9zaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFNLEVBQUU7SUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtJQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsQ0FBQztBQUVELGFBQWE7Ozs7Ozs7Ozs7Ozs7O0FDTmIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxNQUFNLGNBQWMsR0FBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFDN0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDO0FBQzJCO0FBQzlCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0FBQzVDLE1BQU0sSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLE1BQU0sOENBQVMsRUFBRTtJQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUk7SUFDckIsT0FBTTtBQUNWLENBQUM7QUFDRCxJQUFJLEVBQUU7QUFDTixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUNqRCxNQUFNLFVBQVUsR0FBRyxLQUFLLElBQUcsRUFBRTtJQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNq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QUcsRUFBQyxRQUFRLENBQUM7UUFDeEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sOENBQVMsRUFBRTtRQUM5QixRQUFRLENBQUMsSUFBSSxHQUFHLCtCQUErQixLQUFLLFdBQVcsSUFBSSxFQUFFO0tBQ3hFO0FBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6InNoYXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jIDxUPigpPT57XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL25pY2snKVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIHJldHVybiBkYXRhLm5pY2s7XHJcbn1cclxuXHJcbi8vIO2BtOudvOydtOyWuO2KuOyehCEhISFcclxuIiwiY29uc3Qgc2lnbm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWdub3V0Jyk7XHJcbmNvbnN0IHRpdGxlY29udGFpbmVyOkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGV2YWx1ZScpXHJcbnNpZ25vdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiA9ICcvbG9nb3V0JztcclxufSk7XHJcbmltcG9ydCB7ZmV0Y2hEYXRhfSBmcm9tIFwiLi9pZFwiXHJcbmNvbnN0IG5pY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmljaycpXHJcbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hEYXRhKClcclxuICAgIG5pY2suaW5uZXJIVE1MID0gZGF0YVxyXG4gICAgcmV0dXJuXHJcbn1cclxuaW5pdCgpXHJcbmNvbnN0IGJsZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JsZXNzaW5nJylcclxuY29uc3QgZmV0Y2hibGVzcyA9IGFzeW5jICgpPT57XHJcbiAgICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9ibGVzcycpXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgYmxlc3MuaW5uZXJIVE1MID0gZGF0YS53b3JkXHJcbn0gICBcclxuZmV0Y2hibGVzcygpOyBcclxuY29uc3QgbXlwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI215cGFnZScpXHJcbm15cGFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnLydcclxufSlcclxuXHJcbmNvbnN0IHN1cHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VwcG9ydCcpXHJcbnN1cHBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnL3N1cHBvcnQnXHJcbn0pXHJcblxyXG5jb25zdCBzaGFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGFyZScpXHJcbnNoYXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy9zaGFyZSdcclxufSlcclxuXHJcblxyXG5cclxuY29uc3Qgc2hhcmV1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFyZXVsJylcclxuY29uc3QgZmV0Y2hJbmZvID0gYXN5bmMgKCk9PntcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvc2hhcmUvZ2V0U2hhcmUnKVxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxyXG5cclxuICAgIGZvcihsZXQgaSBvZiByZXN1bHQuZ2V0c2hhcmUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGkpXHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IFtpLmRhdGEudGl0bGUsaS5pZF0gYXMgc3RyaW5nW11cclxuICAgICAgICBjb25zdCBhcnJheSA9IFsnb25lJywndHdvJ11cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKXtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGRhdGFbaV1cclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoYXJyYXlbaV0pXHJcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRpdilcclxuICAgICAgICB9XHJcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnbGlzdCcpXHJcbiAgICAgICAgc2hhcmV1bC5hcHBlbmRDaGlsZChsaSlcclxuXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBcclxufVxyXG5mZXRjaEluZm8oKVxyXG5cclxuc2hhcmV1bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsYXN5bmMgZT0+e1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQgfCBIVE1MTElFbGVtZW50XHJcbiAgICBjb25zb2xlLmRpcih0YXJnZXQubm9kZU5hbWUpXHJcbiAgICBpZih0YXJnZXQubm9kZU5hbWUhPT0nTEknKXtcclxuICAgICAgICBjb25zdCB0YXJnZXRMaSA9IHRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IFt0YXJnZXRMaS5maXJzdENoaWxkLHRhcmdldExpLmxhc3RDaGlsZF0gYXMgSFRNTERpdkVsZW1lbnRbXVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGVtcFswXS5pbm5lckhUTUwucmVwbGFjZUFsbCgnICcsJyFAIUAkKCcpXHJcbiAgICAgICAgY29uc3QgdXNlciA9IHRlbXBbMV0uaW5uZXJIVE1MXHJcbiAgICAgICAgY29uc29sZS5sb2codGl0bGUsdXNlcilcclxuICAgICAgICBjb25zdCBuaWNrID0gYXdhaXQgZmV0Y2hEYXRhKClcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gYC9wcmFjdGljZT9zaGFyZT1zaGFyZSZ0aXRsZT0ke3RpdGxlfSZtYWRlYnk9JHt1c2VyfWBcclxuICAgIH1cclxufSlcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=