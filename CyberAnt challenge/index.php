<?php
	$form = '
			<p>Please login to view the contents of this highly secure area.</p>
			<form method="post">
			  <div class="form-group">
			    <label for="mail">Email address</label>
			    <input type="email" class="form-control" id="mail" aria-describedby="emailHelp" name="username" placeholder="Enter email">
			    <small id="emailHelp" class="form-text text-muted">We\'ll never share your email with anyone else.</small>
			  </div>
			  <div class="form-group">
			    <label for="pass">Password</label>
			    <input type="password" class="form-control" id="pass" name="password" placeholder="Password">
			  </div>
			  <button type="submit" class="btn btn-primary">Login</button>
			</form>
			';
	
	$protectedCEO = '
			<p>Welcome Mr. CEO! &nbsp;<a href="index.php">Logout</a></p>
			<p>The secret code to open the vault is: </p>
			<code>4952 9322</code>
            ';
            
    $protectedNew = '
            <p>Welcome Newbie! &nbsp;<a href="index.php">Logout</a></p>
            <p>The secret code to open the vault is: </p>
            <code>4952 9322</code>
            ';
	
	$denied = '
            <p class="text-danger">Access denied!</p>
            <a href="index.php">Try again</a>
            ';
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	#the variable contents is displayed in page.php
    
    if($_POST && !(($username == "ceo@company.com" && $password == "fluffy") || ($username == "newbie@company.com" && $password == "newbie"))){
        $contents = $denied;
    }elseif($username == "newbie@company.com" && $password == "newbie"){
        $contents = $protectedNew;
    }elseif($username == "ceo@company.com" && $password == "fluffy"){
        $contents = $protectedCEO;
    }elseif(!(($username == "ceo@company.com" && $password == "fluffy") || ($username == "newbie@company.com" && $password == "newbie"))){
        $contents = $form;
    }
	
	#load the template
	include("page.php");
?>