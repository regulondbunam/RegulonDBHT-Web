export default function InitDataBase() {
    let db;
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }else{
        
        request.onerror = function(event) {
            
          };
          request.onsuccess = function(event) {
            db = request.result;
          };

          let request = window.indexedDB.open("SearchHistory", 2);
          
          request.onerror = function(event) {
            console.warn("Why didn't you allow my web app to use IndexedDB?!");
            console.error("IndexDB error:",event.target.errorCode);
          };
          request.onupgradeneeded = function(event) {
            db = event.target.result;
          
            // Se crea un almacén para contener la información de nuestros cliente
            // Se usará "ssn" como clave ya que es garantizado que es única
            let objectStore = db.createObjectStore("searchs", { keyPath: "_id" });
          
            // Se crea un índice para buscar clientes por nombre. Se podrían tener duplicados
            // por lo que no se puede usar un índice único.
            objectStore.createIndex("queryBox", "queryBox", { unique: false });
          
            // Se crea un índice para buscar clientespor email. Se quiere asegurar que
            // no puedan haberdos clientes con el mismo email, asi que se usa un índice único.
            objectStore.createIndex("date", "date", { unique: false });
          
            // Se usa transaction.oncomplete para asegurarse que la creación del almacén
            // haya finalizado antes de añadir los datos en el.
            objectStore.transaction.oncomplete = function(event) {
              // Guarda los datos en el almacén recién creado.
              
            }
          };
    }
}