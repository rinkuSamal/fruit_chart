document.addEventListener('DOMContentLoaded', function() {
    const quantities = JSON.parse(localStorage.getItem('quantities')) || {};
  
    fetch('fruits.json')
      .then(response => response.json())
      .then(data => {
        const cartTableBody = document.getElementById('cartTableBody');
        let totalPrice = 0;
  
        data.forEach(fruit => {
          if (quantities[`quantity_${fruit.fruitName}`] > 0) {
            const row = document.createElement('tr');
  
            const nameCell = document.createElement('td');
            nameCell.textContent = `${fruit.fruitName}=>`;
            row.appendChild(nameCell);
  
            const priceCell = document.createElement('td');
            priceCell.textContent = `Rs.${fruit.price}`;
            row.appendChild(priceCell);
  
            const quantityCell = document.createElement('td');
            const quantity = quantities[`quantity_${fruit.fruitName}`];
            quantityCell.textContent = `×${quantity}=`;
            row.appendChild(quantityCell);
  
            const totalCell = document.createElement('td');
            const total = fruit.price * quantity;
            totalCell.textContent = `Rs.${total.toFixed(2)}`;
            row.appendChild(totalCell);
  
            cartTableBody.appendChild(row);
  
            totalPrice += total;
          }
        });
  
        const totalPriceElement = document.getElementById('totalPrice');
        totalPriceElement.textContent = totalPrice.toFixed(2);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  