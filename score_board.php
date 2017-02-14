<?php
    $order = "SELECT * FROM snake_highscore ORDER BY score DESC,date ASC";
    $scoredata = mysqli_query($dbt,$order);
	
	$i = 0;
	echo '<span id="score_title">高分榜</span>';
    echo '<ol id="score_tab">';
    while($row = mysqli_fetch_array($scoredata)){
    	echo '<li>' . $row[name] . ':' . $row[score] . '</li>';
		$i++;
		if($i>=10){
			return false;
		}
	}
    echo '</ol>';
   
	mysqli_close($dbt);
?>