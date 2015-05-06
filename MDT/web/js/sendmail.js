/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var name= window.location.search.split("name=")[1].split("&")[0].replace("%20"," ");
var email=window.location.search.split("email=")[1];
$('#send-mail-name').val(name);
$('#send-mail-name').prop('disabled',true);
$('#semd-mail-email').val(email);
$('#semd-mail-email').prop('disabled',true);
