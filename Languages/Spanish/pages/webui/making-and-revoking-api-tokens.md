# Creación y revocación de tokens API

Como se describe en la [introducción](/introducción), los tokens API son
requerido para usar la API de rerobots directamente, en lugar de a través [de la Web
tablero](https://rerobots.net/). Los tokens API son de interés principalmente para
desarrolladores de aplicaciones, y están obligados a realizar acciones no triviales desde
bibliotecas cliente como el [paquete Python de rerobots](
https://pypi.org/project/rerobots/)
y [Caja de óxido](https://crates.io/crates/rerobots).
Para obtener y administrar sus tokens de API, vaya a la [página de tokens de API en la Web
tablero](https://rerobots.net/tokens). Cuando no hay fichas activas, la principal
aparecerá una sección similar a la siguiente captura de pantalla:

![captura de pantalla de la sección principal de la página de tokens API](figures/api_tokens_page_empty.png)

Para crear un nuevo token de API, use el panel de control cerca de la parte inferior de la página.
Seleccione la duración de la validez del token API. El valor predeterminado es 24 horas, es decir,
el token no se puede usar 24 horas o más después de su creación. Clic en el botón
etiquetado `hacer token API`. La tabla ahora debe tener al menos una fila que
aparece como

![captura de pantalla de un solo elemento en la tabla de tokens de la API](figures/api_tokens_table_item.png)

Al seleccionar una de las filas de la tabla, se activará el token de API correspondiente.
se mostrará en un nuevo panel titulado "token" que parece similar a

![captura de pantalla del panel de vista detallada del token](figures/api_token_detail.png)
En este panel, se muestra el texto del token y se puede copiar y pegar donde desee.
necesito. Para descargar el texto como un archivo llamado jwt.txt, presione `descargar`
botón.

Por seguridad, la mejor práctica es revocar los tokens de API que ya no son
necesarios pero aún no han caducado. (Los tokens vencidos no se pueden usar y, por lo tanto, no
no es necesario revocarlo manualmente). Para hacerlo, vaya periódicamente a su [API tokens
en el panel web](https://rerobots.net/tokens) y revise la tabla de
fichas activas. Para revocar uno, simplemente use su botón `revocar` a la derecha
columna. Para evitar errores, hay un cuadro de diálogo de confirmación para la revocación
acción.