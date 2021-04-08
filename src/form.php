<?php
 if(isset($_POST['sub'])){
        if (!empty($_POST['fio'])) {$fio = $_POST['fio'];}
        if (!empty($_POST['phone'])) {$phone = $_POST['phone'];}
 
        $address = 'mazuraa49@gmail.com';
        $sub = "Обратная связь";
        $mes = "Имя: $fio \nТелефон: $phone";
        $verify = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");
        if ($verify == 'true')
        {
        echo "<center><b>Ваш заказ принят. <br><br> В течении 10 мин с Вами звяжется наш опеатор. <br><br> Ожидайте звонка";
        }
        else 
        {
        echo "<p>Сообщение не отправлено";
        }
 }
?>