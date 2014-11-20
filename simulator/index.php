<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
        <head>
            <title>SVG path animation</title>
            <link href="style.css" rel="stylesheet">
                <script src="http://d3js.org/d3.v3.min.js"></script>
                <script src="http://d3js.org/queue.v1.min.js"></script>
                <script>
                    //var realData = <?php echo printRealData();?>;
                    var dependencyData = <?php echo printDependency(); ?>;
                </script>
            <style type="text/css">
                div.tooltip {
                position: absolute;
                text-align: left;
                padding: 8px;
                font: 10px Verdana;
                background: lightsteelblue;
                border: px;
                border-radius: 8px;
                    pointer-events: none;
                }

            .dataRoomSelected{
            stroke: white;
                stroke-width: 100px
            fill: springgreen;
            }
        .dataRoom {
        stroke: none;
            fill: lightblue;
            }
            </style>
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
        return convertJsArray($php_array);
    }
    ?>

<?php
    function printRealData(){
        $commitList = parse("mockByengProject.txt"); //"mockTest.txt","mockByengProject.txt","RxJavaCommits.txt" etc
        $newArray = sortCommits($commitList);
        return convertJsArray($newArray);
    }
    ?>
<?php
    function printDependency(){
        $php_array = readXML("CPSC304CoolTeam.xml");
        return convertJsArray($php_array);
    }
    ?>



<?php
    // inputting XML file that informs about dependency relations, outputting list of files and what each file is being targeted by.
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
    // Input : List of pure commits in chronical order parsed from parse().
    // Output : List of date that contains corresponding commits from initial commits to the last commits
    function sortCommits($commitArray){
        $newArray = array();
        $commits = array();
        for($i = 0; $i < sizeof($commitArray); $i++){
            $currentDate = $commitArray[$i]["timestamp"];
            if(empty($commits) || ($commits[0]["timestamp"]["day"] == $currentDate["day"] && $commits[0]["timestamp"]["month"] == $currentDate["month"] && $commits[0]["timestamp"]["year"] == $currentDate["year"] )){
                array_push($commits, $commitArray[$i]);
            }
            else {
                array_push($newArray, createDateCommits($commits[0]["timestamp"], $commits));// will change the hour, minute, second in JS file.
                $current = new DateTime((string)$currentDate["year"]."-".(string)$currentDate["month"]."-".(string)$currentDate["day"]);//16
                $previous = new DateTime((string)$commits[0]["timestamp"]["year"]."-".(string)$commits[0]["timestamp"]["month"]."-".(string)$commits[0]["timestamp"]["day"]);//13
                $dateDiff = date_diff($previous, $current);
                for($j = 1; $j < $dateDiff->format('%d'); $j++){
                    $previous->modify('+1 day');
                    $emptyDate = createTimeStamp((int)$previous->format('Y'), (int)$previous->format('m'), (int)$previous->format('d'), 0,0,0); //not checked
                    array_push($newArray, createDateCommits($emptyDate, array()));
                }
                $commits = array();
                array_push($commits, $commitArray[$i]);
            }
            if($i == sizeof($commitArray)-1){ // last index of commit is being pushed to newArray
                array_push($newArray, createDateCommits($commitArray[$i]["timestamp"], $commits));
            }
        }
        return $newArray;
    }
    
    
    function createDateCommits($date, $commits){
        return array("date" => $date, "commits" => $commits);
    }
    ?>

