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
                  var test3 = <?php   $thiss = parse();
                  $hello = convertJsArray($thiss);
                  echo $hello;
                  ?>;
                  var test = <?php
                  $file = file_get_contents('fruits.txt', FILE_USE_INCLUDE_PATH);
                  echo $file
                  ?>
                  // in order to make txt file, put :  git log -p --reverse > txtfileName.txt
                  
                  console.log(test3);
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

<div>
//<?php
//    $thiss = parse();
//    print_r("PARSE DONE");
//    $newArray = sortCommits($thiss);
//    print_r(convertJsArray($newArray));
//    print_r("<br/>helloByeng<br/>");
//    print_r($newArray);
////    print_r($thiss[0]["timestamp"]["year"]);
////    for($i =0; $i < sizeof($thiss); $i++){
////        print_r($i);
//	//        print_r($thiss[$i]);
////        echo "<br/>";
////    }
//    ?>
//<?php
//    echo printRealData();
//    ?>
//<?php
//    function printRealData(){
//        $commitList = parse();
//        $newArray = sortCommits($commitList);
//        return convertJsArray($newArray);
//    }
//    ?>

<?php
    echo "hello";
//    readXML('CPSC304CoolTeam.xml');
    echo "<br/>";
    echo convertJsArray(readXML('scribe-java.xml'));
    echo "bye";
    ?>
</div>
<br/>

<div>output from js:</div>
<div id="outputjs1"></div>
<div id="outputjs2"></div>


<?php
    function readXML($xmlFile){
        $fileList = array();
        $dependencyList = array();
        $isSource = false;
        $isTarget = false;
        
        $classDiagram = simplexml_load_file($xmlFile);
        
        foreach($classDiagram as $object){
//            print_r($object);
            $className = str_word_count($object['name'],1);
            if(!empty($className) && $object['language'] == "java"){//the object is about class info
                $directory = "";
                for($i = 0; $i < sizeof($className)-1; $i++){
                    if($i == 0)
                        $directory = $directory.$className[$i];
                    else
                        $directory = $directory.".".$className[$i];
                }
                $fileList[(int)$object['id']] =  array('id' => (int)$object['id'], 'fileName' => $className[sizeof($className)-1], 'directory' => $directory,'targetedBy' => array());
            }
            if($object['id'] && !$object['name']){//the object is about dependency info
                foreach($object as $end){
                    if($end['type'] == "SOURCE"){
                        $isSource = true;
                        $source = $end['refId'];
                    }
                    if($end['type'] == "TARGET"){
                        $isTarget = true;
                        $target = $end[refId];
                    }
                    if($isSource && $isTarget){
                        array_push($dependencyList, array('source' => (int)$source, 'target' => (int)$target));
                        $isSource = false;
                        $isTarget = false;
                    }
                }
            }
        }
        // Reading is Done. fileList contains name of files in the project. Dependency List contains the dependency Relation.
        
        foreach($dependencyList as $dependency){
            array_push($fileList[$dependency['target']]['targetedBy'], $fileList[$dependency['source']]['fileName']);
        }
//        print_r($fileList);
        return $fileList;
    }
?>

