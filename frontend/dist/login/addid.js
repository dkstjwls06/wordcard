(self["webpackChunksocket_test_front"] = self["webpackChunksocket_test_front"] || []).push([["login/addid"],{

/***/ "./src/login/addid.ts":
/*!****************************!*\
  !*** ./src/login/addid.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
button.addEventListener('click', async (e) => {
    if (Array.from(inputs).every(v => v.validity.valid)) { // 모든 유효성 검사 통과 시
        const obj = {
            id: inputs[0].value,
            pass: inputs[1].value
        };
        const res = await fetch(`/mail/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const check = (await res.json());
        if (check.status === 'good') {
            alert(`Sign up complete. Yay!`);
            location.href = check.url;
        }
        else {
            alert(`We're sorry, But u failed sign up process. Reason is: ${check.reason}`);
        }
    }
});



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/login/addid.ts"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NrZXQtdGVzdC1mcm9udC8uL3NyYy9sb2dpbi9hZGRpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUU7SUFDdkMsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxpQkFBaUI7UUFDbEUsTUFBTSxHQUFHLEdBQVU7WUFDZixFQUFFLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbEIsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ3ZCLENBQUM7UUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDakMsTUFBTSxFQUFDLE1BQU07WUFDYixPQUFPLEVBQUM7Z0JBQ0osY0FBYyxFQUFDLGtCQUFrQjthQUNwQztZQUNELElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztTQUMzQixDQUFDLENBQUM7UUFDSCxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFXLENBQUM7UUFDM0MsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQztZQUN2QixLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDN0I7YUFBTTtZQUNILEtBQUssQ0FBQyx5REFBeUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbEY7S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImxvZ2luL2FkZGlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcbmltcG9ydCB7c3RhdHVzfSBmcm9tICcuLi90eXBlcydcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZSA9PiB7IC8v67KE7Yq8IOuIjOuguOydhOuVjFxyXG4gICAgaWYoQXJyYXkuZnJvbShpbnB1dHMpLmV2ZXJ5KHYgPT4gdi52YWxpZGl0eS52YWxpZCkpeyAvLyDrqqjrk6Ag7Jyg7Zqo7ISxIOqygOyCrCDthrXqs7wg7IucXHJcbiAgICAgICAgY29uc3Qgb2JqOm9iamVjdCA9IHtcclxuICAgICAgICAgICAgaWQ6aW5wdXRzWzBdLnZhbHVlLFxyXG4gICAgICAgICAgICBwYXNzOmlucHV0c1sxXS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9tYWlsL2FkZGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTpKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgY2hlY2sgPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgc3RhdHVzO1xyXG4gICAgICAgIGlmKGNoZWNrLnN0YXR1cyA9PT0gJ2dvb2QnKXtcclxuICAgICAgICAgICAgYWxlcnQoYFNpZ24gdXAgY29tcGxldGUuIFlheSFgKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGNoZWNrLnVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgV2UncmUgc29ycnksIEJ1dCB1IGZhaWxlZCBzaWduIHVwIHByb2Nlc3MuIFJlYXNvbiBpczogJHtjaGVjay5yZWFzb259YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==