<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Страница заказа</title>
    <link rel="stylesheet" href="css/order.css">
</head>
<body>
    <center>
        
    <div class="container">
        <h1>Сторінка замовлення</h1>
      <a href="index.html" style="color:black"; > Головна </a>
        <?php
        
        if (isset($_GET['items'])) {
            
            $items = json_decode($_GET['items'], true);

           
            $totalQuantity = 0;
            $totalPrice = 0;
            foreach ($items as $item) {
                $totalQuantity += $item['quantity'];
                $totalPrice += $item['price'] * $item['quantity'];
            }

           
            if (!empty($items)) {
                echo '<h2>Обрані товари:</h2>';
                echo '<ul>';
                foreach ($items as $item) {
                    echo '<div class="cart-load">';
                    echo '<img src="' . $item['image'] . '" alt="' . $item['name'] . '" style="width: 100px; height: 100px;">';
                    echo $item['name'] . ' - ' . $item['quantity'] . ' шт. - ₴' . ($item['price'] * $item['quantity']);
                    echo '</div>';
                }
                echo '</ul>';
                echo '<br>';
                echo '<p>Усього товарів: ' . $totalQuantity . ' шт.</p>';
                echo '<p>Загальна сума замовлення: ₴' . $totalPrice . '</p>';

              

echo '<h2>Оформити замовлення:</h2>';
echo ' <div class="form-container">';
echo '<div class="form-group">';
echo '<form action="send_order.php" method="post">';
echo '  <label for="name">ПІБ:</label>';
echo '  <input type="text" id="name" name="name" required><br>';
echo '</div>';
echo '<div class="form-group">';
echo '  <label for="email">Пошта:</label>';
echo '  <input type="email" id="email" name="email" required><br>';
echo '</div>';
echo '<div class="form-group">';
echo '  <label for="number">Номер телефону:</label>';
echo '  <input type="text" id="number" name="number" required><br>';
echo '</div>';
echo '<div class="form-group">';
echo '  <label for="city">Місто:</label>';
echo '  <input type="text" id="city" name="city" required><br>';
echo '</div>';
echo '<div class="form-group">';
echo '  <label for="payment">Спосіб оплати:</label>';
echo '  <select id="payment" name="payment" required>';
echo '    <option value="Наложений платіж">Наложений платіж</option>';
echo '    <option value="Оплата карткою">Оплата карткою</option>';
echo '    <option value="Оплата за рахунком">Оплата за рахунком</option>';
echo '  </select><br>';
echo '</div>';
echo '  <input type="hidden" name="items" value="' . htmlentities($_GET['items']) . '">';
echo '  <button type="submit" class="form-submit-btn">Замовити</button>';
echo ' </div>';
echo '</form>';


            } else {
                echo '<p>Вибраних товарів немає.</p>';
            }
        } else {
            echo '<p>Дані про товари не передані.</p>';
        }
        ?>
    </div>
    </center>
</body>
</html>
