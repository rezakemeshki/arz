const link = "https://exchangerate.host/#/"
axios.get(link)
.then(function(rese){
   console.log(rese)
});

document.getElementById('targetCurrency').addEventListener('change', function () {
    fetch(`/get-rates?base=${document.getElementById('sourceCurrency').value}`)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('targetCurrency');
            select.innerHTML = '';
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = `${item.name} (${item.symbol})`;
                select.appendChild(option);
            });
        });
});

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await fetch('https://api.exchangerate.host/latest', {
        method: 'POST',
        body: formData,
    });
    const data = await result.json();
    document.getElementById('result').innerHTML = JSON.stringify(data.result, null, 2);
});
