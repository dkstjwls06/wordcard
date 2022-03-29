(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["support"],{

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

/***/ "./src/support.ts":
/*!************************!*\
  !*** ./src/support.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "./src/id.ts");
const signout = document.querySelector('#signout');
const titlecontainer = document.querySelector('#titlevalue');
signout.addEventListener('click', e => {
    window.parent.location.href = '/logout';
});

const nick = document.querySelectorAll('.nick');
const init = async () => {
    const data = await (0,_id__WEBPACK_IMPORTED_MODULE_0__.fetchData)();
    for (let i = 0; i < 2; i++)
        nick[i].innerHTML = data;
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
const changeid = document.querySelector('#changeid');
const changepass = document.querySelector('#changepass');
changepass.addEventListener('click', async (e) => {
    const pass = prompt('Enter your current Password');
    const obj = {
        pass
    };
    const res = await fetch('/personcheck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
    const check = await res.json();
    if (check.status === 'good') {
        const newpass = prompt('Enter New Password.');
        const res = await fetch('/newdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ type: 'hash', newpass })
        });
        const result = await res.json();
        if (result.status === 'good') {
            alert('Successfully Changed!');
            location.href = '/';
        }
        else {
            alert(`Change process failed : ${result.reason}`);
        }
    }
    else {
        alert(check.reason);
    }
});
const select = document.querySelector('#selection');
const submit = document.querySelector('#submit');
const text = document.querySelector('textarea');
submit.addEventListener('click', e => {
    const genre = select.value;
    const textvalue = text.value;
    const fetchData = async () => {
        const obj = {
            genre,
            textvalue
        };
        const res = await fetch('/suggest', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(obj)
        });
        const check = await res.json();
        console.log(check);
        if (check) {
            alert('Sending Successful! Thanks for your opinion!');
            location.reload();
        }
        else
            alert(`We're sorry, But error occured. Error : ${check.reason}`);
    };
    fetchData();
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/support.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9pZC50cyIsIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9zdXBwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTyxNQUFNLFNBQVMsR0FBRyxLQUFLLElBQU0sRUFBRTtJQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFO0lBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztBQUNyQixDQUFDO0FBRUQsYUFBYTs7Ozs7Ozs7Ozs7Ozs7QUNOYixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sY0FBYyxHQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUM3RSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDMkI7QUFDOUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztBQUMvQyxNQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtJQUNwQixNQUFNLElBQUksR0FBRyxNQUFNLDhDQUFTLEVBQUU7SUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUU7UUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUk7SUFDL0MsT0FBTTtBQUNWLENBQUM7QUFDRCxJQUFJLEVBQUU7QUFFTixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdB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LENBQUM7QUFDL0QsTUFBTSxJQUFJLEdBQXVCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxHQUFFO0lBQy9CLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLO0lBQzFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLO0lBQzVCLE1BQU0sU0FBUyxHQUFHLEtBQUssSUFBRyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxHQUFHO1lBQ1IsS0FBSztZQUNMLFNBQVM7U0FDWjtRQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBQztZQUMvQixNQUFNLEVBQUMsTUFBTTtZQUNiLE9BQU8sRUFBQztnQkFDSixjQUFjLEVBQUMsa0JBQWtCO2FBQ3BDO1lBQ0QsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1NBQzNCLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBRyxLQUFLLEVBQUM7WUFDTCxLQUFLLENBQUMsOENBQThDLENBQUM7WUFDckQsUUFBUSxDQUFDLE1BQU0sRUFBRTtTQUNwQjs7WUFBTSxLQUFLLENBQUMsMkNBQTJDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzRSxDQUFDO0lBQ0QsU0FBUyxFQUFFO0FBQ2YsQ0FBQyxDQUFDIiwiZmlsZSI6InN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgPFQ+KCk9PntcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvbmljaycpXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgcmV0dXJuIGRhdGEubmljaztcclxufVxyXG5cclxuLy8g7YG065287J207Ja47Yq47J6EISEhIVxyXG4iLCJjb25zdCBzaWdub3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZ25vdXQnKTtcclxuY29uc3QgdGl0bGVjb250YWluZXI6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZXZhbHVlJylcclxuc2lnbm91dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgd2luZG93LnBhcmVudC5sb2NhdGlvbi5ocmVmID0gJy9sb2dvdXQnO1xyXG59KTtcclxuaW1wb3J0IHtmZXRjaERhdGF9IGZyb20gXCIuL2lkXCJcclxuY29uc3QgbmljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uaWNrJylcclxuY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaERhdGEoKVxyXG4gICAgZm9yKGxldCBpID0gMDsgaTwyO2krKyluaWNrW2ldLmlubmVySFRNTCA9IGRhdGFcclxuICAgIHJldHVyblxyXG59XHJcbmluaXQoKVxyXG5cclxuY29uc3QgYmxlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmxlc3NpbmcnKVxyXG5jb25zdCBmZXRjaGJsZXNzID0gYXN5bmMgKCk9PntcclxuICAgIGNvbnNvbGUubG9nKCdoaScpXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2JsZXNzJylcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBibGVzcy5pbm5lckhUTUwgPSBkYXRhLndvcmRcclxufSAgIFxyXG5mZXRjaGJsZXNzKCk7IFxyXG5jb25zdCBteXBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXlwYWdlJylcclxubXlwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvJ1xyXG59KVxyXG5cclxuY29uc3Qgc3VwcG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdXBwb3J0Jylcclxuc3VwcG9ydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZT0+e1xyXG4gICAgbG9jYXRpb24uaHJlZiA9ICcvc3VwcG9ydCdcclxufSlcclxuXHJcbmNvbnN0IHNoYXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NoYXJlJylcclxuc2hhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGxvY2F0aW9uLmhyZWYgPSAnL3NoYXJlJ1xyXG59KVxyXG5cclxuY29uc3QgY2hhbmdlaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlaWQnKVxyXG5jb25zdCBjaGFuZ2VwYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZXBhc3MnKVxyXG5cclxuY2hhbmdlcGFzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsYXN5bmMgZT0+e1xyXG4gICAgY29uc3QgcGFzcyA9IHByb21wdCgnRW50ZXIgeW91ciBjdXJyZW50IFBhc3N3b3JkJylcclxuICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICBwYXNzXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9wZXJzb25jaGVjaycsIHtcclxuICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjaGVjayA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICBpZihjaGVjay5zdGF0dXMgPT09ICdnb29kJyl7XHJcbiAgICAgICAgY29uc3QgbmV3cGFzcyA9IHByb21wdCgnRW50ZXIgTmV3IFBhc3N3b3JkLicpXHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9uZXdkYXRhJyx7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J0FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkoe3R5cGU6J2hhc2gnLG5ld3Bhc3N9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgICAgIGlmKHJlc3VsdC5zdGF0dXMgPT09ICdnb29kJyl7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTdWNjZXNzZnVsbHkgQ2hhbmdlZCEnKVxyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy8nXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBDaGFuZ2UgcHJvY2VzcyBmYWlsZWQgOiAke3Jlc3VsdC5yZWFzb259YClcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KGNoZWNrLnJlYXNvbik7XHJcbiAgICB9XHJcbiAgICBcclxufSlcclxuXHJcbmNvbnN0IHNlbGVjdDpIVE1MU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3Rpb24nKVxyXG5jb25zdCBzdWJtaXQ6SFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0JylcclxuY29uc3QgdGV4dDpIVE1MVGV4dEFyZWFFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKVxyXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGU9PntcclxuICAgIGNvbnN0IGdlbnJlID0gc2VsZWN0LnZhbHVlXHJcbiAgICBjb25zdCB0ZXh0dmFsdWUgPSB0ZXh0LnZhbHVlXHJcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKT0+e1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgZ2VucmUsXHJcbiAgICAgICAgICAgIHRleHR2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL3N1Z2dlc3QnLHtcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonQXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTpKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCBjaGVjayA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgICBjb25zb2xlLmxvZyhjaGVjaylcclxuICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTZW5kaW5nIFN1Y2Nlc3NmdWwhIFRoYW5rcyBmb3IgeW91ciBvcGluaW9uIScpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXHJcbiAgICAgICAgfSBlbHNlIGFsZXJ0KGBXZSdyZSBzb3JyeSwgQnV0IGVycm9yIG9jY3VyZWQuIEVycm9yIDogJHtjaGVjay5yZWFzb259YClcclxuICAgIH1cclxuICAgIGZldGNoRGF0YSgpXHJcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==