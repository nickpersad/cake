<h2 class="form-signin-heading">
	Welcome
</h2>
<div class="users form">
<?php echo $this->Flash->render('auth'); ?>
<?php echo $this->Form->create('User', array('class' => 'form-signin login')); ?>
    <fieldset>
        <legend>
            <?php echo __('Please enter your username and password'); ?>
        </legend>
        <?php echo $this->Form->input('username', array('class' => 'form-control first'));
        echo $this->Form->input('password', array('class' => 'form-control last'));
    ?>
    </fieldset>
<?php echo $this->Form->end(__('Login')); ?>
</div>