# Archivos de Ayuda y Configuración

Estos documentos se utilizan para controlar los textos estáticos de la pagina QueryBuilder de HT.



## QueryBuilder_help.md

Proporciona una vista de la ayuda en general de la herramienta query builder de HT

## queryBuilder.conf

Contiene la configuración de texto estático para desplegar en la herramienta query builder de HT

- _version : Version del documento
- _descripcion : descripción del documento JSON
- description : descripción del documento JSON
- queryBox : objeto que contiene la configuración de texto estático de la sección de query box
  - example : ejemplo que se despliega dentro de la querybox
  - comment_help : comentario de ayuda que se despliega al pulsar el botón de ayuda
- builder :  objeto que contiene la configuración de texto estático de la sección de builder
  - demo : query demo para mostrar
  - tooltips :  objeto que contiene la configuración de texto estático de tooltip a presentar en los componentes del formulario del builder
    - dropdown_fields : elemento donde se selecciona el campo de busqueda
    - inputText : "entrada de texto principal"
    - button_add : bottom de añadir sentencia al query box
    - dropdown_logicOperator: elemento donde se selecciona el operador lógico
    - dropdown_growthCondition : elemento donde se selecciona el campo de busqueda de growth condition
    - inputText_growthContion : entrada de texto de growth condition