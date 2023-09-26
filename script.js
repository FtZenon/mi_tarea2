// Función para agregar números y operadores al campo de texto
function addToDisplay(value) {
    document.getElementById('display').value += value;
}

// Función para calcular y mostrar el resultado
function calculate() {
    try {
        const expression = document.getElementById('display').value;
        const result = eval(expression);
        document.getElementById('display').value = result;
        
        // Guardar la operación en el historial en localStorage
        const operationHistory = JSON.parse(localStorage.getItem('operationHistory')) || [];
        operationHistory.push({ expression, result });
        localStorage.setItem('operationHistory', JSON.stringify(operationHistory));
        updateOperationHistoryList(operationHistory);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

// Función para borrar el campo de texto
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Función para borrar el historial de operaciones
function clearHistory() {
    localStorage.removeItem('operationHistory');
    updateOperationHistoryList([]);
}

// Función para actualizar la lista de historial de operaciones
function updateOperationHistoryList(history) {
    const historyList = document.getElementById('operationHistory');
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(listItem);
    });
}

// Cargar el historial de operaciones desde localStorage al cargar la página
window.onload = function() {
    const operationHistory = JSON.parse(localStorage.getItem('operationHistory')) || [];
    updateOperationHistoryList(operationHistory);
}