<?php
    function sortCommits($commitArray){
        $newArray = array();
        //$newArray = [{ 'date' => 2014, 'commits' => [1,2,3,4] }, {},{}]
//        $totalDays = calculateTotaldays($commitArray);
//        $initialDay = $commitArray[0]["timestamp"];
//        $lastDay = $commitArray[$lastIndex]["timestamp"];
        $commits = array();
        for($i = 0; $i < sizeof($commitArray); $i++){
            $currentDate = $commitArray[$i]["timestamp"];
            if(empty($commits) || ($commits[0]["timestamp"]["day"] == $currentDate["day"] && $commits[0]["timestamp"]["month"] == $currentDate["month"] && $commits[0]["timestamp"]["year"] == $currentDate["year"] )){
                array_push($commits, $commitArray[$i]);
                //resolve bug for last index ///////////////////////////
            }
            else {
                array_push($newArray, createDateCommits($commits[0]["timestamp"], $commits));//have to change to 0,0,0) format ////////////
                $current = new DateTime((string)$currentDate["year"]."-".(string)$currentDate["month"]."-".(string)$currentDate["day"]);//16
                $previous = new DateTime((string)$commits[0]["timestamp"]["year"]."-".(string)$commits[0]["timestamp"]["month"]."-".(string)$commits[0]["timestamp"]["day"]);//13
                $dateDiff = date_diff($previous, $current);
//                print_r($dateDiff->format('%d'));
                for($j = 1; $j < $dateDiff->format('%d'); $j++){
//                    print_r("YOYOYOYOYO");
//                    print_r($dateDiff->format('%d'));
//                    print_r("POPOPOPOPO");
                    $previous->modify('+1 day');
                    $emptyDate = createTimeStamp((int)$previous->format('Y'), (int)$previous->format('m'), (int)$previous->format('d'), 0,0,0); //not checked
                    array_push($newArray, createDateCommits($emptyDate, null));
                }
//                array_push($newArray, createDateCommits($commits[0]["timestamp"], $commits));
//                unset($commits);
                $commits = array();
                array_push($commits, $commitArray[$i]);
                //read this part again
            }
            if($i == sizeof($commitArray)-1){
                array_push($newArray, createDateCommits($commits[$i]["timestamp"], $commits));
            }
        } //lastIndex not added in newArray yet
        return $newArray;
    }
    
    
    function createDateCommits($date, $commits){
        return array("date" => $date, "commits" => $commits);
    }
    
    function calculateTotaldays($commitArray){
        $lastIndex = sizeof($commitArray)-1;
        $date1 = date_create((string)$commitArray[0]["timestamp"]["year"]."-".(string)$commitArray[0]["timestamp"]["month"]."-".(string)$commitArray[0]["timestamp"]["day"]);
        $date2 = date_create((string)$commitArray[$lastIndex]["timestamp"]["year"]."-".(string)$commitArray[$lastIndex]["timestamp"]["month"]."-".(string)$commitArray[$lastIndex]["timestamp"]["day"]);
        $diff = date_diff($date1, $date2);
        return $diff->format('%d')+1;
    }
    ?>
<?php
    function parse(){
//        $handle = @fopen("mockByengProject.txt","r");
        $handle = @fopen("mockTest.txt","r");
        if($handle) {
            $commitIndex = -1;
            $javaAdded = array();
            $javaModified = array();
            $javaDeleted = array();
            $files = array();
            while (($buffer = fgets($handle)) !== false){
                $temp = str_word_count($buffer,1,'1234567890-+:');
                $tempForCommit = str_word_count($buffer,1,'1234567890-+:/');
                if($tempForCommit[0] == "commit"){
                    if($commitIndex != -1){
//                      print_r($commitIndex);
                        $addedfiles = sortfiles($files, $javaAdded);
                        $modifiedfiles = sortfiles($files, $javaModified);
//                        print_r("Added Java files: ");
//                        print_r($addedfiles);
//                        print_r("<br/>");
//                        print_r("Modified Java files: ");
//                        print_r($modifiedfiles);
//                        print_r("<br/>");
                        $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $javaAdded, $javaModified, $addedfiles, $modifiedfiles, $javaDeleted);
                        $commits[] = $commit;
//                        print_r(convertJsArray($commit)."<br/>");
//                        print_r("Added files: ");
//                        print_r($javaAdded); // any added java files of commit
//                        print_r("<br/>");
//                        print_r("Modified files: ");
//                        print_r($javaModified); // any modified java files of commit
//                        print_r("<br/>");
//                        print_r($commit);
//                        echo "<br/><br/>";
                    }
                    $commitIndex++;
                    unset($files,$addedfiles, $modifiedfiles, $javaAdded, $javaModified, $javaDeleted);
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
                    $author = trim($appendName);
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
                //if the line contains 'class' and next index is the classname we are looking for, and if class relation has been changed,
                if( in_array("class",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("class", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
//                    print_r("I found class, ".$classNameJava."<br/>");
                    $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));////////////
                    $files[] = $file;
                }
                if( in_array("interface",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("interface", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
//                    print_r("I found interface, ".$classNameJava."<br/>");
                    $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));
                    $files[] = $file;
                }
                
                //print out raw text file in array format
                //            print_r($tempForCommit."<br/>");
            }
            if(!feof($handle)){
                echo "Error:unexpected fgets() fail\n";
            }
            
            //This is for the last commit. Since I am creating $commit when a word "commit" is appeared, and there is no word "commit" at the end of file.
//            print_r($commitIndex);
            $addedfiles = sortfiles($files, $javaAdded);
            $modifiedfiles = sortfiles($files, $javaModified);
            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $javaAdded, $javaModified, $addedfiles, $modifiedfiles, $javaDeleted);
            $commits[] = $commit;
            $commitIndex++;
//            print_r(convertJsArray($commit));
//            print_r($commit);
            fclose($handle);
        }
        return $commits;
    }
    ?>

