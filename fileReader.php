<!DOCTYPE html>
<html>
<head>
<title>Php read file</title>
<style type="text/css">
html, body {
margin: 0;
padding: 0;
width: 100%;
height:100%
}

</style>


<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript">


$(document).ready(function() {
                  var test = <?php
                  $file = file_get_contents('fruits.txt', FILE_USE_INCLUDE_PATH);
                  echo $file
                  ?>
                  
                   console.log(test);
                   console.log(test[2]);
                  
                   var test2 = ["apple","orange","grapes"];
                   console.log(test2);
                   console.log(test2[2]);
                  
                  
                  document.getElementById("outputjs1").innerHTML = test;
                  document.getElementById("outputjs2").innerHTML = test2;
});


</script>
</head>

<body>
<div>direct html text:</div>
<div>Hello World!</div>
<br/>
<div>php text:</div>
<div><?php echo "this is php txt";?></div>
<br/>

<div>php reading file, outputs directly to HTML:</div>
<div> <?php
    $file = file_get_contents('fruits.txt', FILE_USE_INCLUDE_PATH);
    echo $file
    ?>
</div>
<br/>

<div>output from js:</div>
<div id="outputjs1"></div>
<div id="outputjs2"></div>
<script>

window.onload =function() {
    
    var test2 = ["apple","orange","grapes"];

    //$("#outputjs1").appendChild("test");
    //$("#outputjs2").appendCHild(test2);
    //console.log($("#outputjs1").innerHTML);
    //console.log($("#outputjs2").innerHTML);

}
</script>
</body>
</html>
