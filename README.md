# Matrix Product Calculator

This is a calculator written in JavaScript to compute matrix products.

On the first page, the rules of matrix multiplication are displayed to the user. A matrix product is only possible if the number of columns in matrix 1 equals the number of rows in matrix 2. For example, a product of a matrix of size ``4`` by ``3`` with a matrix of size ``3`` by ``5`` is possible, but not the other way around. The maximum number of rows or columns is ``10``.

<img width="500" alt="Screen Shot 2022-06-10 at 4 14 47 PM" src="https://user-images.githubusercontent.com/87879715/173144716-bcb4f020-11d2-47ab-876c-329d3e77168d.png">

After submitting valid dimensions, the page displays a new form with rows and columns of input boxes matching the dimensions, and allows the user to insert values. There is a reset button and a randomize button which produces random floating-point numbers for each of the boxes, up to a maximum value of ``50``.

<img width="600" alt="Screen Shot 2022-06-10 at 4 19 24 PM" src="https://user-images.githubusercontent.com/87879715/173144727-381e89ce-0533-4e3e-87f8-70d453aa958c.png">

Finally, the product is computed using an algorithm that calculates several scalar products and sums and displays the solution.

<img width="600" alt="Screen Shot 2022-06-10 at 4 19 32 PM" src="https://user-images.githubusercontent.com/87879715/173144737-74c1eb4c-1da6-4dfc-8178-d363108791d3.png">
