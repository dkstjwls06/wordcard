(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["index"],{

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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./src/id.ts");

const signout = document.querySelector('#signout');
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});
// fuckout / signout
const nick = document.querySelectorAll('.nick');
const init = async () => {
    const data = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
    nick[0].innerHTML = data;
    nick[1].innerHTML = data;
    return;
};
init();
// nick / userstat
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
// undertext
const support = document.querySelector('#support');
support.addEventListener('click', e => {
    location.href = '/support';
});
const share = document.querySelector('#share');
share.addEventListener('click', e => {
    location.href = '/share';
});
const fetchul = async () => {
    const res = await fetch('/userinfo');
    const data = await res.json();
    console.log(data);
    const made = data.made;
    const share = made.share;
    const unshare = made.unshare;
    console.log(share, unshare);
    const sharedul = document.querySelector('#sharedul');
    const unsharedul = document.querySelector('#unsharedul');
    console.log(share.length, unshare.length);
    if (share.length == 0) {
        let li = document.createElement('li');
        li.innerHTML = "You can upload your private wordcard and share to others!";
        sharedul.appendChild(li);
    }
    if (unshare.length == 0) {
        let li = document.createElement('li');
        li.innerHTML = "You haven't made anything yet. Create One!";
        unsharedul.appendChild(li);
    }
    for (let i = 0; i < share.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = share[i].title;
        sharedul.appendChild(li);
    }
    for (let i = 0; i < unshare.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = unshare[i].title;
        unsharedul.appendChild(li);
    }
};
fetchul();
//makeul
let visited;
let clickedTarget;
let clickedTargettitle;
const ul = document.querySelectorAll('.statul');
const stat = document.querySelector('#stat2');
const statUl = document.querySelector('#stat1');
statUl.addEventListener('click', e => {
    const tar = e.target;
    if (tar.nodeName !== 'LI')
        return;
    if (clickedTarget) {
        // clickedTarget.setAttribute('style',"color: rgb(94, 198, 230); border:none")
        clickedTarget.style.color = 'rgb(94, 198, 230)';
    }
    clickedTarget = tar;
    clickedTargettitle = tar.textContent;
    tar.style.color = 'limegreen';
    // clickedTarget.setAttribute('style',"color:limegreen; border:0 1px solid")
    visited = true;
});
stat.addEventListener('click', e => {
    const tar = e.target;
    if (!tar.classList.contains('statbtn'))
        return;
    if (!visited) {
        alert('Choose ur range first.');
        return;
    }
    const id = tar.id;
    let share = clickedTarget.parentElement.id;
    share = share.replace(/dul/g, '');
    console.log(share);
    encodeURI(share);
    let title = clickedTargettitle.replace(/\s/g, "!@!@$(");
    encodeURI(title);
    location.href = `/practice?share=${share}&title=${title}`;
    console.log(id);
});
const createnew = document.querySelector('#createNew');
createnew.addEventListener('click', async (e) => {
    const newtitle = prompt('Type new title');
    if (newtitle.trim().length === 0 || newtitle.match(/\!\@\!\@\$\(/)) {
        alert('That string cant be Title. Try another.');
        return;
    }
    console.log({ title: newtitle });
    const res = await fetch('/createnew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newtitle })
    });
    const status = await res.json();
    console.log(status);
    if (status.status === 'good') {
        const title = newtitle.replaceAll(' ', '!@!@$(');
        location.href = `/practice?share=unshare&title=${title}`;
    }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFNLEVBQUU7SUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRTtJQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsQ0FBQztBQUVELGFBQWE7Ozs7Ozs7Ozs7Ozs7O0FDTG1CO0FBRWhDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFbkQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQzVDLENBQUMsQ0FBQyxDQUFDO0FBRUgsb0JBQW9CO0FBRXBCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7QUFDL0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSw4Q0FBUyxFQUFFO0lBQzlCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsSUFBSTtJQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUk7SUFDeEIsT0FBTTtBQUNWLENBQUM7QUFDRCxJQUFJLEVBQUU7QUFFTixrQkFBa0I7QUFFbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDakQsTUFBTSxVQUFVLEdBQUcsS0FBSyxJQUFHLEVBQUU7SUFD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QUMsTUFBTTtRQUNiLE9BQU8sRUFBQztZQUNKLGNBQWMsRUFBQyxrQkFBa0I7U0FDcEM7UUFDRCxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsQ0FBQztLQUN4QyxDQUFDO0lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ25CLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUM7UUFDeEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsaUNBQWlDLEtBQUssRUFBRTtLQUMzRDtBQUVMLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSBhc3luYyA8VD4oKT0+e1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9uaWNrJylcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICByZXR1cm4gZGF0YS5uaWNrO1xyXG59XHJcblxyXG4vLyDtgbTrnbzsnbTslrjtirjsnoQhISEhXHJcbiIsImltcG9ydCB7IHN0YXR1cyxyYW5kb213b3JkLG1hZGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tIFwiLi9pZFwiXHJcblxyXG5jb25zdCBzaWdub3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZ25vdXQnKTtcclxuXHJcbnNpZ25vdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIHdpbmRvdy5wYXJlbnQubG9jYXRpb24uaHJlZiA9ICcvbG9nb3V0JztcclxufSk7XHJcblxyXG4vLyBmdWNrb3V0IC8gc2lnbm91dFxyXG5cclxuY29uc3QgbmljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uaWNrJylcclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaERhdGEoKVxyXG4gICAgbmlja1swXS5pbm5lckhUTUw9ZGF0YVxyXG4gICAgbmlja1sxXS5pbm5lckhUTUwgPSBkYXRhXHJcbiAgICByZXR1cm5cclxufVxyXG5pbml0KClcclxuIFxyXG4vLyBuaWNrIC8gdXNlcnN0YXRcclxuXHJcbmNvbnN0IGJsZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JsZXNzaW5nJylcclxuY29uc3QgZmV0Y2hibGVzcyA9IGFzeW5jICgpPT57XHJcbiAgICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9ibGVzcycpXHJcbiAgICBjb25zdCBkYXRhOnJhbmRvbXdvcmQgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBibGVzcy5pbm5lckhUTUwgPSBkYXRhLndvcmRcclxufSAgIFxyXG5mZXRjaGJsZXNzKCk7IFxyXG5jb25zdCBteXBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXlwYWdlJylcclxubXlwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xyXG59KVxyXG5cclxuLy8gdW5kZXJ0ZXh0XHJcbmNvbnN0IHN1cHBvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VwcG9ydCcpXHJcbnN1cHBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnL3N1cHBvcnQnXHJcbn0pXHJcblxyXG5jb25zdCBzaGFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGFyZScpXHJcbnNoYXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlPT57XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gJy9zaGFyZSdcclxufSlcclxuXHJcbmNvbnN0IGZldGNodWwgPSBhc3luYyAoKT0+e1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy91c2VyaW5mbycpXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIGNvbnN0IG1hZGUgPSBkYXRhLm1hZGVcclxuICAgIGNvbnN0IHNoYXJlID0gbWFkZS5zaGFyZVxyXG4gICAgY29uc3QgdW5zaGFyZSA9IG1hZGUudW5zaGFyZVxyXG4gICAgY29uc29sZS5sb2coc2hhcmUsIHVuc2hhcmUpXHJcbiAgICBcclxuICAgIFxyXG4gICAgY29uc3Qgc2hhcmVkdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hhcmVkdWwnKVxyXG4gICAgY29uc3QgdW5zaGFyZWR1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1bnNoYXJlZHVsJylcclxuICAgIGNvbnNvbGUubG9nKHNoYXJlLmxlbmd0aCwgdW5zaGFyZS5sZW5ndGgpXHJcbiAgICBpZihzaGFyZS5sZW5ndGg9PTApe1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSBcIllvdSBjYW4gdXBsb2FkIHlvdXIgcHJpdmF0ZSB3b3JkY2FyZCBhbmQgc2hhcmUgdG8gb3RoZXJzIVwiXHJcbiAgICAgICAgc2hhcmVkdWwuYXBwZW5kQ2hpbGQobGkpXHJcbiAgICB9XHJcbiAgICBpZih1bnNoYXJlLmxlbmd0aD09MCl7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxyXG4gICAgICAgIGxpLmlubmVySFRNTCA9IFwiWW91IGhhdmVuJ3QgbWFkZSBhbnl0aGluZyB5ZXQuIENyZWF0ZSBPbmUhXCJcclxuICAgICAgICB1bnNoYXJlZHVsLmFwcGVuZENoaWxkKGxpKVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpPTA7aTxzaGFyZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gc2hhcmVbaV0udGl0bGVcclxuICAgICAgICBzaGFyZWR1bC5hcHBlbmRDaGlsZChsaSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yKGxldCBpPTA7aTx1bnNoYXJlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuICAgICAgICBsaS5pbm5lckhUTUwgPSB1bnNoYXJlW2ldLnRpdGxlXHJcbiAgICAgICAgdW5zaGFyZWR1bC5hcHBlbmRDaGlsZChsaSlcclxuICAgIH1cclxuICAgIFxyXG59XHJcbmZldGNodWwoKTtcclxuXHJcbi8vbWFrZXVsXHJcblxyXG5sZXQgdmlzaXRlZDpib29sZWFuXHJcbmxldCBjbGlja2VkVGFyZ2V0OkhUTUxMSUVsZW1lbnRcclxubGV0IGNsaWNrZWRUYXJnZXR0aXRsZTogc3RyaW5nO1xyXG5jb25zdCB1bDpOb2RlTGlzdE9mPEhUTUxVTGlzdEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXR1bCcpXHJcbmNvbnN0IHN0YXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignI3N0YXQyJyk7XHJcbmNvbnN0IHN0YXRVbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTERpdkVsZW1lbnQ+KCcjc3RhdDEnKTtcclxuXHJcbnN0YXRVbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgY29uc3QgdGFyID0gZS50YXJnZXQgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIGlmKHRhci5ub2RlTmFtZSAhPT0gJ0xJJykgcmV0dXJuO1xyXG4gICAgaWYoY2xpY2tlZFRhcmdldCl7XHJcbiAgICAgICAgLy8gY2xpY2tlZFRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcImNvbG9yOiByZ2IoOTQsIDE5OCwgMjMwKTsgYm9yZGVyOm5vbmVcIilcclxuICAgICAgICBjbGlja2VkVGFyZ2V0LnN0eWxlLmNvbG9yID0gJ3JnYig5NCwgMTk4LCAyMzApJ1xyXG4gICAgfSBcclxuICAgIGNsaWNrZWRUYXJnZXQgPSB0YXI7XHJcbiAgICBjbGlja2VkVGFyZ2V0dGl0bGUgPSB0YXIudGV4dENvbnRlbnQ7XHJcbiAgICB0YXIuc3R5bGUuY29sb3IgPSAnbGltZWdyZWVuJ1xyXG4gICAgLy8gY2xpY2tlZFRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJyxcImNvbG9yOmxpbWVncmVlbjsgYm9yZGVyOjAgMXB4IHNvbGlkXCIpXHJcbiAgICB2aXNpdGVkID0gdHJ1ZTtcclxufSk7XHJcblxyXG5zdGF0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBjb25zdCB0YXIgPSBlLnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIGlmKCF0YXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGF0YnRuJykpIHJldHVybjtcclxuICAgIGlmKCF2aXNpdGVkKXtcclxuICAgICAgICBhbGVydCgnQ2hvb3NlIHVyIHJhbmdlIGZpcnN0LicpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBjb25zdCBpZCA9IHRhci5pZDtcclxuICAgIGxldCBzaGFyZSA9IGNsaWNrZWRUYXJnZXQucGFyZW50RWxlbWVudC5pZFxyXG4gICAgc2hhcmUgPSBzaGFyZS5yZXBsYWNlKC9kdWwvZywnJylcclxuICAgIGNvbnNvbGUubG9nKHNoYXJlKVxyXG4gICAgZW5jb2RlVVJJKHNoYXJlKVxyXG4gICAgbGV0IHRpdGxlID0gY2xpY2tlZFRhcmdldHRpdGxlLnJlcGxhY2UoL1xccy9nLCBcIiFAIUAkKFwiKVxyXG4gICAgZW5jb2RlVVJJKHRpdGxlKVxyXG4gICAgbG9jYXRpb24uaHJlZiA9IGAvcHJhY3RpY2U/c2hhcmU9JHtzaGFyZX0mdGl0bGU9JHt0aXRsZX1gXHJcbiAgICBjb25zb2xlLmxvZyhpZClcclxufSk7XHJcblxyXG5jb25zdCBjcmVhdGVuZXc6SFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3JlYXRlTmV3JylcclxuY3JlYXRlbmV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxhc3luYyBlPT57XHJcbiAgICBjb25zdCBuZXd0aXRsZSA9IHByb21wdCgnVHlwZSBuZXcgdGl0bGUnLClcclxuICAgIGlmKG5ld3RpdGxlLnRyaW0oKS5sZW5ndGggPT09IDAgfHwgbmV3dGl0bGUubWF0Y2goL1xcIVxcQFxcIVxcQFxcJFxcKC8pKXtcclxuICAgICAgICBhbGVydCgnVGhhdCBzdHJpbmcgY2FudCBiZSBUaXRsZS4gVHJ5IGFub3RoZXIuJylcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHt0aXRsZTpuZXd0aXRsZX0pXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2NyZWF0ZW5ldycse1xyXG4gICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTpKU09OLnN0cmluZ2lmeSh7dGl0bGU6bmV3dGl0bGV9KVxyXG4gICAgfSlcclxuICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgIGNvbnNvbGUubG9nKHN0YXR1cylcclxuICAgIGlmKHN0YXR1cy5zdGF0dXMgPT09ICdnb29kJyl7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBuZXd0aXRsZS5yZXBsYWNlQWxsKCcgJywnIUAhQCQoJylcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gYC9wcmFjdGljZT9zaGFyZT11bnNoYXJlJnRpdGxlPSR7dGl0bGV9YFxyXG4gICAgfVxyXG4gICAgXHJcbn0pXHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9