<?php
    function sortfiles($files, $alreadychanged){////////////////////////////////////////
        for($i = 0; $i < sizeof($files); $i++){
            $file = $files[$i];
            if($alreadychanged != null && in_array($file["fileName"], $alreadychanged)){
                $changedfiles[] = $file;
            }
        }
//        print_r($changedfiles);
//        echo "<br/>";
        return $changedfiles;
    }
    ?>

<?php
    function createJavafileInstance($childName, $parentsArray){
        return array("fileName" => $childName, "parents" => $parentsArray);
    }
    ?>
<?php
    function createTimeStamp($year, $month, $day, $hour, $minute, $second){
        return array("year" => $year, "month" => $month, "day" => $day, "hour" => $hour, "minute" => $minute, "second" => $second);
    }
    ?>
<?php
    function showParents($lineArray,$index,$className){
        if($lineArray[$index + 1] == "extends"){
            for($i = $index +2; $i < sizeof($lineArray); $i++){
                if($lineArray[$i] != "implements")
                    $parentClass[] = $lineArray[$i];
            }
            $childClass = $className;
//            print_r("class ".$childClass . " is a child of [");
//            for($i=0;$i<sizeof($parentClass);$i++)
//                print_r($parentClass[$i].", ");
//            print_r("]<br/>");
            
        }
        //there is no extends
        if($lineArray[$index + 1] == "implements") {
            for($i = $index + 2; $i < sizeof($lineArray); $i++)
                $parentClass[] = $lineArray[$i];
            $childClass = $className;
//            print_r("class ".$childClass . " is a child of [");
//            for($i=0;$i<sizeof($parentClass);$i++)
//                print_r($parentClass[$i].", ");
//            print_r("]<br/>");
            
        }
        //it means there is no parent class
        if($index + 1 == sizeof($lineArray)){
            $childClass = $className;
            $parentClass = null;
//            print_r("class " .$childClass ." does not have parent class.<br/>");
        }
        return $parentClass;
    }
    ?>

<?php
    function commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $added, $modified,$parentsAdded, $parentsModified, $deleted){
        $date = convertdatetoJsstr($commitYear, $commitMonth, $commitDay, $commitTime);
        return array("author" => $author, "Email" => $email, "timestamp" => $date, "filesAdded" => $added, "filesModified" => $modified, "ParentsAdded" => $parentsAdded, "ParentsModified" => $parentsModified, "filesDeleted" => $deleted);
    }
    ?>

<?php
    function convertdatetoJsstr($year, $month, $day, $time){
        $timeArray = str_word_count($time,1,'1234567890');
        date_default_timezone_set("America/Los_Angeles");
        $monthNum = strtotime($month);
//        $str = "new Date(".$year.", ".date('m',$monthNum).", ".$day.", ".$timeArray[0].", ".$timeArray[1].", ".$timeArray[2].", 0)";
        $str = createTimeStamp((int)$year, (int)date('m',$monthNum), (int)$day, (int)$timeArray[0], (int)$timeArray[1], (int)$timeArray[2]);

        return $str;
    }
    ?>


<!-- comment -->
 <script type='text/javascript'>
<?php
    
    /*
     http://stackoverflow.com/questions/5618925/convert-php-array-to-javascript
     */
    function convertJsArray($php_array){
        $js_array = json_encode($php_array);
        return $js_array;
    }
    
    ?>

</script>

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
