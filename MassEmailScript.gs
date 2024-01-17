function massEmail() 
{
  
  var emailSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("emailInfo");
  var subject = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("subject&body").getRange(2,2).getValue();
  var message = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("subject&body").getRange(3,2).getValue();
  var rows = emailSheet.getLastRow();

  for(var i = 1; i < rows; i++)
  {
    
    var sent = emailSheet.getRange(i+1, 3).getValue(); // Checks if email has already been sent to recipient (reads time sent column)
    Logger.log("Sent check: " +sent); 

    if (sent == false) // Will only send email to recipient if they have not already received it
    {
      // Recipient Email Address
      var emailAddress = emailSheet.getRange(i+1, 2).getValue();
      Logger.log(emailAddress);

      // Recipient Name
      var name = emailSheet.getRange(i+1, 1).getValue();
      Logger.log("Name: " + name);

      // Email Information
      var body = "Hello " + name + ",\n\n" + message;

      // Send Email
      MailApp.sendEmail(emailAddress, subject, body);

      // Update Time Sent
      var cell = emailSheet.getRange(i+1,3); 
      cell.setValue(new Date()).setNumberFormat("MM/dd/yyyy hh:mm:ss");
      Logger.log("Time sent: " + cell.getValue());
    }

  } 


}