<!DOCTYPE html>
<html lang = "en-us">

<head>
    <meta charset = "UTF-8">
    <title>Test</title>
</head>

<body>
    <?php
        $fighterName = filter_input(INPUT_GET, "fighterName");
        $fighterAge = filter_input(INPUT_GET, "fighterAge");
        $catInfo = filter_input(INPUT_GET, "catInfo");
        $catWins = filter_input(INPUT_GET, "catWins");
        $catLoss = filter_input(INPUT_GET, "catLoss");

        try
        {
            $connection = new PDO('mysql:host = localhost; dbname = user_registration', "weblv", "weblv");
			$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $prepared_statement = $connection->prepare("INSERT INTO weblv5.catfighters VALUES ('null','$fighterName','$fighterAge','$catInfo', '$catWins', '$catLoss')");
            $execute_value = $prepared_statement->execute();

            if($execute_value == true)
			{
				print"<p>Insert was successful</p>\n";
					$connection = null;
			}
			else
			{
			    print"<p>Insert failed</p>\n";
				$connection = null;
			}
        }
        catch(PDOEexception $e)
		{
			print"ERROR : " . $e->getMessage();
			$connection = null;
		}	

    ?>

</body>

