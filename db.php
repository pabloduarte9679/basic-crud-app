<?php
header('Content-Type: application/json');

try{
  $pdo = new PDO("sqlite:crud.db");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
  http_response_code(500);
  echo $e;
  echo json_encode(['error' => 'Database Connection failed']);
  exit;
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $post_body = file_get_contents("php://input");
  $content = json_decode($post_body);
  try{
    $stmt = $pdo->prepare("INSERT INTO Contact VALUES(NULL, ?, ?, ?,?)");
    $stmt->execute([$content->first_name, $content->last_name, $content->email, $content->phone]);
    echo json_encode(['msg' => 'data inserted']);
  }catch(PDOException $e){
    http_response_code(500);
    echo json_encode(['error'=> $e]);
  }
}elseif($_SERVER['REQUEST_METHOD'] == 'DELETE'){
  $delete_body = file_get_contents("php://input");
  $content = json_decode($delete_body);
  try{
    $stmt = $pdo->prepare("DELETE FROM Contact WHERE id = ?");
    $stmt->execute([$content->id]);
  }catch(PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => $e]);
  }
  echo json_encode(['msg' => 'delete']);
}elseif($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $update_body = file_get_contents("php://input");
  $content = json_decode($update_body);

  switch($content->column){
    case "email":
      $stmt = $pdo->prepare("UPDATE Contact SET email = ? WHERE id = ?");
      break;
    case "first_name":
      $stmt = $pdo->prepare("UPDATE Contact SET first_name = ? WHERE id = ?");
      break;
    case "last_name":
      $stmt = $pdo->prepare("UPDATE Contact SET last_name = ? WHERE id = ?");
      break;
    case "phone":
      $stmt = $pdo->prepare("UPDATE Contact SET phone = ? WHERE id = ?");
      break;
  }
  try{
    $stmt->execute([$content->value, $content->id]);
  }catch(PDOException $e){
    http_response_code(500);
    echo json_encode(['error' => $e]);
  }
  echo json_encode(['msg' => 'put']);
}else{

$type = $_GET['type'] ?? 'null';

try{
  $stmt = $pdo->prepare("SELECT * FROM Contact");
  $stmt->execute();
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($rows);
}catch(PDOException $e){
  http_response_code(500);
  echo json_encode(['error' => $e]);
}
}
