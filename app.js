const $form = document.querySelector("#form");
const $result = document.querySelectorAll(".result")
$form.cep.focus()

$form.cep.addEventListener("input", (e) => {
    let cep = e.target.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2'); 
    }
    e.target.value = cep;
});

$form.addEventListener('submit', e => {
    e.preventDefault()

    let cep = $form.cep.value;
    if(e.target.cep.value.length != 9){
        alert("Informe um CEP válido!")
    } else{
        getCEP(cep)
    }

    $form.cep.value = "";
})

async function getCEP(cep) {
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json = await result.json()

    if(json.erro == 'true'){
        alert("Informe um CEP válido!")
    } else{
        for(let i = 0; i < $result.length; i++){
            let atual = $result[i].id;
            $result[i].value = json[atual];
        }
    }
}