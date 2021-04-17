<?php

require 'database/Connection.php';
require 'database/QueryBuilderFix.php';

return new QueryBuilderFix(Connection::make());




?>