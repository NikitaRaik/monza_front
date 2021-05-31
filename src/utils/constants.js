class constants {
  CHECK_ALL_FIELDS = "Proszę uzupełnić wszystkie pola.";
  ENTER_VALID_EMAIL = "Proszę wprowadzić poprawny adres e-mail.";
  ENTER_PASSWORD = "Hasło musi mmieć co namniej 6 znaków.";
  ENTER_SPEC_PASSWORD="Hasło musi zawierać minimum 8 znaków, małe i wielkie litery oraz cyfry, a dodatkowo posiadać minimum jeden znak specjalny: !,@,#,?";
  ENTER_SAME_PASSWORD = "Hasła muszą być takie same.";
  CHECK_POLICY = "Proszę zaakceptować regulamin.";
  WRONG_XLSX_HEADER = "Zaimportowany plik xlsx ma nieprawidłową wartość.";
  
  unauthenticated_url = [
      '/not-found',
      '/login',
      '/forgotpassword',
      '/verification',
      '/reset_password',
      '/register'
  ];

authenticated_url = [
  
];
}

export default new constants();

