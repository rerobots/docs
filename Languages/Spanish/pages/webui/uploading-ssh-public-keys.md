# Carga de claves públicas SSH

El inicio de sesión remoto en los hosts de una instancia de espacio de trabajo se logra a través de `ssh`. Si tu
guarde las claves públicas en su cuenta de usuario, luego se pueden seleccionar fácilmente cuando
crear una nueva instancia. El proceso para hacerlo se describe aquí. Para esto
ejercicio, suponga que su par de claves son los archivos demokey y demokey.pub. Para
ejemplo, estos se pueden generar desde la terminal:

```bash
ssh-keygen -f demokey
```
La clave pública es demokey.pub. Es la llave que se debe dar a otros que
necesita autenticarlo de manera confiable. El otro archivo, demokey, es secreto y debe
mantenerse en un lugar seguro, como en el directorio ".ssh" en su directorio de inicio
en su computadora personal.

Ahora ve a [la página de claves SSH](https://rerobots.net/sshkeys), que debería aparecer
similar a la siguiente captura de pantalla:

![captura de pantalla de la página de llaves SSH](figures/empty_sshkeys_page.png)
Copie y pegue el contenido de demokey.pub en el campo "texto clave" del
formulario "cargar nueva clave pública". Luego, asigne un nombre a este par de claves que pueda
use más tarde para referirse a él en el sitio web de rerobots. Continuando con nuestro ejemplo, el
el formulario completado podría verse así:

![captura de pantalla del formulario de clave de carga rellenado de ejemplo](figures/filled_new_sshkey_upload.png)

Finalmente, presione el botón enviar. La clave pública recién cargada debería ahora
aparecen en la tabla. Por ejemplo,
![captura de pantalla de la tabla del usuario de claves SSH cargadas, mostrando la nueva](figures/new_sshkeys_table_item.png)