<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include(__DIR__ . './config.php');
if (isset($_SESSION['user']->user)) {
    $user = "'" . $_SESSION['user']->user . "'";
} else {
    $user = "''";
}
include(__DIR__ . '/../../config/config.php');

?>
<script>
    window.sessionUser = <?= $user ?>;
</script>
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,800&display=swap" rel="stylesheet">

<div id="motdNew" tabindex="-1" role="dialog">
    <div class="motd-inner motd-size" role="document">
        <div class="motd-sidebar motd-inner-section">
            <div class="img-container">
                <?php if (getimagesize(__DIR__ . $motd_image)) { ?>
                    <img src='./plugins/motd/<?= $motd_image ?>' class="logo-img" />
                <?php } else if (file_exists(__DIR__ . $motd_image)) {
                    include(__DIR__ . $motd_image);
                }; ?>
            </div>
        </div>
        <div class="motd-form motd-inner-section">
            <a type="button" class="close-i" onclick="hideMotd(event)">
                <i class="fas fa-times"></i>
            </a>
            <h1 class="motd-title"><?= $motdTitle ?></h1>
            <span class="motd-message"><?= $motdContent ?></span>
            <?php if (($noDiscordLogin !== 'true' || $noDiscordLogin !== true) && ($noNativeLogin === true || $noNativeLogin === 'true')) {
                if ($user !== "''") { ?>
                    <a href="./logout.php" class="motd-btn btn1"><i class="fab fa-2x fa-discord"></i><span> Logout</span></a>
                <?php } else { ?>
                    <a href="./user" class="motd-btn btn1"><i class="fab fa-2x fa-discord"></i><span> Login With
                            Discord</span></a>
                <?php }
                }
                if (!empty($paypalUrl)) { ?>
                <a href="<?= $paypalUrl ?>" target="_blank" class="motd-btn btn2"><i class="fas fa-2x fa-piggy-bank"></i><span> Donate</span></a>
            <?php } ?>
        </div>
    </div>
</div>