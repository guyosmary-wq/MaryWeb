function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Bookings');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp','Name','Email','Phone','Destination','Date','Guests','Notes','Username']);
  }
  var row = [new Date(), e.parameter.name, e.parameter.email, e.parameter.phone, e.parameter.destination, e.parameter.date, e.parameter.guests, e.parameter.notes, e.parameter.username];
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({result:'success'})).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Bookings');
  
  if (e.parameter.action === 'delete') {
    var row = parseInt(e.parameter.row);
    if (row > 1 && row <= sheet.getLastRow()) {
      sheet.deleteRow(row);
    }
    return ContentService.createTextOutput(JSON.stringify({result:'success'})).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (!sheet || sheet.getLastRow() < 2) {
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues();
  var result = [];
  
  for (var i = 0; i < data.length; i++) {
    result.push({
      timestamp: data[i][0].toString(),
      name: data[i][1].toString(),
      email: data[i][2].toString(),
      phone: data[i][3].toString(),
      destination: data[i][4].toString(),
      date: data[i][5].toString(),
      guests: data[i][6].toString(),
      notes: data[i][7] ? data[i][7].toString() : '',
      username: data[i][8] ? data[i][8].toString() : ''
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
