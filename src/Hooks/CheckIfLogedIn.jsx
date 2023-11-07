import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export let userName = '';

export default function GetFromLocalStorage(){
  let history = useNavigate();

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('user authentication'));

  if(items === null ){
    console.log("You are not logged in");
    history("/");
  } else{
    history("/dashboard");
  }

}, []);
}