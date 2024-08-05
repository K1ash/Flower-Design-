<?php

$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "byket";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT id, name, price, image FROM byket";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        echo "<div class='product' id='product{$row["id"]}'>
                <img src='images/{$row["image"]}' width='150px'>
                <h3>{$row["name"]}</h3>
                <p class='price'>Ціна: ₴{$row["price"]}</p>
                <div class='butprod'>
                    <label for='quantity{$row["id"]}'>Кількість:</label>
                    <input type='text' id='quantity{$row["id"]}' value='1' readonly class='inpflow'>
                    <button  onclick='increaseQuantity(\"quantity{$row["id"]}\")'>+</button>
                    <button  onclick='decreaseQuantity(\"quantity{$row["id"]}\")'>-</button>
                </div>
                <br>
                <button onclick='addToCart(\"product{$row["id"]}\", \"quantity{$row["id"]}\")'>Додати до корзини</button>
              </div>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
