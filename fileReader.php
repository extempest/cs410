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
                  // in order to make txt file, put :  git log -p --reverse > txtfileName.txt
                  
                  
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

<?php
    $handle = @fopen("mockByengProject.txt","r");
    if($handle) {
        $commitIndex = -1;
        while (($buffer = fgets($handle)) !== false){
            $temp = str_word_count($buffer,1,'1234567890-+');
            //$lineTemp = str_split($buffer);
            print_r($temp);
            echo "<br/>";
            if($temp[0] == "commit"){
                if($commitIndex != -1){
                    print_r($commitIndex);
                    $commit = array($author, $email, $commitTime ,$commitDay, $commitMonth, $commitYear);
                    print_r($commit);
                }
                $commitIndex++;
            }
            if($temp[0] == "Author"){
                $authorBuffer = str_word_count($buffer,1,'1234567890@.');
                //print_r($lineBuffer);
                $author = $authorBuffer[1];
                $email = $authorBuffer[2];
            }
            if($temp[0] == "Date"){
                $dateBuffer = str_word_count($buffer,1,'1234567890:-');

                $commitMonth = $dateBuffer[2];
                $commitDay = $dateBuffer[3];
                $commitTime = $dateBuffer[4];
                $commitYear = $dateBuffer[5];
            }
            if($temp[0] == "---" || $temp[0] == "+++"){ //file is removed, modified, or created
                $fileNameinArray = $temp;
                end($fileNameinArray);
                $endIndex = key($fileNameinArray);
//                if($temp[$endIndex] = "java"){
//                    
//                }
            }
        }
        if(!feof($handle)){
            echo "Error:unexpected fgets() fail\n";
        }
        
        //This is for the last commit. Since I am creating $commit when a word "commit" is appeared, and there is no word "commit" at the end of file.
        $commit = array($author, $email, $commitTime, $commitDay, $commitMonth, $commitYear);
        $commitIndex++;
        print_r($commit);
        
        fclose($handle);
    }
    ?>


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
