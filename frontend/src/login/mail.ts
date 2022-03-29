const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const sel = document.querySelector('#sel');
const logo = document.querySelector('#logo');
import {status} from '../types'

inputs[1].value = 'aaaaaaaa';
let bool = Array.from(inputs).every(v => {
    return v.validity
}) as Boolean
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
button.addEventListener('click', async e => {
    if(Array.from(inputs).every(v => v.validity.valid)){
        const obj:object = {
            id:inputs[0].value,
            pass:inputs[1].value
        };
        const res = await fetch('/mail/register', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        });
        const check:status = await res.json();
        if(check.status === 'good'){
            location.href = check.url;
        } else {
            alert(check.reason);
        }
    } 
});