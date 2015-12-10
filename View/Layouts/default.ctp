<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>
		<?php echo ('Home - Web App Test') ?>
	</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
	<?php
		echo $this->Html->meta('icon');

		echo $this->Html->css(array('/js/jquery-minicolors-master/jquery.minicolors',
                                'jquery/jquery.datetimepicker',
//                                '/css/flat-ui/flat-ui-pro.min', // I think this is completely over-written by compiled less
                                '/js/c3/c3.min',
                                '/fonts',
                                'main')) ?>

	<?php	
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
	?>
	<!--[if lt IE 9]>
    <?php echo $this->Html->script(array('html5shiv/html5shiv',
                                       'respond/respond.min',
                                       'flot/excanvas.min')) ?>
    <![endif]-->
    <?php echo $this->Html->script(array('jquery/jquery-1.11.3.min',
// Plugins
                                       'jquery/jquery.placeholder',
                                       'jquery/jquery.tagcloud',
                                       'jquery/jquery.datetimepicker',
                                       'jquery-minicolors-master/jquery.minicolors.min',
// Flat-UI-Pro-1.3.0 (Bootstrap v3.2.0 and jQuery-1.11.1 dependent)
                                       'flat-ui/flat-ui-pro.min',
                                       'flat-ui/radiocheck',
//                                       'flat-ui/fileinput', // I think this is now integrated into flat-ui-pro
// UI Plugins
                                       'typeahead',
                                       'sortable_us'));
        echo $this->Html->script('d3/d3.min', array('charset' => 'utf-8'));
        echo $this->Html->script('c3/c3.min') ?>

        <?php if ( $this->fetch('dashboards_css') ) {
		    echo $this->fetch('dashboards_css');
		  } ?>
</head>
<body class="authenticated">
  	<div id="wrap" class="home-page">
  		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  			
  			<div class="nav-right"><?php echo $this->Html->link(__('Log out'), array('admin' => false, 'controller' => 'users', 'action' => 'logout'), array('id' => 'a-logout', 'title' => __('Log out'))) ?>
  			</div>
  		</div>
  		
  	</div>

	<div id="container">
		<div id="content">

			<?php echo $this->Flash->render(); ?>

			<?php echo $this->fetch('content'); ?>
		</div>
		
	</div>
</body>
</html>
