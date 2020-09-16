var express = require('express');
var legalCtrl = require('./legalController.js');

var legalRoutes = express.Router();

// Legal List Controller
legalRoutes.route('/get_user_detail').post(legalCtrl.get_user_detail);  // Get all Remark for Audit Trail 
legalRoutes.route('/update_my_profile').post(legalCtrl.update_my_profile);

// ############################################# DHANASHREE ###############################################


// ************************************USER MASTER*****************************************

legalRoutes.route('/save_user_record').post(legalCtrl.save_user_record); 
legalRoutes.route('/get_user_Data').post(legalCtrl.get_user_Data); 
legalRoutes.route('/get_user_Databyid').post(legalCtrl.get_user_Databyid);
legalRoutes.route('/update_user_Data').post(legalCtrl.update_user_Data); 
legalRoutes.route('/deleteUserById').post(legalCtrl.deleteUserById); 

legalRoutes.route('/get_check_email').post(legalCtrl.get_check_email);

// // ************************************USER  ROLE MASTER*****************************************


legalRoutes.route('/save_user_role_record').post(legalCtrl.save_user_role_record); 
legalRoutes.route('/update_user_role_Data').post(legalCtrl.update_user_role_Data);
legalRoutes.route('/get_user_role_Data').post(legalCtrl.get_user_role_Data);
legalRoutes.route('/getuserroleById').post(legalCtrl.getuserroleById);
legalRoutes.route('/deleteuserroleById').post(legalCtrl.deleteuserroleById);

// // ************************************ROLE MASTER*****************************************


legalRoutes.route('/check_role_record').post(legalCtrl.check_role_record); 
legalRoutes.route('/get_role_Data').post(legalCtrl.get_role_Data); 
legalRoutes.route('/get_role_Databyid').post(legalCtrl.get_role_Databyid);
legalRoutes.route('/update_role_Data').post(legalCtrl.update_role_Data);
legalRoutes.route('/deleteroleById').post(legalCtrl.deleteroleById);

// // ************************************STATUS MASTER*****************************************


legalRoutes.route('/check_statusrecord_record').post(legalCtrl.check_statusrecord_record); 
legalRoutes.route('/get_status_Data').post(legalCtrl.get_status_Data); 
legalRoutes.route('/get_status_Databyid').post(legalCtrl.get_status_Databyid);
legalRoutes.route('/update_status_Data').post(legalCtrl.update_status_Data);
legalRoutes.route('/deletestatusById').post(legalCtrl.deletestatusById);
legalRoutes.route('/get_status_Datatype').post(legalCtrl.get_status_Datatype);

// // ############################################# DHANASHREE ###############################################


// // ############################################# AFRIN ###############################################
// **********RACK MASTER****************
legalRoutes.route('/Save_Rack_Data').post(legalCtrl.Save_Rack_Data);  
legalRoutes.route('/get_Rack_Data').post(legalCtrl.get_Rack_Data);
legalRoutes.route('/get_Rack_Data_byid').post(legalCtrl.get_Rack_Data_byid);
legalRoutes.route('/get_Deleted_Rack_Data').post(legalCtrl.get_Deleted_Rack_Data);

legalRoutes.route('/update_Rack_Data').post(legalCtrl.update_Rack_Data);
legalRoutes.route('/get_datacenter_location_Data').post(legalCtrl.get_datacenter_location_Data);
legalRoutes.route('/get_data_center_room').post(legalCtrl.get_data_center_room);
legalRoutes.route('/Delete_Rack_Data').post(legalCtrl.Delete_Rack_Data);
legalRoutes.route('/get_floor_loc').post(legalCtrl.get_floor_loc);


// **********RACKU MASTER****************
legalRoutes.route('/get_RackU_Data').post(legalCtrl.get_RackU_Data);
legalRoutes.route('/get_Deleted_RackU_Data').post(legalCtrl.get_Deleted_RackU_Data);

legalRoutes.route('/get_RackU_Data_byid').post(legalCtrl.get_RackU_Data_byid);
legalRoutes.route('/update_RackU_Data').post(legalCtrl.update_RackU_Data);
legalRoutes.route('/Delete_RackU_Data').post(legalCtrl.Delete_RackU_Data);

// **********ASSET MASTER****************

