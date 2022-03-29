const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const sel:HTMLSelectElement = document.querySelector('#sel');

let bool = Array.from(inputs).every(v => {
    return v.validity
}) as Boolean
sel.addEventListener('change', e => {
    sel.classList.value = sel.value;
    inputs.forEach(v => v.value = '');
    if(sel.value === 'del'){
        inputs[1].value = 'aaaaaaaa';
    } else {
        inputs[1].value = '';
    }
}); 
button.addEventListener('click', async e => {
    if(Array.from(inputs).every(v => v.validity.valid)){
        const obj = {
            id:inputs[0].value,
            pass:inputs[1].value
        };
        const res = await fetch(`/admin/${sel.value}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        });
        const check = await res.json();
        if(check.status === 'good'){
            alert(`${sel.value} 완료`);
        } else {
            alert(`${sel.value} 실패 : ${check.reason}`);
        }
    } 
});