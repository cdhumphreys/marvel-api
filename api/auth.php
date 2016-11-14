<?php
  header("Access-Control-Allow-Origin: *");
  require 'keys.php';


// fetch data from marvel api
//$subject = characters || events || comics || creators || series || stories
function fetchData($subject, $query, $value) {
  global $privateKey, $publicKey;

  $ch = curl_init();

  $base = 'https://gateway.marvel.com:443/v1/public/';
  $url = $base . $subject . '?';

  $url .= 'apikey=' . $publicKey;


  $ts = time();
  $url .= '&ts=' . $ts;


  $md5Hash = md5($ts . $privateKey . $publicKey);
  $url .= '&hash=' . $md5Hash;

  //add search terms
  $url .= "&" . $query . '=' . $value;

  // curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_GET, 1);
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLOPT_HTTPHEADER, 'Content-Type: application/json');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($ch);
  curl_close($ch);
  return $response;
}

$data = fetchData('characters', 'name', 'Spider-Man');

echo ($data);
?>