legalRoutes.route('/Save_Asset_Data').post(legalCtrl.Save_Asset_Data);  
legalRoutes.route('/get_Asset_Data').post(legalCtrl.get_Asset_Data);
legalRoutes.route('/get_Asset_Data_byid').post(legalCtrl.get_Asset_Data_byid);
legalRoutes.route('/get_Deleted_Asset_Data').post(legalCtrl.get_Deleted_Asset_Data);
legalRoutes.route('/update_Asset_Data').post(legalCtrl.update_Asset_Data);
legalRoutes.route('/Delete_Asset_Data').post(legalCtrl.Delete_Asset_Data);

// **********ASSET MAPPING****************

legalRoutes.route('/Save_Asset_Map_Data').post(legalCtrl.Save_Asset_Map_Data);  
legalRoutes.route('/get_Asset_Map_Data').post(legalCtrl.get_Asset_Map_Data);
legalRoutes.route('/get_Deleted_Asset_Map_Data').post(legalCtrl.get_Deleted_Asset_Map_Data);
legalRoutes.route('/get_Asset_Map_Data_byid').post(legalCtrl.get_Asset_Map_Data_byid);
legalRoutes.route('/update_Asset_Map_Data').post(legalCtrl.update_Asset_Map_Data);

legalRoutes.route('/get_rack').post(legalCtrl.get_rack);
legalRoutes.route('/get_n_u_id').post(legalCtrl.get_n_u_id);
legalRoutes.route('/get_asset_desc').post(legalCtrl.get_asset_desc);

legalRoutes.route('/get_status').post(legalCtrl.get_status);
legalRoutes.route('/Delete_Asset_Map_Data').post(legalCtrl.Delete_Asset_Map_Data);

// // ############################################# AFRIN ###############################################





// // ############################################# ASMITA ###############################################

// // *****************************COUNTRY MASTER*********************************************

//legalRoutes.route('/save_country_record').post(legalCtrl.save_country_record); 
legalRoutes.route('/get_country_Data').post(legalCtrl.get_country_Data); 
legalRoutes.route('/get_country_Databyid').post(legalCtrl.get_country_Databyid);
legalRoutes.route('/update_country_Data').post(legalCtrl.update_country_Data);
legalRoutes.route('/deletecountryById').post(legalCtrl.deletecountryById);

legalRoutes.route('/check_country_record').post(legalCtrl.save_country_record);

// // *****************************STATE MASTER*********************************************

//legalRoutes.route('/save_state_record').post(legalCtrl.save_state_record); 
legalRoutes.route('/get_state_Data').post(legalCtrl.get_state_Data); 
legalRoutes.route('/get_state_Databyid').post(legalCtrl.get_state_Databyid);
legalRoutes.route('/update_state_Data').post(legalCtrl.update_state_Data);
legalRoutes.route('/deletestateById').post(legalCtrl.deletestateById);
legalRoutes.route('/get_state_id').post(legalCtrl.get_state_id);
legalRoutes.route('/check_state_record').post(legalCtrl.save_state_record);

//// // *****************************DATA CENTER ROOM********************************************


//legalRoutes.route('/save_datacenter_room_record').post(legalCtrl.save_datacenter_room_record); 
legalRoutes.route('/get_datacenter_room_Data').post(legalCtrl.get_datacenter_room_Data); 
legalRoutes.route('/get_datacenter_room_ById').post(legalCtrl.get_datacenter_room_ById);
legalRoutes.route('/update_datacenter_room_Data').post(legalCtrl.update_datacenter_room_Data);
legalRoutes.route('/delete_datacenter_room_ById').post(legalCtrl.delete_datacenter_room_ById);
legalRoutes.route('/deleteroomrecord').post(legalCtrl.deleteroomrecord);

// // *****************************DATA CENTER DOOR********************************************

legalRoutes.route('/check_room_record').post(legalCtrl.save_datacenter_room_record);

