const categories = {
    'Ingreso': {
        'Salario': ['Salario Karla', 'Salario Daniel'],
        'Extras': ['Alcaldía', 'Desarrollo', 'Otros']
    },
    'Egreso': {
        'Comida': ['Supermercado', 'Comida Rápida'],
        'Transporte': ['Gasolina', 'Mantenimiento'],
        'Ocio': ['Cine', 'Viajes', 'Otros']
    }
};

function updateCategories() {
    const transactionType = document.getElementById('transaction_type').value;
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = ''; // Clear existing options

    if (transactionType in categories) {
        for (const category in categories[transactionType]) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        }
    }
    updateSubcategories(); // Update subcategories based on the first available category
}

function updateSubcategories() {
    const transactionType = document.getElementById('transaction_type').value;
    const category = document.getElementById('category').value;
    const subcategorySelect = document.getElementById('subcategory');
    subcategorySelect.innerHTML = ''; // Clear existing options

    if (transactionType in categories && category in categories[transactionType]) {
        const subcategories = categories[transactionType][category];
        subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    }
}

// Initialize categories and subcategories on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCategories();
});
