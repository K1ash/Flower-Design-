<?php

$dbUser = 'root';
$dbName = 'flowers';
$dbPass = 'password';
$mysqli = new mysqli('localhost', $dbUser, $dbPass, $dbName);


$results_per_page = 10;
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$start_from = ($page - 1) * $results_per_page;


$query = "SELECT * FROM flowerstable LIMIT $start_from, $results_per_page";
$results = $mysqli->query($query);


$cardsHtml = '';
while ($row = $results->fetch_assoc()) {
    $cardsHtml .= '<div class="flower-card">
    <img class="flower-image" src="' . $row["image"] . '">
    <h2>' . $row["name"] . '</h2>
    <p>' . $row["price"] . ' ₴</p> 
    <button class="add-to-cart-btn" 
            data-flower-id="' . $row["id"] . '" 
            data-flower-name="' . $row["name"] . '" 
            data-flower-price="' . $row["price"] . '"
            data-flower-image="' . $row["image"] . '">В корзину</button>
  </div>';
}


$query = "SELECT COUNT(*) AS total FROM flowerstable";
$result = $mysqli->query($query);
$row = $result->fetch_assoc();
$total_pages = ceil($row["total"] / $results_per_page);


$paginationHtml = '';
for ($i = 1; $i <= $total_pages; $i++) {
    if ($i == $page) {
        $paginationHtml .= "<div class='pagination-indicator active' data-page='$i'></div>";
    } else {
        $paginationHtml .= "<div class='pagination-indicator' data-page='$i'></div>";
    }
}



$response = array(
    "cardsHtml" => $cardsHtml,
    "paginationHtml" => $paginationHtml
);
echo json_encode($response);
?>