legalRoutes.route('/save_datacenter_door_record').post(legalCtrl.save_datacenter_door_record); 
legalRoutes.route('/get_datacenter_door_Data').post(legalCtrl.get_datacenter_door_Data); 
legalRoutes.route('/get_datacenter_door_ById').post(legalCtrl.get_datacenter_door_ById);
legalRoutes.route('/update_datacenter_door_Data').post(legalCtrl.update_datacenter_door_Data);
legalRoutes.route('/delete_datacenter_door_ById').post(legalCtrl.delete_datacenter_door_ById);
legalRoutes.route('/get_location_details').post(legalCtrl.get_location_details);
legalRoutes.route('/deletedoorrecord').post(legalCtrl.deletedoorrecord);

// *****************************DATA CENTER LOCATION********************************************

legalRoutes.route('/save_datacenter_location_record').post(legalCtrl.save_datacenter_location_record); 
legalRoutes.route('/get_datacenter_location_Data').post(legalCtrl.get_datacenter_location_Data); 
legalRoutes.route('/get_datacenter_location_ById').post(legalCtrl.get_datacenter_location_Databyid);
legalRoutes.route('/update_datacenter_location_Data').post(legalCtrl.update_datacenter_location_Data);
legalRoutes.route('/delete_datacenter_location_ById').post(legalCtrl.delete_datacenter_location_ById);
legalRoutes.route('/deletelocationrecord').post(legalCtrl.deletelocationrecord);


// // ########################################### ASMITA ##########################################################


// // ########################################### GANESH ##########################################################

// // *****************************ALERT MASTER********************************************
 
legalRoutes.route('/insert_alert').post(legalCtrl.insert_alert); 
legalRoutes.route('/get_alert_Data').post(legalCtrl.get_alert_Data); 
legalRoutes.route('/get_alert_detail').post(legalCtrl.get_alert_detail); 
legalRoutes.route('/update_alert').post(legalCtrl.update_alert); 
legalRoutes.route('/deletealert_rec').post(legalCtrl.deletealert_rec); 
legalRoutes.route('/get_deleted_alert_Data').post(legalCtrl.get_deleted_alert_Data); 


// // *****************************CUSTOM FIELDS********************************************
legalRoutes.route('/deletefield_rec').post(legalCtrl.deletefield_rec);
legalRoutes.route('/GetSystemDeletedData').post(legalCtrl.GetSystemDeletedData);
 legalRoutes.route('/Add_field').post(legalCtrl.Add_field);
legalRoutes.route('/get_field_Data').post(legalCtrl.get_field_Data); 
legalRoutes.route('/get_field_detail').post(legalCtrl.get_field_detail); 
legalRoutes.route('/update_field').post(legalCtrl.update_field); 
legalRoutes.route('/deletefield_rec').post(legalCtrl.deletefield_rec); 
legalRoutes.route('/get_fieldDeleted_Data').post(legalCtrl.get_fieldDeleted_Data);

// // *****************************ALERT TRANSACTION*******************************************
legalRoutes.route('/deleted_data').post(legalCtrl.deleted_data); 
legalRoutes.route('/getAllalert').post(legalCtrl.getAllalert);
// legalRoutes.route('/get_racku').post(legalCtrl.get_racku);
legalRoutes.route('/get_asset').post(legalCtrl.get_asset);
legalRoutes.route('/insert_alerttransaction').post(legalCtrl.insert_alerttransaction);
legalRoutes.route('/get_alerttransaction_Data').post(legalCtrl.get_alerttransaction_Data);
legalRoutes.route('/edit_alerttransaction').post(legalCtrl.edit_alerttransaction);
legalRoutes.route('/update_alerttransaction').post(legalCtrl.update_alerttransaction);
legalRoutes.route('/deletealerttransaction').post(legalCtrl.deletealerttransaction); 

// // *****************************************SYSTEM PARAMETER *******************************************
legalRoutes.route('/getImage_data').post(legalCtrl.getImage_data); 
legalRoutes.route('/deleteImg').post(legalCtrl.deleteImg); 
legalRoutes.route('/insert_systemParameter').post(legalCtrl.insert_systemParameter); 
legalRoutes.route('/update_systemParameter').post(legalCtrl.update_systemParameter); 
legalRoutes.route('/getsystemParameterData').post(legalCtrl.getsystemParameterData); 
legalRoutes.route('/deletesystemParameter').post(legalCtrl.deletesystemParameter); 
legalRoutes.route('/get_systemparameter_detail').post(legalCtrl.get_systemparameter_detail);
module.exports = legalRoutes;


