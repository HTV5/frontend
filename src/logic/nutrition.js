function getNutrition(data) {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '3f133421',
            'x-app-key': '3717f3304400f77b3193613ad59e06',
            'x-remote-user-id': '3f133421'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error);
        });



}

