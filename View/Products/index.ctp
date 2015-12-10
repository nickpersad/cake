<ul>
<?php foreach($products as $row): ?>
    <li>
        <h1><?php echo $row['Product']['title']; ?></h1>
        <h6>Price: <?php echo $row['Product']['price']; ?></h6>
        <p><?php echo $row['Product']['description']; ?></p>
    </li>
<?php endforeach; ?>
</ul>