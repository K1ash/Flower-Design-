<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['items'])) {

        $name = $_POST['name'];
        $email = $_POST['email'];
        $items = json_decode($_POST['items'], true);

        $subject = "Нове замовлення від $name";
        $message = "ІМЯ: $name\n";
        $message .= "Email: $email\n\n";
        $message .= "Товари:\n";
        foreach ($items as $item) {
            $message .= "- {$item['name']} (кількість: {$item['quantity']}, ціна за одну річ: {$item['price']})\n";
        }

      
        $to = "@gmail.com"; // пошта
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo "Замовлення успішно відправлено.";
        } else {
            echo "Помилка при надсиланні замовлення.";
        }
    } else {
        echo "Неможливо отримати дані про замовлення.";
    }
} else {
    echo "Неприпустимий метод запиту.";
}
?>
