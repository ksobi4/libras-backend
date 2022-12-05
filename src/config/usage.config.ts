
const usageConfig = {
  moment_data_format: "DD.MM.YYYY HH:mm", //hh od godzin musi być duże H nie h
  gradesExpireTime: 0.5, //[minutes] after time get data again
  
  //notification
  timeChecker: 0.5,   //minutes, // co ile sprawdziamy powiadomienia
  toCheckNotoficationForUser: 3, //days // jak dlugo user nie wchodzil na apk żebyśmy sprawdzali jego powiadomienia
  notifGradesDataExpired: 10, //minutes czas  po którym sprawdziamy oceny i wysyłamy powiedomienia, jesli data czasu ważności minełą 

}

export default usageConfig;