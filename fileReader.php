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
        $javaAdded = array();
        $javaModified = array();
        $javaDeleted = array();
        while (($buffer = fgets($handle)) !== false){
            $temp = str_word_count($buffer,1,'1234567890-+:');
            $tempForCommit = str_word_count($buffer,1,'1234567890-+:/');
            if($tempForCommit[0] == "commit"){
                if($commitIndex != -1){
                    print_r($commitIndex);
                    $commit = array("Author" => $author, "commitID" => $tempForCommit[1], "Email" => $email, "CommitTime" => $commitTime ,"CommitDay" => $commitDay, "CommitMonth" => $commitMonth, "CommitYear" => $commitYear, "JavaAdded" => $javaAdded, "JavaModified" => $javaModified, "JavaDeleted" => $javaDeleted);
                    print_r($commit);
                    echo "<br/><br/>";
                }
                $commitIndex++;
                unset($javaAdded, $javaModified, $javaDeleted);
            }
            if($tempForCommit[0] == "Author:"){
                $authorBuffer = str_word_count($buffer,1,'1234567890@.');
                //print_r($lineBuffer);
                $emailLine = $authorBuffer;
                end($emailLine);
                $emailIndex = key($emailLine);
                $appendName = '';
//                print_r($emailIndex);
                for($i = 1; $i < $emailIndex; $i++){
//                    print_r($authorBuffer[$i] . "byung!<br/>");
                    $appendName .= $authorBuffer[$i] . " ";
                }
                $author = $appendName;
                $email = $authorBuffer[$emailIndex];
            }
            if($tempForCommit[0] == "Date:"){
                $dateBuffer = str_word_count($buffer,1,'1234567890:-');

                $commitMonth = $dateBuffer[2];
                $commitDay = $dateBuffer[3];
                $commitTime = $dateBuffer[4];
                $commitYear = $dateBuffer[5];
            }
            if($tempForCommit[0] == "---" || $tempForCommit[0] == "+++"){ //file is removed, modified, or created
                $fileNameinArray = $temp;
                end($fileNameinArray);
                $endIndex = key($fileNameinArray);
                if($temp[$endIndex] == "java" || $temp[1] == "dev"){ //it means java file has been created or deleted.
                    if($temp[0] == "---" && $temp[1] == "dev")
                    //"file is being created so do nothing"
                        $isfileRemoved = false;
                    if($temp[0] == "---" && $temp[1] == "a"){
                        $tempJava = $temp[$endIndex-1]; // storing the name of file.
                        $isfileRemoved = true;
                        // "file is being modified or deleted"
                    }
                    if($temp[0] == "+++" && $temp[1] == "dev" && $isfileRemoved == true){//delete
                        $javaDeleted[] = $tempJava;
//                        print_r("Delete file is detected");
//                        echo "<br/>";
                    }
                    if($temp[0] == "+++" && $temp[1] == "b"){
                        if($isfileRemoved == true)
                            $javaModified[] = $tempJava;
                        else
                            $javaAdded[] = $temp[$endIndex-1];
                    }
                }
            }
//            print_r($tempForCommit);
//            echo "<br/>";
        }
        if(!feof($handle)){
            echo "Error:unexpected fgets() fail\n";
        }
        
        //This is for the last commit. Since I am creating $commit when a word "commit" is appeared, and there is no word "commit" at the end of file.
        print_r($commitIndex);
        $commit = array("Author" => $author, "Email" => $email, "CommitTime" => $commitTime ,"CommitDay" => $commitDay, "CommitMonth" => $commitMonth, "CommitYear" => $commitYear, "JavaAdded" => $javaAdded, "JavaModified" => $javaModified, "JavaDeleted" => $javaDeleted);
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
