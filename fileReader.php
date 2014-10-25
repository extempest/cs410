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
//    $handle = @fopen("mockByengProject.txt","r");
    $handle = @fopen("mockTest.txt","r");
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
//                    print_r($commitIndex);
                    $commit = array("Author" => $author, "commitID" => $tempForCommit[1], "Email" => $email, "CommitTime" => $commitTime ,"CommitDay" => $commitDay, "CommitMonth" => $commitMonth, "CommitYear" => $commitYear, "JavaAdded" => $javaAdded, "JavaModified" => $javaModified, "JavaDeleted" => $javaDeleted);
//                    print_r($commit);
//                    echo "<br/><br/>";
                }
                $commitIndex++;
                unset($javaAdded, $javaModified, $javaDeleted);
            }
            if($tempForCommit[0] == "Author:"){
                $authorBuffer = str_word_count($buffer,1,'1234567890@._-');
                //print_r($lineBuffer);
                $emailLine = $authorBuffer;
                end($emailLine);
                $emailIndex = key($emailLine);
                $appendName = '';
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
            //check whether file is removed, modified, or created
            if($tempForCommit[0] == "---" || $tempForCommit[0] == "+++"){
                $fileNameinArray = $temp;
                end($fileNameinArray);
                $endIndex = key($fileNameinArray);
                if($temp[$endIndex] == "java" || $temp[1] == "dev"){ //it means java file has been created or deleted.
                    if($temp[0] == "---" && $temp[1] == "dev")
                    //"file is being created so do nothing"
                        $isfileRemoved = false;
                    if($temp[0] == "---" && $temp[1] == "a"){
                        $classNameJava = $temp[$endIndex-1]; // storing the name of file.
                        $isfileRemoved = true;
                        // "file is being modified or deleted"
                    }
                    if($temp[0] == "+++" && $temp[1] == "dev" && $isfileRemoved == true){//delete
                        $javaDeleted[] = $classNameJava;
                    }
                    if($temp[0] == "+++" && $temp[1] == "b"){
                        if($isfileRemoved == true)
                            $javaModified[] = $classNameJava;
                        else {
                            $classNameJava = $temp[$endIndex-1];
                            $javaAdded[] = $$classNameJava;
                        }
                    }
                }
            }
            //if the line contains class and next index is the classname we are looking for.
            if( in_array("class",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("class", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
                print_r("I found class, ".$classNameJava."<br/>");
                createRelations($tempForCommit, $indexClassKey, $classNameJava);
            }
            if( in_array("interface",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("interface", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
                print_r("I found interface, ".$classNameJava."<br/>");
                createRelations($tempForCommit, $indexClassKey, $classNameJava);
            }
            //print out raw text file in array format
//            print_r($tempForCommit."<br/>");
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

<?php
    function createRelations($lineArray,$index,$className){
        if($lineArray[$index + 1] == "extends"){
            for($i = $index +2; $i < sizeof($lineArray); $i++){
                if($lineArray[$i] != "implements")
                    $parentClass[] = $lineArray[$i];
            }
            $childClass = $className;
            print_r("class ".$childClass . " is a child of [");
            for($i=0;$i<sizeof($parentClass);$i++)
                print_r($parentClass[$i].", ");
            print_r("]<br/>");

        }
//
//            if(in_array("implements",$lineArray)){
//                $implementsKey = array_search("implements", $lineArray);
//                for($i = $index +2; $i < sizeof($lineArray); $i++)
//                    if($i != $implementsKey)
//                        $parentClass[] = $lineArray[$i];
//                $childClass = $className;
//            }
//            else{
//                for($i = $index +2; $i < sizeof($lineArray); $i++)
//                        $parentClass[] = $lineArray[$i];
//                $childClass = $className;
//            }
//            $parentClass = $lineArray[$index + 2];
//            $childClass = $className;
//            print_r("class ".$childClass . " is a child of ".$parentClass."<br/>");
//        }
        //there is no extends
        if($lineArray[$index + 1] == "implements") {
            for($i = $index + 2; $i < sizeof($lineArray); $i++)
                $parentClass[] = $lineArray[$i];
            $childClass = $className;
            print_r("class ".$childClass . " is a child of [");
            for($i=0;$i<sizeof($parentClass);$i++)
                print_r($parentClass[$i].", ");
            print_r("]<br/>");

        }
        //it means there is no parent class
        if($index + 1 == sizeof($lineArray)){
            $childClass = $className;
            $parentClass = null;
            print_r("class " .$childClass ." does not have parent class.<br/>");
        }
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
