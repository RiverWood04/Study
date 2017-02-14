<?php	
	$dbt = mysqli_connect('localhost','root','znx901104','snake_userdata') or die('Error!!!!!');
	
	$user = $_POST['username'];
	$score = $_POST['score'];

	$query = "INSERT INTO snake_highscore (name,score)".
	"VALUES ('$user','$score')";
	
	$result = mysqli_query($dbt,$query) or die('FUCK!!!');
	
 	
    require_once('score_board.php');
    

	
	mysqli_close($dbt);
	
?>