<?php
    // This function opens txt file that is in for mat parsed from "git log -p --reverse"
    // then outputs list of commits with information of parents and child relations provided.
    function parse($txtFile){
        $handle = @fopen($txtFile,"r");
        if($handle) {
            $commitIndex = -1;
            $javaAdded = array();
            $javaModified = array();
            $javaDeleted = array();
            $files = array();
            while (($buffer = fgets($handle)) !== false){
                $temp = str_word_count($buffer,1,'1234567890-+:');
                $tempForCommit = str_word_count($buffer,1,'1234567890-+:/');
                //print_r(sizeof($tempForCommit));
                if(!empty($tempForCommit)){
                    //print_r($tempForCommit);
                    
                    if($tempForCommit[0] == "commit"){
                        if($commitIndex != -1){
                            //                      print_r($commitIndex);
                            $addedfiles = sortfiles($files, $javaAdded);
                            $modifiedfiles = sortfiles($files, $javaModified);
                            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $addedfiles, $javaModified, $modifiedfiles, $javaDeleted);
                            $commits[] = $commit;
                        }
                        $commitIndex++;
                        $files = array();
                        $addedfiles = array();
                        $modifiedfiles = array();
                        $javaAdded = array();
                        $javaModified = array();
                        $javaDeleted  = array();
                        //unset($files,$addedfiles, $modifiedfiles, $javaAdded, $javaModified, $javaDeleted);
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
                    
                    if(sizeof($tempForCommit) > array_search("class", $tempForCommit)+1){
                        //if the line contains 'class' and next index is the classname we are looking for, and if class relation has been changed,
                        if( in_array("class",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("class", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
                            //print_r("I found class, ".$classNameJava."<br/>");
                            $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));////////////
                            $files[] = $file;
                        }
                    }
                    if(sizeof($tempForCommit) > array_search("interface", $tempForCommit)+1){
                        if( in_array("interface",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("interface", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
                            //print_r("I found interface, ".$classNameJava."<br/>");
                            $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));
                            $files[] = $file;
                        }
                    }
                }
            }
            if(!feof($handle)){
                echo "Error:unexpected fgets() fail\n";
            }
            
            //This is for the last commit. Since I am creating $commit when a word "commit" is appeared, and there is no word "commit" at the end of file.
            //print_r($commitIndex);
            $addedfiles = sortfiles($files, $javaAdded);
            $modifiedfiles = sortfiles($files, $javaModified);
            //            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $javaAdded, $javaModified, $addedfiles, $modifiedfiles, $javaDeleted);
            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $addedfiles, $javaModified, $modifiedfiles, $javaDeleted);
            $commits[] = $commit;
            $commitIndex++;
            fclose($handle);
        }
        return $commits;
    }
    ?>

<?php
    function sortfiles($files, $alreadychanged){
        $changedfiles = array();
        for($i = 0; $i < sizeof($files); $i++){
            $file = $files[$i];
            if(count($alreadychanged) != 0 && in_array($file["fileName"], $alreadychanged)){
                $changedfiles[] = $file;
            }
        }
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
        $parentClass = array();
        if(sizeof($lineArray) >  $index+1){
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
                $parentClass = array();
                //            print_r("class " .$childClass ." does not have parent class.<br/>");
            }
        }
        
        return $parentClass;
    }
    ?>

//<?php
//    function commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $added, $modified, $parentsAdded, $parentsModified, $deleted){
//        $date = convertdatetoJsstr($commitYear, $commitMonth, $commitDay, $commitTime);
//        return array("author" => $author, "Email" => $email, "timestamp" => $date, "filesAdded" => $added, "filesModified" => $modified, "ParentsAdded" => $parentsAdded, "ParentsModified" => $parentsModified, "filesDeleted" => $deleted);
//    }
//    ?>

<?php
    function commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $added, $modified, $relationsModified, $deleted){
        $date = convertdatetoJsstr($commitYear, $commitMonth, $commitDay, $commitTime);
        return array("author" => $author, "Email" => $email, "timestamp" => $date, "filesAdded" => $added, "filesModified" => $modified, "relationshipModified" => $relationsModified, "filesDeleted" => $deleted);
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
    
    // This function converts the array format in php to String of JSON format.
    function convertJsArray($php_array){
        $js_array = json_encode($php_array);
        return $js_array;
    }
    
    ?>

</script>
</html>
