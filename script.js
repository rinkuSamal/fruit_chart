

document.addEventListener("DOMContentLoaded", function() {
    fetch('fruits.json')

      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('fruitTableBody');//it will display what the table body will contain
        //console.log(tableBody)

        let quantities = JSON.parse(localStorage.getItem('quantities')) || {};//it will count the quantity
        //console.log(quantities)
        //console.log(data);
        data.forEach(fruit => {
          const row = document.createElement('tr');//display table row data

           //console.log(row);
  
          const nameCell = document.createElement('td');//to display name of the fruit

         //console.log(nameCell);

          nameCell.textContent = fruit.fruitName; // appending both table row data and name of the fruit
          row.appendChild(nameCell);
  
          const priceCell = document.createElement('td');//price sell of the fruit
          //console.log(priceCell)


          priceCell.textContent = `$${fruit.price}`;
          row.appendChild(priceCell);//appending both table row data with price cell
  
          const quantityCell = document.createElement('td');//display the quantity cell  is how much is it
          //console.log(quantityCell)

          const quantityValue = document.createElement('span');//display the quantity value  is how much is it
        //console.log(quantityValue)

          const fruitId = `quantity_${fruit.fruitName}`;//fruitname with quantitymerge
          console.log(fruitId);
  
          if (quantities[fruitId] !== undefined) {
            fruit.quantity = quantities[fruitId];
          } else {
            quantities[fruitId] = fruit.quantity;
          }
  
          
          
          
          const decrementBtn = document.createElement('button');    //decrementing the quantity
          decrementBtn.textContent = '-';
          decrementBtn.addEventListener('click', () => {
              if (fruit.quantity > 0) {
                  fruit.quantity--;
                  quantityValue.textContent = fruit.quantity;
                  quantities[fruitId] = fruit.quantity;
                  localStorage.setItem('quantities', JSON.stringify(quantities));
                  updateTotalPrice();
                }
            });
            quantityCell.appendChild(decrementBtn);
            



            quantityValue.textContent = fruit.quantity;     //quantity will be display
            quantityCell.appendChild(quantityValue);




          const incrementBtn = document.createElement('button');        //incrementing the quantity
          incrementBtn.textContent = '+';
          incrementBtn.addEventListener('click', () => {
            fruit.quantity++;
            quantityValue.textContent = fruit.quantity;
            quantities[fruitId] = fruit.quantity;
            localStorage.setItem('quantities', JSON.stringify(quantities));
            updateTotalPrice();
          });
          quantityCell.appendChild(incrementBtn);
  
          row.appendChild(quantityCell);
          tableBody.appendChild(row);
        });
  
        const updateTotalPrice = () => {
          let totalPrice = 0;
          data.forEach(fruit => {
            totalPrice += fruit.price * quantities[`quantity_${fruit.fruitName}`];
          });
  
          const totalPriceElement = document.getElementById('totalPrice');
          totalPriceElement.textContent = totalPrice.toFixed(2);//for the decimal decrement i have added toFixed method.
        };
  
        const nextButton = document.getElementById('nextButton');
        nextButton.addEventListener('click', function() {
          window.location.href = 'cart.html';
        });
  
        updateTotalPrice();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  