<!DOCTYPE html>
<html lang="en">
    <meta charset="utf-8">
        <head>
            <title>SVG path animation</title>
            <link href="style.css" rel="stylesheet">
                <script src="http://d3js.org/d3.v3.min.js"></script>
                <script src="http://d3js.org/queue.v1.min.js"></script>
                <script>
                    var realData = <?php echo printRealData();?>;
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
        return convertJsArray($php_array);
    }
    ?>

<?php
    function printRealData(){
        $commitList = parse();
        $newArray = sortCommits($commitList);
        return convertJsArray($newArray);
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
                    array_push($newArray, createDateCommits($emptyDate, array()));
                }
                //                array_push($newArray, createDateCommits($commits[0]["timestamp"], $commits));
                //                unset($commits);
                $commits = array();
                array_push($commits, $commitArray[$i]);
                //read this part again
            }
            if($i == sizeof($commitArray)-1){
                //print_r($commitArray);
                array_push($newArray, createDateCommits($commitArray[$i]["timestamp"], $commits));
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
                //print_r(sizeof($tempForCommit));               
                if(!empty($tempForCommit)){
                //print_r($tempForCommit);

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
//                            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $javaAdded, $javaModified, $addedfiles, $modifiedfiles, $javaDeleted);
                            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $addedfiles, $modifiedfiles, $javaAdded, $javaModified,$javaDeleted);

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
                        //                    print_r("I found class, ".$classNameJava."<br/>");
                        $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));////////////
                        $files[] = $file;
                    }
                }
                if(sizeof($tempForCommit) > array_search("interface", $tempForCommit)+1){
                    if( in_array("interface",$tempForCommit) && $tempForCommit[$indexClassKey = array_search("interface", $tempForCommit)+1]==$classNameJava && substr($tempForCommit[0],0,1) == "+"){
                        //                    print_r("I found interface, ".$classNameJava."<br/>");
                        $file = createJavafileInstance($classNameJava,showParents($tempForCommit, $indexClassKey, $classNameJava));
                        $files[] = $file;
                    }
                }
                
                //print out raw text file in array format
                //            print_r($tempForCommit."<br/>");
            }

            }






            if(!feof($handle)){
                echo "Error:unexpected fgets() fail\n";
            }
            
            //This is for the last commit. Since I am creating $commit when a word "commit" is appeared, and there is no word "commit" at the end of file.
            //            print_r($commitIndex);
            $addedfiles = sortfiles($files, $javaAdded);
            $modifiedfiles = sortfiles($files, $javaModified);
//            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime, $javaAdded, $javaModified, $addedfiles, $modifiedfiles, $javaDeleted);
            $commit = commitArray($author, $email, $commitYear, $commitMonth, $commitDay, $commitTime,  $addedfiles, $modifiedfiles, $javaAdded, $javaModified,$javaDeleted);
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
        $changedfiles = array();
        for($i = 0; $i < sizeof($files); $i++){
            $file = $files[$i];
            if(count($alreadychanged) != 0 && in_array($file["fileName"], $alreadychanged)){
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
</html>
