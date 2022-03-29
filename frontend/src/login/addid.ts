const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
import {status} from '../types'
button.addEventListener('click', async e => { //버튼 눌렸을때
    if(Array.from(inputs).every(v => v.validity.valid)){ // 모든 유효성 검사 통과 시
        const obj:object = {
            id:inputs[0].value,
            pass:inputs[1].value
        };
        const res = await fetch(`/mail/add`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        });
        const check = (await res.json()) as status;
        if(check.status === 'good'){
            alert(`Sign up complete. Yay!`);
            location.href = check.url;
        } else {
            alert(`We're sorry, But u failed sign up process. Reason is: ${check.reason}`);
        }
    } 
});