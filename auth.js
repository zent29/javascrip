// Módulo simple de autenticación basado en sessionStorage
// Este archivo expone un objeto `Auth` en el scope global (window)
// con funciones para login, logout y comprobaciones de sesión.
(function(global){
  // KEY: nombre de la clave usada en sessionStorage para guardar el usuario
  const KEY = 'loggedUser';

  // login(user, pass) -> boolean
  // Valida las credenciales (aquí en el cliente, por simplicidad) y
  // guarda el usuario en sessionStorage si son válidas.
  function login(user, pass){
    // Comparación simple: usuario exacto 'zent' y contraseña '123'
    if(user === 'zent' && pass === '123'){
      try {
        // Intentar guardar el user en sessionStorage
        sessionStorage.setItem(KEY, user);
      } catch(e) {
        // Si sessionStorage falla (p. ej. modo privado o restricciones), ignoramos el error
      }
      // Credenciales válidas
      return true;
    }
    // Credenciales inválidas
    return false;
  }

  // logout() -> void
  // Elimina la clave de sesión del navegador
  function logout(){
    try {
      sessionStorage.removeItem(KEY);
    } catch(e) {
      // Ignorar errores al manipular sessionStorage
    }
  }

  // isLogged() -> boolean
  // Devuelve true si hay un usuario guardado en sessionStorage
  function isLogged(){
    try {
      // !! asegura booleano (null/undefined => false)
      return !!sessionStorage.getItem(KEY);
    } catch(e){
      // Si hay error, asumimos no autenticado
      return false;
    }
  }

  // requireAuth(redirectUrl) -> boolean
  // Si no está autenticado redirige al login (por defecto con ?logged=0)
  function requireAuth(redirectUrl = 'login.html?logged=0'){
    // Comprobar si el usuario está logueado
    if(!isLogged()){
      // No autenticado: redirigir y devolver false
      window.location.href = redirectUrl;
      return false;
    }
    // Autenticado: devolver true
    return true;
  }

  // getUser() -> string|null
  // Recupera el nombre del usuario desde sessionStorage
  function getUser(){
    try {
      return sessionStorage.getItem(KEY);
    } catch(e){
      return null;
    }
  }

  // Exportar las funciones en el objeto `Auth` en el scope global (window.Auth)
  global.Auth = { login, logout, isLogged, requireAuth, getUser };
})(window);
