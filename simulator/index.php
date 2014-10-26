<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
        <head>
            <title>SVG path animation</title>
            <link href="style.css" rel="stylesheet">
                <script src="http://d3js.org/d3.v3.min.js"></script>
                <script src="http://d3js.org/queue.v1.min.js"></script>
                <script>
                    var realData = <?php echo helloworld();?>;
                </script>
        </head>
        <body>
            <!-- start -->
            <div id="pathAnimation">
                <script src="pathFollow.js"></script>
            </div>
            <!-- end -->
        </body>

<?php
    function helloworld(){
        $php_array = array('byeng','hee','kang');
        return convertArrayJs($php_array);
    }
    ?>

<?php
    function parse(){
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
//                      print_r($commitIndex);
                        //"timestamp"
                        $commit = array("author" => $author, "commitID" => $tempForCommit[1], "Email" => $email, "CommitTime" => $commitTime ,"CommitDay" => $commitDay, "CommitMonth" => $commitMonth, "CommitYear" => $commitYear, "filesAdded" => $javaAdded, "filesModified" => $javaModified, "filesDeleted" => $javaDeleted);
                        print_r($commit);
                        echo "<br/><br/>";
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
                                $javaAdded[] = $classNameJava;
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
            $commit = array("author" => $author, "Email" => $email, "CommitTime" => $commitTime ,"CommitDay" => $commitDay, "CommitMonth" => $commitMonth, "CommitYear" => $commitYear, "filesAdded" => $javaAdded, "filesModified" => $javaModified, "filesDeleted" => $javaDeleted);
            $commitIndex++;
            print_r($commit);
            
            fclose($handle);
        }}
    ?>

<?php
    function commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, ){
        $time = str_word_count($commitTime,1,'1234567890');
        $date = "new Date(".$commitYear.", ".$commitMonth.", ".$commitDay.", ".$time[0].", ".$time[1].", ".$time[2].", 0)";
        return array("author" => $author, "Email" => $email, "timestamp" => $date, "filesAdded" => $javaAdded, "filesModified" => $javaModified, "filesDeleted" => $javaDeleted);
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

// http://stackoverflow.com/questions/5618925/convert-php-array-to-javascript
<script type='text/javascript'>
<?php
    function convertArrayJs($php_array){
        $js_array = json_encode($php_array);
        return
        $js_array;
    }

    ?>
</script>

</html>
