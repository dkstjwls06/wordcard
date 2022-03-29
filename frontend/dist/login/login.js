(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["login/login"],{

/***/ "./src/login/login.ts":
/*!****************************!*\
  !*** ./src/login/login.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
const as = document.querySelectorAll('.etc2');
let inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const sel = document.querySelector('#sel');
const logo = document.querySelector('#logo');
// as[2].addEventListener('click', e=>{
//     location.href = './mail.html'
// })
// const change = e => {
//     sel.dataset.id = sel.value;
//     inputs.forEach(v => v.value = '');
//     // if(sel.value === '/mail/register'){
//     //     inputs[0].type = 'email';
//     //     inputs[0].placeholder = " Ur Email Here-";
//     //     inputs[1].value = 'aaaaaaaa';
//     // } 
//     else {
//         inputs[0].type = 'text';
//         inputs[0].placeholder = " Ur ID Here-";
//     }
// };
let bool = Array.from(inputs).every(v => {
    return v.validity;
});
// window.addEventListener('load', change, {once:true});
// sel.addEventListener('change', change);
button.addEventListener('click', async (e) => {
    if (Array.from(inputs).every(v => v.validity.valid)) {
        const obj = {
            id: inputs[0].value,
            pass: inputs[1].value
        };
        const res = await fetch('/login', {
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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/login/login.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9sb2dpbi9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztBQUM3QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFJN0MsdUNBQXVDO0FBQ3ZDLG9DQUFvQztBQUNwQyxLQUFLO0FBQ0wsd0JBQXdCO0FBQ3hCLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFDekMsNkNBQTZDO0FBQzdDLHVDQUF1QztBQUN2Qyx3REFBd0Q7QUFDeEQsMkNBQTJDO0FBQzNDLFlBQVk7QUFDWixhQUFhO0FBQ2IsbUNBQW1DO0FBQ25DLGtEQUFrRDtBQUNsRCxRQUFRO0FBQ1IsS0FBSztBQUNMLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3BDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7QUFDckIsQ0FBQyxDQUFZO0FBQ2Isd0RBQXdEO0FBQ3hELDBDQUEwQztBQUMxQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2QyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUMvQyxNQUFNLEdBQUcsR0FBRztZQUNSLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQixJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM5QixNQUFNLEVBQUMsTUFBTTtZQUNiLE9BQU8sRUFBQztnQkFDSixjQUFjLEVBQUMsa0JBQWtCO2FBQ3BDO1lBQ0QsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1NBQzNCLENBQUMsQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFVLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUM7WUFDdkIsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQzdCO2FBQU07WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0o7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJsb2dpbi9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmV0YzInKVxyXG5sZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbmNvbnN0IHNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWwnKTtcclxuY29uc3QgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dvJyk7XHJcbmltcG9ydCB7c3RhdHVzfSBmcm9tICcuLi90eXBlcydcclxuXHJcblxyXG4vLyBhc1syXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PntcclxuLy8gICAgIGxvY2F0aW9uLmhyZWYgPSAnLi9tYWlsLmh0bWwnXHJcbi8vIH0pXHJcbi8vIGNvbnN0IGNoYW5nZSA9IGUgPT4ge1xyXG4vLyAgICAgc2VsLmRhdGFzZXQuaWQgPSBzZWwudmFsdWU7XHJcbi8vICAgICBpbnB1dHMuZm9yRWFjaCh2ID0+IHYudmFsdWUgPSAnJyk7XHJcbi8vICAgICAvLyBpZihzZWwudmFsdWUgPT09ICcvbWFpbC9yZWdpc3Rlcicpe1xyXG4vLyAgICAgLy8gICAgIGlucHV0c1swXS50eXBlID0gJ2VtYWlsJztcclxuLy8gICAgIC8vICAgICBpbnB1dHNbMF0ucGxhY2Vob2xkZXIgPSBcIiBVciBFbWFpbCBIZXJlLVwiO1xyXG4vLyAgICAgLy8gICAgIGlucHV0c1sxXS52YWx1ZSA9ICdhYWFhYWFhYSc7XHJcbi8vICAgICAvLyB9IFxyXG4vLyAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgaW5wdXRzWzBdLnR5cGUgPSAndGV4dCc7XHJcbi8vICAgICAgICAgaW5wdXRzWzBdLnBsYWNlaG9sZGVyID0gXCIgVXIgSUQgSGVyZS1cIjtcclxuLy8gICAgIH1cclxuLy8gfTtcclxubGV0IGJvb2wgPSBBcnJheS5mcm9tKGlucHV0cykuZXZlcnkodiA9PiB7XHJcbiAgICByZXR1cm4gdi52YWxpZGl0eVxyXG59KSBhcyBCb29sZWFuXHJcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2hhbmdlLCB7b25jZTp0cnVlfSk7XHJcbi8vIHNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2UpO1xyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBlID0+IHtcclxuICAgIGlmKEFycmF5LmZyb20oaW5wdXRzKS5ldmVyeSh2ID0+IHYudmFsaWRpdHkudmFsaWQpKXtcclxuICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgIGlkOmlucHV0c1swXS52YWx1ZSxcclxuICAgICAgICAgICAgcGFzczppbnB1dHNbMV0udmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6SlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrOnN0YXR1cyA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgaWYoY2hlY2suc3RhdHVzID09PSAnZ29vZCcpe1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gY2hlY2sudXJsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGNoZWNrLnJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==