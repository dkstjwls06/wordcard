(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["admin"],{

/***/ "./src/admin.ts":
/*!**********************!*\
  !*** ./src/admin.ts ***!
  \**********************/
/***/ (() => {

const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const sel = document.querySelector('#sel');
let bool = Array.from(inputs).every(v => {
    return v.validity;
});
sel.addEventListener('change', e => {
    sel.classList.value = sel.value;
    inputs.forEach(v => v.value = '');
    if (sel.value === 'del') {
        inputs[1].value = 'aaaaaaaa';
    }
    else {
        inputs[1].value = '';
    }
});
button.addEventListener('click', async (e) => {
    if (Array.from(inputs).every(v => v.validity.valid)) {
        const obj = {
            id: inputs[0].value,
            pass: inputs[1].value
        };
        const res = await fetch(`/admin/${sel.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const check = await res.json();
        if (check.status === 'good') {
            alert(`${sel.value} 완료`);
        }
        else {
            alert(`${sel.value} 실패 : ${check.reason}`);
        }
    }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/admin.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9hZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sR0FBRyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3BDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7QUFDckIsQ0FBQyxDQUFZO0FBQ2IsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLElBQUcsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUM7UUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDaEM7U0FBTTtRQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUN2QyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUMvQyxNQUFNLEdBQUcsR0FBRztZQUNSLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUNsQixJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzNDLE1BQU0sRUFBQyxNQUFNO1lBQ2IsT0FBTyxFQUFDO2dCQUNKLGNBQWMsRUFBQyxrQkFBa0I7YUFDcEM7WUFDRCxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQztZQUN2QixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0gsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5QztLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuY29uc3Qgc2VsOkhUTUxTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbCcpO1xyXG5cclxubGV0IGJvb2wgPSBBcnJheS5mcm9tKGlucHV0cykuZXZlcnkodiA9PiB7XHJcbiAgICByZXR1cm4gdi52YWxpZGl0eVxyXG59KSBhcyBCb29sZWFuXHJcbnNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcclxuICAgIHNlbC5jbGFzc0xpc3QudmFsdWUgPSBzZWwudmFsdWU7XHJcbiAgICBpbnB1dHMuZm9yRWFjaCh2ID0+IHYudmFsdWUgPSAnJyk7XHJcbiAgICBpZihzZWwudmFsdWUgPT09ICdkZWwnKXtcclxuICAgICAgICBpbnB1dHNbMV0udmFsdWUgPSAnYWFhYWFhYWEnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dHNbMV0udmFsdWUgPSAnJztcclxuICAgIH1cclxufSk7IFxyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBlID0+IHtcclxuICAgIGlmKEFycmF5LmZyb20oaW5wdXRzKS5ldmVyeSh2ID0+IHYudmFsaWRpdHkudmFsaWQpKXtcclxuICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgIGlkOmlucHV0c1swXS52YWx1ZSxcclxuICAgICAgICAgICAgcGFzczppbnB1dHNbMV0udmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAvYWRtaW4vJHtzZWwudmFsdWV9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OkpTT04uc3RyaW5naWZ5KG9iailcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjaGVjayA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgaWYoY2hlY2suc3RhdHVzID09PSAnZ29vZCcpe1xyXG4gICAgICAgICAgICBhbGVydChgJHtzZWwudmFsdWV9IOyZhOujjGApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGAke3NlbC52YWx1ZX0g7Iuk7YyoIDogJHtjaGVjay5yZWFzb259YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==