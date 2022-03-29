(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["login/mail"],{

/***/ "./src/login/mail.ts":
/*!***************************!*\
  !*** ./src/login/mail.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const sel = document.querySelector('#sel');
const logo = document.querySelector('#logo');
inputs[1].value = 'aaaaaaaa';
let bool = Array.from(inputs).every(v => {
    return v.validity;
});
// const change = e => {
//     sel.dataset.id = sel.value;
//     inputs.forEach(v => v.value = '');
//     // if(sel.value === '/mail/register'){
//     //     inputs[0].type = 'email';
//     //     inputs[0].placeholder = " Ur Email Here-";
//     //     
//     // } 
//     else {
//         inputs[0].type = 'text';
//         inputs[0].placeholder = " Ur ID Here-";
//     }
// };
// window.addEventListener('load', change, {once:true});
// sel.addEventListener('change', change);
button.addEventListener('click', async (e) => {
    if (Array.from(inputs).every(v => v.validity.valid)) {
        const obj = {
            id: inputs[0].value,
            pass: inputs[1].value
        };
        const res = await fetch('/mail/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const check = await res.json();
        if (check.status === 'good') {
            location.href = check.url;
        }
        else {
            alert(check.reason);
        }
    }
});



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/login/mail.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9sb2dpbi9tYWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFHN0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDcEMsT0FBTyxDQUFDLENBQUMsUUFBUTtBQUNyQixDQUFDLENBQVk7QUFDYix3QkFBd0I7QUFDeEIsa0NBQWtDO0FBQ2xDLHlDQUF5QztBQUN6Qyw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLHdEQUF3RDtBQUN4RCxjQUFjO0FBQ2QsWUFBWTtBQUNaLGFBQWE7QUFDYixtQ0FBbUM7QUFDbkMsa0RBQWtEO0FBQ2xELFFBQVE7QUFDUixLQUFLO0FBRUwsd0RBQXdEO0FBQ3hELDBDQUEwQztBQUMxQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2QyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUMvQyxNQUFNLEdBQUcsR0FBVTtZQUNmLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQixJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQ3RDLE1BQU0sRUFBQyxNQUFNO1lBQ2IsT0FBTyxFQUFDO2dCQUNKLGNBQWMsRUFBQyxrQkFBa0I7YUFDcEM7WUFDRCxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQVUsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQztZQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDN0I7YUFBTTtZQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImxvZ2luL21haWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuY29uc3Qgc2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbCcpO1xyXG5jb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ28nKTtcclxuaW1wb3J0IHtzdGF0dXN9IGZyb20gJy4uL3R5cGVzJ1xyXG5cclxuaW5wdXRzWzFdLnZhbHVlID0gJ2FhYWFhYWFhJztcclxubGV0IGJvb2wgPSBBcnJheS5mcm9tKGlucHV0cykuZXZlcnkodiA9PiB7XHJcbiAgICByZXR1cm4gdi52YWxpZGl0eVxyXG59KSBhcyBCb29sZWFuXHJcbi8vIGNvbnN0IGNoYW5nZSA9IGUgPT4ge1xyXG4vLyAgICAgc2VsLmRhdGFzZXQuaWQgPSBzZWwudmFsdWU7XHJcbi8vICAgICBpbnB1dHMuZm9yRWFjaCh2ID0+IHYudmFsdWUgPSAnJyk7XHJcbi8vICAgICAvLyBpZihzZWwudmFsdWUgPT09ICcvbWFpbC9yZWdpc3Rlcicpe1xyXG4vLyAgICAgLy8gICAgIGlucHV0c1swXS50eXBlID0gJ2VtYWlsJztcclxuLy8gICAgIC8vICAgICBpbnB1dHNbMF0ucGxhY2Vob2xkZXIgPSBcIiBVciBFbWFpbCBIZXJlLVwiO1xyXG4vLyAgICAgLy8gICAgIFxyXG4vLyAgICAgLy8gfSBcclxuLy8gICAgIGVsc2Uge1xyXG4vLyAgICAgICAgIGlucHV0c1swXS50eXBlID0gJ3RleHQnO1xyXG4vLyAgICAgICAgIGlucHV0c1swXS5wbGFjZWhvbGRlciA9IFwiIFVyIElEIEhlcmUtXCI7XHJcbi8vICAgICB9XHJcbi8vIH07XHJcblxyXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNoYW5nZSwge29uY2U6dHJ1ZX0pO1xyXG4vLyBzZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlKTtcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZSA9PiB7XHJcbiAgICBpZihBcnJheS5mcm9tKGlucHV0cykuZXZlcnkodiA9PiB2LnZhbGlkaXR5LnZhbGlkKSl7XHJcbiAgICAgICAgY29uc3Qgb2JqOm9iamVjdCA9IHtcclxuICAgICAgICAgICAgaWQ6aW5wdXRzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICBwYXNzOmlucHV0c1sxXS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9tYWlsL3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjaGVjazpzdGF0dXMgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIGlmKGNoZWNrLnN0YXR1cyA9PT0gJ2dvb2QnKXtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGNoZWNrLnVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChjaGVjay5yZWFzb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=